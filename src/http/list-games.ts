import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeListGamesUseCase } from "@/use-cases/factories/make-list-games-use-case";

export async function listGames(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Validate query parameters
    const querySchema = z.object({
      phase: z.string().optional(), // 'group', 'round32', 'round16', 'quarterfinal', 'semifinal', 'final'
      group: z.string().optional(), // 'A', 'B', 'C', etc.
      teamId: z.string().optional(), // Filter by team participation
      upcoming: z
        .string()
        .optional()
        .transform((val) => val === "true"), // Only upcoming games
      limit: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 100)),
    });

    const queryResult = querySchema.safeParse(request.query);
    if (!queryResult.success) {
      return reply.status(400).send({
        error: "Invalid query parameters",
        details: queryResult.error.issues,
      });
    }

    const { phase, group, teamId, upcoming, limit } = queryResult.data;

    console.log(`Listing games with filters:`, {
      phase,
      group,
      teamId,
      upcoming,
      limit,
    });

    const listGamesUseCase = makeListGamesUseCase();
    const { games } = await listGamesUseCase.execute({
      phase,
      group,
      teamId,
      upcoming,
      limit,
    });

    console.log(`Found ${games.length} games`);

    return reply.status(200).send({
      success: true,
      games: games.map((game) => ({
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
        stadium: game.stadium
          ? {
              id: game.stadium.id,
              name: game.stadium.name,
              city: game.stadium.city,
              countryCode: game.stadium.countryCode,
              capacity: game.stadium.capacity,
            }
          : null,
      })),
      total: games.length,
    });
  } catch (error) {
    console.error("Error in listGames:", error);

    return reply.status(500).send({
      error: "Internal server error",
      message: "Failed to list games",
    });
  }
}
