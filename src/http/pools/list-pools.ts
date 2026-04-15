import type { FastifyRequest, FastifyReply } from "fastify";
import { makeListPoolsUseCase } from "@/use-cases/factories/make-list-pools-use-case";

export async function listPools(request: FastifyRequest, reply: FastifyReply) {
  // TODO: substituir pelo userId do JWT autenticado - request.user.sub
  const userId = "placeholder-user-id";

  const listPoolsUseCase = makeListPoolsUseCase();
  const { pools } = await listPoolsUseCase.execute({ userId });

  return reply.status(200).send({ pools });
}
