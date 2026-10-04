import type { FastifyReply, FastifyRequest } from "fastify";
import { desc, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { notes } from "../db/schema.js";

type IdParams = { id: string };
type NoteBody = { title: string; content: string };
type UpdateBody = { title?: string; content?: string };

// CREATE: INSERT INTO notes (title, content) VALUES (...) RETURNING *
export async function createNote(
  request: FastifyRequest<{ Body: NoteBody }>,
  reply: FastifyReply
) {
  const { title, content } = request.body;
  const [note] = await db.insert(notes).values({ title, content }).returning();
  return reply.status(201).send({ success: true, data: note });
}

// READ ALL: SELECT * FROM notes ORDER BY created_at DESC
export async function getAllNotes(_request: FastifyRequest, reply: FastifyReply) {
  const allNotes = await db.select().from(notes).orderBy(desc(notes.createdAt));
  return reply.send({ success: true, data: allNotes });
}

// READ ONE: SELECT * FROM notes WHERE id = ?
export async function getNoteById(
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply
) {
  const [note] = await db.select().from(notes).where(eq(notes.id, Number(request.params.id)));
  if (!note) {
    return reply.status(404).send({ success: false, message: "Note not found" });
  }
  return reply.send({ success: true, data: note });
}

// UPDATE: UPDATE notes SET ... WHERE id = ? RETURNING *
export async function updateNote(
  request: FastifyRequest<{ Params: IdParams; Body: UpdateBody }>,
  reply: FastifyReply
) {
  const [note] = await db
    .update(notes)
    .set({ ...request.body, updatedAt: new Date() })
    .where(eq(notes.id, Number(request.params.id)))
    .returning();

  if (!note) {
    return reply.status(404).send({ success: false, message: "Note not found" });
  }
  return reply.send({ success: true, data: note });
}

// DELETE: DELETE FROM notes WHERE id = ? RETURNING *
export async function deleteNote(
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply
) {
  const [note] = await db.delete(notes).where(eq(notes.id, Number(request.params.id))).returning();
  if (!note) {
    return reply.status(404).send({ success: false, message: "Note not found" });
  }
  return reply.send({ success: true, data: note });
}
