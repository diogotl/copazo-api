import type { FastifyReply, FastifyRequest } from "fastify";

export async function logout(_request: FastifyRequest, reply: FastifyReply) {
  return reply
    .clearCookie("refreshToken", {
      path: "/",
    })
    .status(200)
    .send({ message: "Logged out successfully." });
}
