import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeInsertGameResultUseCase } from "@/use-cases/factories/make-insert-game-result-use-case";

export async function insertGameResult(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    gameId: z.string().cuid2(),
  });

  const bodySchema = z.object({
    firstTeamScore: z.number().int().min(0).max(50),
    secondTeamScore: z.number().int().min(0).max(50),
  });

  try {
    const paramsResult = paramsSchema.safeParse(request.params);
    const bodyResult = bodySchema.safeParse(request.body);

    if (!paramsResult.success) {
      return reply.status(400).send({
        message: "Invalid game ID",
        issues: paramsResult.error.issues,
      });
    }

    if (!bodyResult.success) {
      return reply.status(400).send({
        message: "Invalid request body",
        issues: bodyResult.error.issues,
      });
    }

    const { gameId } = paramsResult.data;
    const { firstTeamScore, secondTeamScore } = bodyResult.data;

    // TODO: Replace with real admin user ID from JWT: request.user.sub
    const insertedBy = "admin"; // For now, hardcoded admin

    const insertGameResultUseCase = makeInsertGameResultUseCase();

    const { result, updatedGuesses } = await insertGameResultUseCase.execute({
      gameId,
      firstTeamScore,
      secondTeamScore,
      insertedBy,
    });

    return reply.status(200).send({
      message: "Game result inserted successfully",
      result: {
        id: result.id,
        gameId: result.gameId,
        firstTeamScore: result.firstTeamScore,
        secondTeamScore: result.secondTeamScore,
        insertedBy: result.insertedBy,
        createdAt: result.createdAt,
      },
      meta: {
        updatedGuesses,
      },
    });
  } catch (error) {
    console.error("Error inserting game result:", error);

    if (error instanceof Error) {
      if (error.message === "Game not found") {
        return reply.status(404).send({
          message: "Game not found",
        });
      }

      if (error.message === "Cannot insert results for games that haven't started yet") {
        return reply.status(400).send({
          message: "Cannot insert results for games that haven't started yet",
        });
      }

      if (error.message === "Scores cannot be negative") {
        return reply.status(400).send({
          message: "Scores cannot be negative",
        });
      }
    }

    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
