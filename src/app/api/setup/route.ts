import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { resolve } from "path";

function isAdmin(request: Request): boolean {
  const password = request.headers.get("x-admin-password");
  const adminPassword = process.env.ADMIN_PASSWORD || "alok123";
  return password === adminPassword;
}

function getPoolerUrls(): string[] {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const match = supabaseUrl.match(/https:\/\/(.+)\.supabase\.co/);
  const projectRef = match?.[1];
  const password = process.env.SUPABASE_DB_PASSWORD;
  if (!projectRef || !password) return [];
  const encoded = encodeURIComponent(password);
  const regions = [
    "us-east-1", "us-west-1", "eu-west-1", "eu-central-1",
    "ap-south-1", "ap-southeast-1", "ap-northeast-1",
  ];
  return regions.map(
    (r) =>
      `postgresql://postgres.${projectRef}:${encoded}@aws-0-${r}.pooler.supabase.com:6543/postgres`
  );
}

interface ClientLike {
  query(sql: string): Promise<unknown>;
  release(): void;
}

interface PoolLike {
  connect(): Promise<ClientLike>;
  end(): Promise<void>;
}

async function tryConnect(urls: string[], timeout: number): Promise<{ ok: true; pool: PoolLike } | { ok: false; error: string }> {
  const { Pool } = await import("pg");
  for (const url of urls) {
    const pool: PoolLike = new Pool({
      connectionString: url,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: timeout,
      max: 1,
    });
    try {
      const client = await pool.connect();
      client.release();
      return { ok: true as const, pool };
    } catch {
      await pool.end().catch(() => {});
    }
  }
  return { ok: false as const, error: "Could not connect to database with any URL" };
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const match = supabaseUrl.match(/https:\/\/(.+)\.supabase\.co/);
  const projectRef = match?.[1];
  const password = process.env.SUPABASE_DB_PASSWORD;
  if (!projectRef || !password) {
    return NextResponse.json(
      {
        error: "Database credentials not configured.",
        hint: "Add SUPABASE_DB_PASSWORD or DATABASE_URL to .env.local",
      },
      { status: 400 }
    );
  }

  const urls: string[] = [];
  if (process.env.DATABASE_URL) {
    urls.push(process.env.DATABASE_URL);
  }
  const directUrl = `postgresql://postgres:${encodeURIComponent(password)}@db.${projectRef}.supabase.co:5432/postgres`;
  urls.push(directUrl);
  urls.push(...getPoolerUrls());

  const result = await tryConnect(urls, 15000);
  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.error,
        hint: "Make sure your Supabase project is active. Go to https://supabase.com/dashboard/project/" + projectRef + "/settings/database to check or reset your database password, then update SUPABASE_DB_PASSWORD in .env.local",
        instructions: "Alternatively, open the Supabase Dashboard SQL Editor and run schema.sql manually.",
      },
      { status: 500 }
    );
  }

  try {
    const sql = readFileSync(resolve(process.cwd(), "schema.sql"), "utf-8");
    const client = await result.pool.connect();
    try {
      await client.query(sql);
      return NextResponse.json({ success: true, message: "All tables created successfully" });
    } finally {
      client.release();
      await result.pool.end();
    }
  } catch (err) {
    await result.pool.end().catch(() => {});
    const message = err instanceof Error ? err.message : "Setup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
