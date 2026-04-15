import { DrizzleGamesRepository } from "@/repositories/drizzle/drizzle-games-repository";
import { ListGamesUseCase } from "../list-games";

export function makeListGamesUseCase() {
  const gamesRepository = new DrizzleGamesRepository();
  return new ListGamesUseCase(gamesRepository);
}
