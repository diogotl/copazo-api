import { db } from "@/drizzle/client";
import { guesses } from "@/drizzle/schema/guesses";
import { participants } from "@/drizzle/schema/pools";
import { games } from "@/drizzle/schema/games";
import { and, eq, count, ne } from "drizzle-orm";
import type {
  GuessesRepository,
  CreateGuessData,
  UpdateGuessData,
} from "../guesses-repository";

export class DrizzleGuessesRepository implements GuessesRepository {
  async create(data: CreateGuessData) {
    const [guess] = await db.insert(guesses).values(data).returning();
    return guess;
  }

  async update(guessId: string, data: UpdateGuessData) {
    const [guess] = await db
      .update(guesses)
      .set(data)
      .where(eq(guesses.id, guessId))
      .returning();
    return guess;
  }

  async updatePoints(guessId: string, points: number) {
    const [guess] = await db
      .update(guesses)
      .set({ points })
      .where(eq(guesses.id, guessId))
      .returning();
    return guess;
  }

  async findByParticipantAndGame(participantId: string, gameId: string) {
    const guess = await db.query.guesses.findFirst({
      where: and(
        eq(guesses.participantId, participantId),
        eq(guesses.gameId, gameId),
      ),
    });
    return guess ?? null;
  }

  async findByUserAndPool(userId: string, poolId: string) {
    const result = await db
      .select({
        guess: guesses,
        participant: participants,
      })
      .from(guesses)
      .innerJoin(participants, eq(guesses.participantId, participants.id))
      .where(and(eq(participants.userId, userId), eq(guesses.poolId, poolId)));

    return result.map((row) => row.guess);
  }

  async findByUserAndGame(userId: string, gameId: string, poolId: string) {
    const result = await db
      .select({
        guess: guesses,
      })
      .from(guesses)
      .innerJoin(participants, eq(guesses.participantId, participants.id))
      .where(
        and(
          eq(participants.userId, userId),
          eq(guesses.gameId, gameId),
          eq(guesses.poolId, poolId),
        ),
      )
      .limit(1);

    return result[0]?.guess || null;
  }

  async findByGameId(gameId: string) {
    const result = await db.query.guesses.findMany({
      where: eq(guesses.gameId, gameId),
    });
    return result;
  }

  async countJokersInTournamentRound(
    userId: string,
    poolId: string,
    gamePhase: string,
    gameRound: number,
    excludeGameId?: string,
  ) {
    let conditions = [
      eq(participants.userId, userId),
      eq(guesses.poolId, poolId),
      eq(guesses.isJoker, true),
      eq(games.phase, gamePhase),
      eq(games.round, gameRound),
    ];

    if (excludeGameId) {
      conditions.push(ne(guesses.gameId, excludeGameId));
    }

    const result = await db
      .select({ count: count() })
      .from(guesses)
      .innerJoin(participants, eq(guesses.participantId, participants.id))
      .innerJoin(games, eq(guesses.gameId, games.id))
      .where(and(...conditions));

    return result[0]?.count || 0;
  }
}
