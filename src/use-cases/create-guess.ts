import type { GuessesRepository } from "@/repositories/guesses-repository";
import type { ParticipantsRepository } from "@/repositories/participants-repository";
import type { GamesRepository } from "@/repositories/games-repository";
import { GameNotFoundError } from "./errors/game-not-found-error";
import { ParticipantNotFoundError } from "./errors/participant-not-found-error";
import { GuessAlreadyExistsError } from "./errors/guess-already-exists-error";
import { GameAlreadyStartedError } from "./errors/game-already-started-error";

interface CreateGuessUseCaseRequest {
  userId: string;
  poolId: string;
  gameId: string;
  firstTeamScore: number;
  secondTeamScore: number;
}

export class CreateGuessUseCase {
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
  }: CreateGuessUseCaseRequest) {
    const game = await this.gamesRepository.findById(gameId);
    if (!game) throw new GameNotFoundError();

    if (game.date < new Date()) throw new GameAlreadyStartedError();

    const participant = await this.participantsRepository.findByUserAndPool(userId, poolId);
    if (!participant) throw new ParticipantNotFoundError();

    const existingGuess = await this.guessesRepository.findByParticipantAndGame(
      participant.id,
      gameId,
    );
    if (existingGuess) throw new GuessAlreadyExistsError();

    const guess = await this.guessesRepository.create({
      gameId,
      participantId: participant.id,
      poolId,
      firstTeamScore,
      secondTeamScore,
    });

    return { guess };
  }
}
