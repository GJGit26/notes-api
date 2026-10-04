import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts", // where our table definitions live
  out: "./drizzle", // where generated migration files go
  dbCredentials: {
    url: process.env.DATABASE_URL!, // never hardcode this
  },
});
