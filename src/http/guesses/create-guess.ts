import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateGuessUseCase } from "@/use-cases/factories/make-create-guess-use-case";
import { GameNotFoundError } from "@/use-cases/errors/game-not-found-error";
import { GameAlreadyStartedError } from "@/use-cases/errors/game-already-started-error";
import { ParticipantNotFoundError } from "@/use-cases/errors/participant-not-found-error";
import { JokerAlreadyUsedError } from "@/use-cases/errors/joker-already-used-error";

export async function createGuess(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Validate URL params
    const paramsSchema = z.object({
      poolId: z.string().min(1),
      gameId: z.string().min(1),
    });

    const paramsResult = paramsSchema.safeParse(request.params);
    if (!paramsResult.success) {
      return reply.status(400).send({
        error: "Invalid parameters",
        details: paramsResult.error.issues,
      });
    }

    // Check if body exists
    if (!request.body || typeof request.body !== "object") {
      return reply.status(400).send({
        error: "Request body is required and must be JSON",
      });
    }

    // Validate body
    const bodySchema = z.object({
      firstTeamScore: z.number().int().min(0).max(50),
      secondTeamScore: z.number().int().min(0).max(50),
      isJoker: z.boolean().optional().default(false),
    });

    const bodyResult = bodySchema.safeParse(request.body);
    if (!bodyResult.success) {
      return reply.status(400).send({
        error: "Invalid request body",
        details: bodyResult.error.issues,
      });
    }

    const { poolId, gameId } = paramsResult.data;
    const { firstTeamScore, secondTeamScore, isJoker } = bodyResult.data;

    // TODO: Replace with real user ID from JWT: request.user.sub
    const userId = "placeholder-user-id";

    console.log(
      `Creating/updating guess for user ${userId} in pool ${poolId} for game ${gameId}`,
    );

    const createGuessUseCase = makeCreateGuessUseCase();

    const { guess } = await createGuessUseCase.execute({
      userId,
      poolId,
      gameId,
      firstTeamScore,
      secondTeamScore,
      isJoker,
    });

    console.log(`Guess saved successfully: ${guess.id}`);

    return reply.status(201).send({
      success: true,
      guess: {
        id: guess.id,
        firstTeamScore: guess.firstTeamScore,
        secondTeamScore: guess.secondTeamScore,
        isJoker: guess.isJoker,
        gameId: guess.gameId,
        poolId: guess.poolId,
        createdAt: guess.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in createGuess:", error);

    if (error instanceof GameNotFoundError) {
      return reply.status(404).send({
        error: "Game not found",
        message: error.message,
      });
    }

    if (error instanceof ParticipantNotFoundError) {
      return reply.status(403).send({
        error: "Access denied",
        message: "You must be a participant in this pool to make guesses",
      });
    }

    if (error instanceof GameAlreadyStartedError) {
      return reply.status(400).send({
        error: "Game already started",
        message: "Cannot create or update guess after game has started",
      });
    }

    if (error instanceof JokerAlreadyUsedError) {
      return reply.status(400).send({
        error: "Joker already used",
        message: error.message,
      });
    }

    // Generic server error
    return reply.status(500).send({
      error: "Internal server error",
      message: "Failed to save guess",
    });
  }
}
