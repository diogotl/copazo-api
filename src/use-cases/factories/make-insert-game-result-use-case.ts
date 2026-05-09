import { DrizzleResultsRepository } from "@/repositories/drizzle/drizzle-results-repository";
import { DrizzleGuessesRepository } from "@/repositories/drizzle/drizzle-guesses-repository";
import { DrizzleGamesRepository } from "@/repositories/drizzle/drizzle-games-repository";
import { InsertGameResultUseCase } from "../insert-game-result";

export function makeInsertGameResultUseCase() {
  const resultsRepository = new DrizzleResultsRepository();
  const guessesRepository = new DrizzleGuessesRepository();
  const gamesRepository = new DrizzleGamesRepository();

  const insertGameResultUseCase = new InsertGameResultUseCase(
    resultsRepository,
    guessesRepository,
    gamesRepository,
  );

  return insertGameResultUseCase;
}
