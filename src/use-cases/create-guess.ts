import type { GuessesRepository } from "@/repositories/guesses-repository";
import type { ParticipantsRepository } from "@/repositories/participants-repository";
import type { GamesRepository } from "@/repositories/games-repository";
import { GameNotFoundError } from "./errors/game-not-found-error";
import { ParticipantNotFoundError } from "./errors/participant-not-found-error";
import { GameAlreadyStartedError } from "./errors/game-already-started-error";
import { JokerAlreadyUsedError } from "./errors/joker-already-used-error";
import { canUseJoker } from "@/libs/points-calculation";

interface CreateGuessUseCaseRequest {
  userId: string;
  poolId: string;
  gameId: string;
  firstTeamScore: number;
  secondTeamScore: number;
  isJoker?: boolean;
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
    isJoker = false,
  }: CreateGuessUseCaseRequest) {
    const game = await this.gamesRepository.findById(gameId);
    if (!game) throw new GameNotFoundError();

    if (game.date < new Date()) throw new GameAlreadyStartedError();

    const participant = await this.participantsRepository.findByUserAndPool(
      userId,
      poolId,
    );
    if (!participant) throw new ParticipantNotFoundError();

    // Validate joker usage if trying to use joker
    if (isJoker) {
      const existingJokersInRound =
        await this.guessesRepository.countJokersInTournamentRound(
          userId,
          poolId,
          game.phase,
          game.round,
          gameId, // exclude current game if updating
        );

      if (!canUseJoker(existingJokersInRound, isJoker)) {
        throw new JokerAlreadyUsedError();
      }
    }

    const existingGuess = await this.guessesRepository.findByParticipantAndGame(
      participant.id,
      gameId,
    );

    let guess;

    if (existingGuess) {
      // Update existing guess
      guess = await this.guessesRepository.update(existingGuess.id, {
        firstTeamScore,
        secondTeamScore,
        isJoker,
      });
    } else {
      // Create new guess
      guess = await this.guessesRepository.create({
        gameId,
        participantId: participant.id,
        poolId,
        firstTeamScore,
        secondTeamScore,
        isJoker,
      });
    }

    return { guess };
  }
}
