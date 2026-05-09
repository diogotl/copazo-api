import { db } from "@/drizzle/client";
import { results } from "@/drizzle/schema/results";
import { eq } from "drizzle-orm";
import type {
  ResultsRepository,
  CreateResultData,
  UpdateResultData,
} from "../results-repository";

export class DrizzleResultsRepository implements ResultsRepository {
  async create(data: CreateResultData) {
    const [result] = await db.insert(results).values(data).returning();
    return result;
  }

  async upsert(data: CreateResultData) {
    const [result] = await db
      .insert(results)
      .values(data)
      .onConflictDoUpdate({
        target: results.gameId,
        set: {
          firstTeamScore: data.firstTeamScore,
          secondTeamScore: data.secondTeamScore,
          insertedBy: data.insertedBy,
          createdAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  async update(resultId: string, data: UpdateResultData) {
    const [result] = await db
      .update(results)
      .set(data)
      .where(eq(results.id, resultId))
      .returning();
    return result;
  }

  async findByGameId(gameId: string) {
    const result = await db.query.results.findFirst({
      where: eq(results.gameId, gameId),
    });
    return result ?? null;
  }

  async findById(id: string) {
    const result = await db.query.results.findFirst({
      where: eq(results.id, id),
    });
    return result ?? null;
  }

  async deleteByGameId(gameId: string) {
    await db.delete(results).where(eq(results.gameId, gameId));
  }
}
