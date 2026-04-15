import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeGetPoolGamesUseCase } from "@/use-cases/factories/make-get-pool-games-use-case";
import { PoolNotFoundError } from "@/use-cases/errors/pool-not-found-error";
import { ParticipantNotFoundError } from "@/use-cases/errors/participant-not-found-error";

export async function getPoolGames(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Validate URL parameters
    const paramsSchema = z.object({
      poolId: z.string().min(1),
    });

    const paramsResult = paramsSchema.safeParse(request.params);
    if (!paramsResult.success) {
      return reply.status(400).send({
        error: "Invalid parameters",
        details: paramsResult.error.issues,
      });
    }

    // Validate query parameters
    const querySchema = z.object({
      phase: z.string().optional(),
      group: z.string().optional(),
      upcoming: z.string().optional().transform((val) => val === "true"),
      limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 50),
    });

    const queryResult = querySchema.safeParse(request.query);
    if (!queryResult.success) {
      return reply.status(400).send({
        error: "Invalid query parameters",
        details: queryResult.error.issues,
      });
    }

    const { poolId } = paramsResult.data;
    const { phase, group, upcoming, limit } = queryResult.data;

    // TODO: substituir pelo userId do JWT autenticado - request.user.sub
    const userId = "placeholder-user-id";

    console.log(`Getting games for pool ${poolId}, user ${userId}`);

    const getPoolGamesUseCase = makeGetPoolGamesUseCase();
    const result = await getPoolGamesUseCase.execute({
      poolId,
      userId,
      phase,
      group,
      upcoming,
      limit,
    });

    console.log(`Found ${result.games.length} games for pool ${poolId}`);

    return reply.status(200).send({
      success: true,
      pool: result.pool,
      games: result.games.map(game => ({
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
        userGuess: game.userGuess ? {
          id: game.userGuess.id,
          firstTeamScore: game.userGuess.firstTeamScore,
          secondTeamScore: game.userGuess.secondTeamScore,
          points: game.userGuess.points,
          createdAt: game.userGuess.createdAt,
        } : null,
      })),
      stats: result.stats,
    });
  } catch (error) {
    console.error("Error in getPoolGames:", error);

    if (error instanceof PoolNotFoundError) {
      return reply.status(404).send({
        error: "Pool not found",
        message: error.message,
      });
    }

    if (error instanceof ParticipantNotFoundError) {
      return reply.status(403).send({
        error: "Access denied",
        message: "You must be a participant in this pool to view games",
      });
    }

    return reply.status(500).send({
      error: "Internal server error",
      message: "Failed to get pool games",
    });
  }
}
