import { db } from "@/drizzle/client";
import { games } from "@/drizzle/schema/games";
import { teams } from "@/drizzle/schema/teams";
import { stadiums } from "@/drizzle/schema/stadiums";
import { and, eq, gte, lte, or, asc, isNotNull } from "drizzle-orm";
import type {
  GamesRepository,
  GameWithTeams,
  FindGamesFilters,
} from "../games-repository";

export class DrizzleGamesRepository implements GamesRepository {
  async findById(id: string) {
    const game = await db.query.games.findFirst({
      where: eq(games.id, id),
    });
    return game ?? null;
  }

  async findByIdWithTeams(id: string): Promise<GameWithTeams | null> {
    const result = await db
      .select({
        game: games,
        firstTeam: teams,
        secondTeam: teams,
        stadium: stadiums,
      })
      .from(games)
      .leftJoin(teams, eq(games.firstTeamId, teams.id))
      .leftJoin(stadiums, eq(games.stadiumId, stadiums.id))
      .where(eq(games.id, id))
      .limit(1);

    if (!result.length) return null;

    const row = result[0];
    if (!row.firstTeam) return null;

    // Get second team separately
    const secondTeamResult = await db
      .select()
      .from(teams)
      .where(eq(teams.id, row.game.secondTeamId))
      .limit(1);

    const secondTeam = secondTeamResult[0];
    if (!secondTeam) return null;

    return {
      id: row.game.id,
      date: row.game.date,
      phase: row.game.phase,
      group: row.game.group,
      createdAt: row.game.createdAt,
      firstTeam: {
        id: row.firstTeam.id,
        name: row.firstTeam.name,
        countryCode: row.firstTeam.countryCode,
        fifaCode: row.firstTeam.fifaCode,
        confederation: row.firstTeam.confederation,
        flagUrl: row.firstTeam.flagUrl,
      },
      secondTeam: {
        id: secondTeam.id,
        name: secondTeam.name,
        countryCode: secondTeam.countryCode,
        fifaCode: secondTeam.fifaCode,
        confederation: secondTeam.confederation,
        flagUrl: secondTeam.flagUrl,
      },
      stadium: row.stadium
        ? {
            id: row.stadium.id,
            name: row.stadium.name,
            city: row.stadium.city,
            countryCode: row.stadium.countryCode,
            capacity: row.stadium.capacity,
          }
        : null,
    };
  }

  async findMany(filters: FindGamesFilters = {}) {
    const conditions = this.buildConditions(filters);
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const gamesList = await db.query.games.findMany({
      where: whereClause,
      orderBy: [asc(games.date)],
      limit: filters.limit || 50,
      offset: filters.offset || 0,
    });

    return gamesList;
  }

  async findManyWithTeams(
    filters: FindGamesFilters = {},
  ): Promise<GameWithTeams[]> {
    const conditions = this.buildConditions(filters);
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get games first
    const gamesList = await db.query.games.findMany({
      where: whereClause,
      orderBy: [asc(games.date)],
      limit: filters.limit || 50,
      offset: filters.offset || 0,
    });

    // Get detailed info for each game
    const gamesWithTeams: GameWithTeams[] = [];

    for (const game of gamesList) {
      // Get first team
      const firstTeamResult = await db
        .select()
        .from(teams)
        .where(eq(teams.id, game.firstTeamId))
        .limit(1);

      // Get second team
      const secondTeamResult = await db
        .select()
        .from(teams)
        .where(eq(teams.id, game.secondTeamId))
        .limit(1);

      // Get stadium
      let stadium = null;
      if (game.stadiumId) {
        const stadiumResult = await db
          .select()
          .from(stadiums)
          .where(eq(stadiums.id, game.stadiumId))
          .limit(1);
        stadium = stadiumResult[0] || null;
      }

      const firstTeam = firstTeamResult[0];
      const secondTeam = secondTeamResult[0];

      if (firstTeam && secondTeam) {
        gamesWithTeams.push({
          id: game.id,
          date: game.date,
          phase: game.phase,
          group: game.group,
          createdAt: game.createdAt,
          firstTeam: {
            id: firstTeam.id,
            name: firstTeam.name,
            countryCode: firstTeam.countryCode,
            fifaCode: firstTeam.fifaCode,
            confederation: firstTeam.confederation,
            flagUrl: firstTeam.flagUrl,
          },
          secondTeam: {
            id: secondTeam.id,
            name: secondTeam.name,
            countryCode: secondTeam.countryCode,
            fifaCode: secondTeam.fifaCode,
            confederation: secondTeam.confederation,
            flagUrl: secondTeam.flagUrl,
          },
          stadium: stadium
            ? {
                id: stadium.id,
                name: stadium.name,
                city: stadium.city,
                countryCode: stadium.countryCode,
                capacity: stadium.capacity,
              }
            : null,
        });
      }
    }

    return gamesWithTeams;
  }

  async findByPhase(phase: string) {
    return this.findMany({ phase });
  }

  async findByTeam(teamId: string) {
    return this.findMany({ teamId });
  }

  async findByGroup(group: string) {
    return this.findMany({ group });
  }

  async findUpcoming(limit = 10) {
    return this.findMany({ upcoming: true, limit });
  }

  async findToday() {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );

    return this.findMany({
      dateFrom: startOfDay,
      dateTo: endOfDay,
    });
  }

  async findByDateRange(from: Date, to: Date) {
    return this.findMany({
      dateFrom: from,
      dateTo: to,
    });
  }

  async getPhases(): Promise<string[]> {
    const result = await db
      .selectDistinct({ phase: games.phase })
      .from(games)
      .orderBy(games.phase);

    return result.map((row) => row.phase);
  }

  async getGroups(): Promise<string[]> {
    const result = await db
      .selectDistinct({ group: games.group })
      .from(games)
      .where(isNotNull(games.group))
      .orderBy(games.group);

    return result.map((row) => row.group!);
  }

  private buildConditions(filters: FindGamesFilters) {
    const conditions = [];

    if (filters.phase) {
      conditions.push(eq(games.phase, filters.phase));
    }

    if (filters.group) {
      conditions.push(eq(games.group, filters.group));
    }

    if (filters.teamId) {
      conditions.push(
        or(
          eq(games.firstTeamId, filters.teamId),
          eq(games.secondTeamId, filters.teamId),
        ),
      );
    }

    if (filters.dateFrom) {
      conditions.push(gte(games.date, filters.dateFrom));
    }

    if (filters.dateTo) {
      conditions.push(lte(games.date, filters.dateTo));
    }

    if (filters.upcoming) {
      conditions.push(gte(games.date, new Date()));
    }

    return conditions;
  }
}
