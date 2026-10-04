import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Copy .env.example to .env and fill it in.");
}

// A Pool keeps a few database connections open and reuses them.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// "db" is what we use everywhere to talk to PostgreSQL through Drizzle.
export const db = drizzle(pool, { schema });
