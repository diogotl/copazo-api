import type { GuessesRepository } from "@/repositories/guesses-repository";
import type { ParticipantsRepository } from "@/repositories/participants-repository";
import type { GamesRepository } from "@/repositories/games-repository";
import { GameNotFoundError } from "./errors/game-not-found-error";
import { GameAlreadyStartedError } from "./errors/game-already-started-error";
import { ParticipantNotFoundError } from "./errors/participant-not-found-error";
import { GuessNotFoundError } from "./errors/guess-not-found-error";

interface UpdateGuessUseCaseRequest {
  userId: string;
  poolId: string;
  gameId: string;
  firstTeamScore: number;
  secondTeamScore: number;
}

export class UpdateGuessUseCase {
  constructor(
    private guessesRepository: GuessesRepository,
    private participantsRepository: ParticipantsRepository,
    private gamesRepository: GamesRepository,
  ) {}

  async execute({
    userId,
    poolId,
    gameId,
    firstTeamScore,
    secondTeamScore,
  }: UpdateGuessUseCaseRequest) {
    const game = await this.gamesRepository.findById(gameId);
    if (!game) throw new GameNotFoundError();

    if (game.date < new Date()) throw new GameAlreadyStartedError();

    const participant = await this.participantsRepository.findByUserAndPool(userId, poolId);
    if (!participant) throw new ParticipantNotFoundError();

    const existingGuess = await this.guessesRepository.findByParticipantAndGame(
      participant.id,
      gameId,
    );
    if (!existingGuess) throw new GuessNotFoundError();

    const guess = await this.guessesRepository.update(existingGuess.id, {
      firstTeamScore,
      secondTeamScore,
    });

    return { guess };
  }
}
