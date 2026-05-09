import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeUpdateGuessUseCase } from "@/use-cases/factories/make-update-guess-use-case";
import { GameNotFoundError } from "@/use-cases/errors/game-not-found-error";
import { ParticipantNotFoundError } from "@/use-cases/errors/participant-not-found-error";
import { GuessNotFoundError } from "@/use-cases/errors/guess-not-found-error";
import { GameAlreadyStartedError } from "@/use-cases/errors/game-already-started-error";
import { JokerAlreadyUsedError } from "@/use-cases/errors/joker-already-used-error";

export async function updateGuess(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    poolId: z.string(),
    gameId: z.string(),
  });

  const bodySchema = z.object({
    firstTeamScore: z.number().int().min(0),
    secondTeamScore: z.number().int().min(0),
    isJoker: z.boolean().optional().default(false),
  });

  const { poolId, gameId } = paramsSchema.parse(request.params);
  const { firstTeamScore, secondTeamScore, isJoker } = bodySchema.parse(
    request.body,
  );

  // TODO: substituir pelo userId do JWT autenticado - request.user.sub
  const userId = "placeholder-user-id";

  try {
    const updateGuessUseCase = makeUpdateGuessUseCase();

    const { guess } = await updateGuessUseCase.execute({
      userId,
      poolId,
      gameId,
      firstTeamScore,
      secondTeamScore,
      isJoker,
    });

    return reply.status(200).send({ guess });
  } catch (error) {
    if (error instanceof GameNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    if (error instanceof ParticipantNotFoundError) {
      return reply.status(403).send({ message: error.message });
    }

    if (error instanceof GuessNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    if (error instanceof GameAlreadyStartedError) {
      return reply.status(400).send({ message: error.message });
    }

    if (error instanceof JokerAlreadyUsedError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
