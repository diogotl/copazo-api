import type { Game } from "@/drizzle/schema/games";

export interface GamesRepository {
  findById(id: string): Promise<Game | null>;
}
