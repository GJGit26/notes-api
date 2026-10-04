import "dotenv/config";
import Fastify from "fastify";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { noteRoutes } from "./routes/note.routes.js";

// coerceTypes: false = strict validation. Without it, AJV would quietly turn
// the number 123 into the string "123" and "title must be a string" would never fail.
const app = Fastify({
  ajv: { customOptions: { coerceTypes: false } },
});

// Middleware: runs on every request, before the route
app.addHook("onRequest", logger);

// Error middleware: catches errors from any route
app.setErrorHandler(errorHandler);

// Unknown URLs get the same response shape too
app.setNotFoundHandler((_request, reply) => {
  reply.status(404).send({ success: false, message: "Route not found" });
});

// Every route inside noteRoutes gets the /api/notes prefix
app.register(noteRoutes, { prefix: "/api/notes" });

const port = Number(process.env.PORT) || 5000;

try {
  // host 0.0.0.0 is needed so cloud hosts can reach the server
  await app.listen({ port, host: "0.0.0.0" });
  console.log(`Server running on http://localhost:${port}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
