import type { FastifyReply, FastifyRequest } from "fastify";

// Turns a Date into "2026-10-03 18:30:20"
function formatTime(date: Date): string {
  return date.toISOString().replace("T", " ").slice(0, 19);
}

// Middleware in Fastify is a "hook": a function that runs on every request
// BEFORE it reaches the route. This one just prints a log line.
export async function logger(request: FastifyRequest, _reply: FastifyReply) {
  console.log(`[${formatTime(new Date())}] ${request.method} ${request.url}`);
}
