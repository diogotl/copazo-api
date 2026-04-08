import { DrizzleGuessesRepository } from "@/repositories/drizzle/drizzle-guesses-repository";
import { DrizzleParticipantsRepository } from "@/repositories/drizzle/drizzle-participants-repository";
import { DrizzleGamesRepository } from "@/repositories/drizzle/drizzle-games-repository";
import { CreateGuessUseCase } from "../create-guess";

export function makeCreateGuessUseCase() {
  const guessesRepository = new DrizzleGuessesRepository();
  const participantsRepository = new DrizzleParticipantsRepository();
  const gamesRepository = new DrizzleGamesRepository();

  return new CreateGuessUseCase(guessesRepository, participantsRepository, gamesRepository);
}
