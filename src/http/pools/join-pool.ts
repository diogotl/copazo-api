import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeJoinPoolUseCase } from "@/use-cases/factories/make-join-pool-use-case";
import { PoolNotFoundError } from "@/use-cases/errors/pool-not-found-error";
import { AlreadyInPoolError } from "@/use-cases/errors/already-in-pool-error";

export async function joinPool(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    code: z.string().length(6),
  });

  const { code } = bodySchema.parse(request.body);

  // TODO: substituir pelo userId do JWT autenticado - request.user.sub
  const userId = "placeholder-user-id";

  try {
    const joinPoolUseCase = makeJoinPoolUseCase();

    const { participant } = await joinPoolUseCase.execute({ userId, code });

    return reply.status(201).send({ participant });
  } catch (error) {
    if (error instanceof PoolNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    if (error instanceof AlreadyInPoolError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
