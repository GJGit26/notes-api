import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

// Runs whenever something throws an error anywhere in a route.
// It makes sure every error leaves the API in the same { success, message } shape.
export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  // Fastify attaches "validation" when the request body/params broke our schema rules
  if (error.validation) {
    return reply.status(400).send({
      success: false,
      message: error.message, // e.g. "body must have required property 'title'"
    });
  }

  // Anything else is unexpected: log it, but do not leak details to the client
  console.error(error);
  return reply.status(500).send({
    success: false,
    message: "Something went wrong on the server",
  });
}
