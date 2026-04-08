import { db } from "@/drizzle/client";
import { games } from "@/drizzle/schema/games";
import { eq } from "drizzle-orm";
import type { GamesRepository } from "../games-repository";

export class DrizzleGamesRepository implements GamesRepository {
  async findById(id: string) {
    const game = await db.query.games.findFirst({
      where: eq(games.id, id),
    });
    return game ?? null;
  }
}
