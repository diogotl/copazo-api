import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateGuessUseCase } from "@/use-cases/factories/make-create-guess-use-case";
import { GameNotFoundError } from "@/use-cases/errors/game-not-found-error";
import { ParticipantNotFoundError } from "@/use-cases/errors/participant-not-found-error";
import { GuessAlreadyExistsError } from "@/use-cases/errors/guess-already-exists-error";
import { GameAlreadyStartedError } from "@/use-cases/errors/game-already-started-error";

export async function createGuess(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    poolId: z.string(),
    gameId: z.string(),
  });

  const bodySchema = z.object({
    firstTeamScore: z.number().int().min(0),
    secondTeamScore: z.number().int().min(0),
  });

  const { poolId, gameId } = paramsSchema.parse(request.params);
  const { firstTeamScore, secondTeamScore } = bodySchema.parse(request.body);

  // TODO: substituir pelo userId do JWT autenticado - request.user.sub
  const userId = "placeholder-user-id";

  try {
    const createGuessUseCase = makeCreateGuessUseCase();

    const { guess } = await createGuessUseCase.execute({
      userId,
      poolId,
      gameId,
      firstTeamScore,
      secondTeamScore,
    });

    return reply.status(201).send({ guess });
  } catch (error) {
    if (error instanceof GameNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    if (error instanceof ParticipantNotFoundError) {
      return reply.status(403).send({ message: error.message });
    }

    if (error instanceof GuessAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof GameAlreadyStartedError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
