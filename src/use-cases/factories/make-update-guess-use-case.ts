import { DrizzleGuessesRepository } from "@/repositories/drizzle/drizzle-guesses-repository";
import { DrizzleParticipantsRepository } from "@/repositories/drizzle/drizzle-participants-repository";
import { DrizzleGamesRepository } from "@/repositories/drizzle/drizzle-games-repository";
import { UpdateGuessUseCase } from "../update-guess";

export function makeUpdateGuessUseCase() {
  const guessesRepository = new DrizzleGuessesRepository();
  const participantsRepository = new DrizzleParticipantsRepository();
  const gamesRepository = new DrizzleGamesRepository();

  return new UpdateGuessUseCase(guessesRepository, participantsRepository, gamesRepository);
}
