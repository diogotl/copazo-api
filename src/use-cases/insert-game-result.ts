import type { ResultsRepository } from "@/repositories/results-repository";
import type { GuessesRepository } from "@/repositories/guesses-repository";
import type { GamesRepository } from "@/repositories/games-repository";
import { calculatePoints, type PointsCalculationInput } from "@/libs/points-calculation";

interface InsertGameResultUseCaseRequest {
  gameId: string;
  firstTeamScore: number;
  secondTeamScore: number;
  insertedBy: string; // admin user ID
}

interface InsertGameResultUseCaseResponse {
  result: {
    id: string;
    gameId: string;
    firstTeamScore: number;
    secondTeamScore: number;
    insertedBy: string | null;
    createdAt: Date | null;
  };
  updatedGuesses: number; // count of guesses that had points calculated
}

export class InsertGameResultUseCase {
  constructor(
    private resultsRepository: ResultsRepository,
    private guessesRepository: GuessesRepository,
    private gamesRepository: GamesRepository,
  ) {}

  async execute({
    gameId,
    firstTeamScore,
    secondTeamScore,
    insertedBy,
  }: InsertGameResultUseCaseRequest): Promise<InsertGameResultUseCaseResponse> {
    // 1. Validate scores
    if (firstTeamScore < 0 || secondTeamScore < 0) {
      throw new Error("Scores cannot be negative");
    }

    // 2. Get game information to know the phase
    const game = await this.gamesRepository.findById(gameId);
    if (!game) {
      throw new Error("Game not found");
    }

    // 3. Check if game has already started (optional validation)
    const now = new Date();
    if (game.date > now) {
      throw new Error("Cannot insert results for games that haven't started yet");
    }

    // 4. Insert or update the game result
    const result = await this.resultsRepository.upsert({
      gameId,
      firstTeamScore,
      secondTeamScore,
      insertedBy,
    });

    // 5. Get all guesses for this game across all pools
    const guesses = await this.guessesRepository.findByGameId(gameId);

    // 6. Calculate points for each guess and update
    let updatedGuesses = 0;

    for (const guess of guesses) {
      const pointsInput: PointsCalculationInput = {
        guessFirstTeamScore: guess.firstTeamScore,
        guessSecondTeamScore: guess.secondTeamScore,
        actualFirstTeamScore: firstTeamScore,
        actualSecondTeamScore: secondTeamScore,
        isJoker: guess.isJoker ?? false,
        gamePhase: game.phase,
      };

      const pointsCalculation = calculatePoints(pointsInput);

      await this.guessesRepository.updatePoints(guess.id, Math.round(pointsCalculation.finalPoints));
      updatedGuesses++;
    }

    return {
      result: {
        id: result.id,
        gameId: result.gameId,
        firstTeamScore: result.firstTeamScore,
        secondTeamScore: result.secondTeamScore,
        insertedBy: result.insertedBy,
        createdAt: result.createdAt,
      },
      updatedGuesses,
    };
  }
}
