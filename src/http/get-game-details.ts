import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeGetGameDetailsUseCase } from "@/use-cases/factories/make-get-game-details-use-case";
import { GameNotFoundError } from "@/use-cases/errors/game-not-found-error";

export async function getGameDetails(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Validate URL parameters
    const paramsSchema = z.object({
      gameId: z.string().min(1),
    });

    const paramsResult = paramsSchema.safeParse(request.params);
    if (!paramsResult.success) {
      return reply.status(400).send({
        error: "Invalid parameters",
        details: paramsResult.error.issues,
      });
    }

    const { gameId } = paramsResult.data;

    console.log(`Getting details for game: ${gameId}`);

    const getGameDetailsUseCase = makeGetGameDetailsUseCase();
    const { game } = await getGameDetailsUseCase.execute({ gameId });

    console.log(`Found game: ${game.firstTeam.name} vs ${game.secondTeam.name}`);

    return reply.status(200).send({
      success: true,
      game: {
        id: game.id,
        date: game.date,
        phase: game.phase,
        group: game.group,
        firstTeam: {
          id: game.firstTeam.id,
          name: game.firstTeam.name,
          countryCode: game.firstTeam.countryCode,
          fifaCode: game.firstTeam.fifaCode,
          flagUrl: game.firstTeam.flagUrl,
        },
        secondTeam: {
          id: game.secondTeam.id,
          name: game.secondTeam.name,
          countryCode: game.secondTeam.countryCode,
          fifaCode: game.secondTeam.fifaCode,
          flagUrl: game.secondTeam.flagUrl,
        },
        stadium: game.stadium ? {
          id: game.stadium.id,
          name: game.stadium.name,
          city: game.stadium.city,
          countryCode: game.stadium.countryCode,
          capacity: game.stadium.capacity,
        } : null,
      },
    });
  } catch (error) {
    console.error("Error in getGameDetails:", error);

    if (error instanceof GameNotFoundError) {
      return reply.status(404).send({
        error: "Game not found",
        message: error.message,
      });
    }

    return reply.status(500).send({
      error: "Internal server error",
      message: "Failed to get game details",
    });
  }
}
