import { DrizzleGamesRepository } from "@/repositories/drizzle/drizzle-games-repository";
import { DrizzleGuessesRepository } from "@/repositories/drizzle/drizzle-guesses-repository";
import { DrizzleParticipantsRepository } from "@/repositories/drizzle/drizzle-participants-repository";
import { DrizzlePoolsRepository } from "@/repositories/drizzle/drizzle-pools-repository";
import { GetPoolGamesUseCase } from "../get-pool-games";

export function makeGetPoolGamesUseCase() {
  const gamesRepository = new DrizzleGamesRepository();
  const guessesRepository = new DrizzleGuessesRepository();
  const participantsRepository = new DrizzleParticipantsRepository();
  const poolsRepository = new DrizzlePoolsRepository();

  return new GetPoolGamesUseCase(
    gamesRepository,
    guessesRepository,
    participantsRepository,
    poolsRepository,
  );
}
