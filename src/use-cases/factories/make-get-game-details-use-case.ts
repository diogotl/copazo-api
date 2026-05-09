import { DrizzleGamesRepository } from "@/repositories/drizzle/drizzle-games-repository";
import { GetGameDetailsUseCase } from "../get-game-details";

export function makeGetGameDetailsUseCase() {
  const gamesRepository = new DrizzleGamesRepository();
  return new GetGameDetailsUseCase(gamesRepository);
}
