import type {
  GamesRepository,
  GameWithTeams,
} from "@/repositories/games-repository";
import type { GuessesRepository } from "@/repositories/guesses-repository";
import type { ParticipantsRepository } from "@/repositories/participants-repository";
import type { PoolsRepository } from "@/repositories/pools-repository";
import { PoolNotFoundError } from "./errors/pool-not-found-error";
import { ParticipantNotFoundError } from "./errors/participant-not-found-error";

interface GetPoolGamesUseCaseRequest {
  poolId: string;
  userId: string;
  phase?: string;
  group?: string;
  upcoming?: boolean;
  limit?: number;
}

interface GameWithGuess extends GameWithTeams {
  userGuess?: {
    id: string;
    firstTeamScore: number;
    secondTeamScore: number;
    points: number | null;
    createdAt: Date | null;
  } | null;
}

interface GetPoolGamesUseCaseResponse {
  pool: {
    id: string;
    title: string;
    code: string;
  };
  games: GameWithGuess[];
  stats: {
    totalGames: number;
    gamesWithGuesses: number;
    upcomingGames: number;
  };
}

export class GetPoolGamesUseCase {
  constructor(
    private gamesRepository: GamesRepository,
    private guessesRepository: GuessesRepository,
    private participantsRepository: ParticipantsRepository,
    private poolsRepository: PoolsRepository,
  ) {}

  async execute({
    poolId,
    userId,
    phase,
    group,
    upcoming,
    limit = 50,
  }: GetPoolGamesUseCaseRequest): Promise<GetPoolGamesUseCaseResponse> {
    // 1. Verify pool exists
    const pool = await this.poolsRepository.findById(poolId);
    if (!pool) {
      throw new PoolNotFoundError();
    }

    // 2. Verify user is participant in this pool
    const participant = await this.participantsRepository.findByUserAndPool(
      userId,
      poolId,
    );
    if (!participant) {
      throw new ParticipantNotFoundError();
    }

    // 3. Get games with filters
    const games = await this.gamesRepository.findManyWithTeams({
      phase,
      group,
      upcoming,
      limit,
    });

    // 4. Get user's guesses for these games
    const gamesWithGuesses: GameWithGuess[] = [];

    for (const game of games) {
      const userGuess = await this.guessesRepository.findByParticipantAndGame(
        participant.id,
        game.id,
      );

      const gameWithGuess: GameWithGuess = {
        ...game,
        userGuess: userGuess
          ? {
              id: userGuess.id,
              firstTeamScore: userGuess.firstTeamScore,
              secondTeamScore: userGuess.secondTeamScore,
              points: userGuess.points,
              createdAt: userGuess.createdAt,
            }
          : null,
      };

      gamesWithGuesses.push(gameWithGuess);
    }

    // 5. Calculate stats
    const now = new Date();
    const stats = {
      totalGames: gamesWithGuesses.length,
      gamesWithGuesses: gamesWithGuesses.filter((g) => g.userGuess !== null)
        .length,
      upcomingGames: gamesWithGuesses.filter((g) => new Date(g.date) > now)
        .length,
    };

    return {
      pool: {
        id: pool.id,
        title: pool.title,
        code: pool.code,
      },
      games: gamesWithGuesses,
      stats,
    };
  }
}
