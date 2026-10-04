import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// This describes the "notes" table in PostgreSQL.
// Each line inside is one column.
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(), // 1, 2, 3 ... generated automatically
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
