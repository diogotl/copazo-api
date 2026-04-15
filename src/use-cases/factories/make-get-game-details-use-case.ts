import { SimpleCachedGamesRepository } from "@/repositories/drizzle/simple-cached-games-repository";
import { GetGameDetailsUseCase } from "../get-game-details";

export function makeGetGameDetailsUseCase() {
  const gamesRepository = new SimpleCachedGamesRepository();
  return new GetGameDetailsUseCase(gamesRepository);
}
