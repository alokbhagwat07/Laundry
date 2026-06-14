const { readFileSync, existsSync } = require("fs");
const { resolve } = require("path");
const { Pool } = require("pg");

async function main() {
  const envPath = resolve(__dirname, ".env.local");
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let value = trimmed.slice(eqIdx + 1).trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          process.env[key] = value;
        }
      }
    }
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
    console.error("ERROR: Database credentials not configured.");
    console.error("");
    console.error("Option 1: Add SUPABASE_DB_PASSWORD to .env.local");
    console.error("  Get it from: Supabase Dashboard > Project Settings > Database > Database password");
    console.error("");
    console.error("Option 2: Add full DATABASE_URL to .env.local");
    console.error("  Format: postgresql://postgres:PASSWORD@db.zbofrejeqydvwuyzlvzf.supabase.co:5432/postgres");
    console.error("");
    console.error("Then run: node setup-db.js");
    process.exit(1);
  }

  console.log("Connecting to database...");
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    const client = await pool.connect();
    console.log("Connected. Running schema.sql...");
    const sql = readFileSync(resolve(__dirname, "schema.sql"), "utf-8");
    await client.query(sql);
    console.log("All tables created successfully!");
    client.release();
  } catch (err) {
    console.error("Failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
