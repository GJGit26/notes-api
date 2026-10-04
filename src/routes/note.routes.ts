import type { FastifyInstance } from "fastify";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/note.controller.js";

// These are AJV (JSON Schema) rules. Fastify checks them automatically
// BEFORE our controller runs. If a rule fails, the controller never runs.
// URL parts are always text, so :id is a string that must contain only digits
const idParams = {
  type: "object",
  properties: { id: { type: "string", pattern: "^[0-9]+$" } },
  required: ["id"],
};

const createBody = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    content: { type: "string", minLength: 1 },
  },
  required: ["title", "content"],
  additionalProperties: false,
};

const updateBody = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    content: { type: "string", minLength: 1 },
  },
  minProperties: 1, // send at least one field to update
  additionalProperties: false,
};

export async function noteRoutes(app: FastifyInstance) {
  app.post("/", { schema: { body: createBody } }, createNote);
  app.get("/", getAllNotes);
  app.get("/:id", { schema: { params: idParams } }, getNoteById);
  app.put("/:id", { schema: { params: idParams, body: updateBody } }, updateNote);
  app.delete("/:id", { schema: { params: idParams } }, deleteNote);
}
