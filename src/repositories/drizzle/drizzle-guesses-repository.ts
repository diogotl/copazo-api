import { db } from "@/drizzle/client";
import { guesses } from "@/drizzle/schema/guesses";
import { and, eq } from "drizzle-orm";
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

  async findByParticipantAndGame(participantId: string, gameId: string) {
    const guess = await db.query.guesses.findFirst({
      where: and(
        eq(guesses.participantId, participantId),
        eq(guesses.gameId, gameId),
      ),
    });
    return guess ?? null;
  }
}
