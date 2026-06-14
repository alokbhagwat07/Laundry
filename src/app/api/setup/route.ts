import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { resolve } from "path";

function isAdmin(request: Request): boolean {
  const password = request.headers.get("x-admin-password");
  const adminPassword = process.env.ADMIN_PASSWORD || "alok123";
  return password === adminPassword;
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const databaseUrl =
    process.env.DATABASE_URL ||
    (() => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const match = supabaseUrl.match(/https:\/\/(.+)\.supabase\.co/);
      const projectRef = match?.[1];
      const password = process.env.SUPABASE_DB_PASSWORD;
      if (!projectRef || !password) return null;
      return `postgresql://postgres:${encodeURIComponent(password)}@db.${projectRef}.supabase.co:5432/postgres`;
    })();

  if (!databaseUrl) {
    return NextResponse.json(
      {
        error:
          "Database credentials not configured. Add SUPABASE_DB_PASSWORD or DATABASE_URL to .env.local",
        hint: "Get the DB password from Supabase Dashboard > Project Settings > Database > Database password",
      },
      { status: 400 }
    );
  }

  try {
    const { Pool } = await import("pg");
    const pool = new Pool({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    });

    const client = await pool.connect();
    try {
      const sql = readFileSync(resolve(process.cwd(), "schema.sql"), "utf-8");
      await client.query(sql);
      return NextResponse.json({ success: true, message: "All tables created successfully" });
    } finally {
      client.release();
      await pool.end();
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Setup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
