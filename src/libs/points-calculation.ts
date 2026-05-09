export interface GamePhase {
  GROUP_STAGE: "group_stage";
  ROUND_OF_32: "round_of_32";
  ROUND_OF_16: "round_of_16";
  QUARTERFINALS: "quarterfinals";
  SEMIFINALS: "semifinals";
  THIRD_PLACE: "third_place";
  FINAL: "final";
}

export const GAME_PHASES: GamePhase = {
  GROUP_STAGE: "group_stage",
  ROUND_OF_32: "round_of_32",
  ROUND_OF_16: "round_of_16",
  QUARTERFINALS: "quarterfinals",
  SEMIFINALS: "semifinals",
  THIRD_PLACE: "third_place",
  FINAL: "final",
};

/**
 * Tournament round structure for joker system
 * Each round allows 1 joker per user per pool
 */
export const TOURNAMENT_ROUNDS = {
  GROUP_STAGE_ROUND_1: 1,
  GROUP_STAGE_ROUND_2: 2,
  GROUP_STAGE_ROUND_3: 3,
  ROUND_OF_32: 4,
  ROUND_OF_16: 5,
  QUARTERFINALS: 6,
  SEMIFINALS: 7,
  THIRD_PLACE_AND_FINAL: 8,
} as const;

/**
 * Maps game phase and round number to tournament round
 * This determines joker availability - each tournament round allows 1 joker
 */
export function getTournamentRound(
  gamePhase: keyof GamePhase,
  gameRound: number,
): number {
  switch (gamePhase) {
    case GAME_PHASES.GROUP_STAGE:
      // Group stage has 3 matchdays/rounds
      if (gameRound === 1) return TOURNAMENT_ROUNDS.GROUP_STAGE_ROUND_1;
      if (gameRound === 2) return TOURNAMENT_ROUNDS.GROUP_STAGE_ROUND_2;
      if (gameRound === 3) return TOURNAMENT_ROUNDS.GROUP_STAGE_ROUND_3;
      throw new Error(`Invalid group stage round: ${gameRound}`);

    case GAME_PHASES.ROUND_OF_32:
      return TOURNAMENT_ROUNDS.ROUND_OF_32;

    case GAME_PHASES.ROUND_OF_16:
      return TOURNAMENT_ROUNDS.ROUND_OF_16;

    case GAME_PHASES.QUARTERFINALS:
      return TOURNAMENT_ROUNDS.QUARTERFINALS;

    case GAME_PHASES.SEMIFINALS:
      return TOURNAMENT_ROUNDS.SEMIFINALS;

    case GAME_PHASES.THIRD_PLACE:
    case GAME_PHASES.FINAL:
      return TOURNAMENT_ROUNDS.THIRD_PLACE_AND_FINAL;

    default:
      throw new Error(`Unknown game phase: ${gamePhase}`);
  }
}

/**
 * Gets human-readable description for a tournament round
 */
export function getTournamentRoundDescription(tournamentRound: number): string {
  switch (tournamentRound) {
    case TOURNAMENT_ROUNDS.GROUP_STAGE_ROUND_1:
      return "Group Stage - Matchday 1";
    case TOURNAMENT_ROUNDS.GROUP_STAGE_ROUND_2:
      return "Group Stage - Matchday 2";
    case TOURNAMENT_ROUNDS.GROUP_STAGE_ROUND_3:
      return "Group Stage - Matchday 3";
    case TOURNAMENT_ROUNDS.ROUND_OF_32:
      return "Round of 32";
    case TOURNAMENT_ROUNDS.ROUND_OF_16:
      return "Round of 16";
    case TOURNAMENT_ROUNDS.QUARTERFINALS:
      return "Quarterfinals";
    case TOURNAMENT_ROUNDS.SEMIFINALS:
      return "Semifinals";
    case TOURNAMENT_ROUNDS.THIRD_PLACE_AND_FINAL:
      return "Third Place & Final";
    default:
      return `Round ${tournamentRound}`;
  }
}

export interface PointsCalculationInput {
  guessFirstTeamScore: number;
  guessSecondTeamScore: number;
  actualFirstTeamScore: number;
  actualSecondTeamScore: number;
  isJoker: boolean;
  gamePhase: keyof GamePhase;
}

export interface PointsBreakdown {
  resultPoints: number; // 3 points for correct winner/draw, 0 for wrong
  scorePoints: number; // 2 for exact score, 1 for correct goal difference, 0 otherwise
  basePoints: number; // resultPoints + scorePoints (max 5)
  phaseMultiplier: number; // 1.0 for group, 1.5 for eliminations, 2.0 for final
  pointsAfterPhase: number; // basePoints * phaseMultiplier
  jokerMultiplier: number; // 2.0 if joker, 1.0 otherwise
  finalPoints: number; // pointsAfterPhase * jokerMultiplier
}

/**
 * Determines the winner or if it's a draw
 * @param firstTeamScore
 * @param secondTeamScore
 * @returns "first" | "second" | "draw"
 */
function getResult(
  firstTeamScore: number,
  secondTeamScore: number,
): "first" | "second" | "draw" {
  if (firstTeamScore > secondTeamScore) return "first";
  if (secondTeamScore > firstTeamScore) return "second";
  return "draw";
}

/**
 * Calculates goal difference (can be negative)
 */
function getGoalDifference(
  firstTeamScore: number,
  secondTeamScore: number,
): number {
  return firstTeamScore - secondTeamScore;
}

/**
 * Gets phase multiplier based on game phase
 */
function getPhaseMultiplier(gamePhase: keyof GamePhase): number {
  switch (gamePhase) {
    case GAME_PHASES.GROUP_STAGE:
      return 1.0;
    case GAME_PHASES.ROUND_OF_32:
    case GAME_PHASES.ROUND_OF_16:
    case GAME_PHASES.QUARTERFINALS:
    case GAME_PHASES.SEMIFINALS:
    case GAME_PHASES.THIRD_PLACE:
      return 1.5;
    case GAME_PHASES.FINAL:
      return 2.0;
    default:
      return 1.0;
  }
}

/**
 * Main function to calculate points for a guess
 *
 * Rules:
 * 1. Correct winner/draw: 3 points, Wrong: 0 points
 * 2. Exact score: +2 points, Correct goal difference only: +1 point
 * 3. Max base points per game: 5
 * 4. Phase multipliers: Group=1x, Eliminations (32,16,quarters,semis,3rd)=1.5x, Final=2x
 * 5. Joker: doubles final points (applied after phase multiplier)
 *
 * Round structure (each round allows 1 joker):
 * - Round 1: Group Stage Matchday 1
 * - Round 2: Group Stage Matchday 2
 * - Round 3: Group Stage Matchday 3
 * - Round 4: Round of 32
 * - Round 5: Round of 16
 * - Round 6: Quarterfinals
 * - Round 7: Semifinals
 * - Round 8: Third Place & Final
 */
export function calculatePoints(
  input: PointsCalculationInput,
): PointsBreakdown {
  const {
    guessFirstTeamScore,
    guessSecondTeamScore,
    actualFirstTeamScore,
    actualSecondTeamScore,
    isJoker,
    gamePhase,
  } = input;

  // 1. Calculate result points (3 for correct winner/draw, 0 for wrong)
  const guessResult = getResult(guessFirstTeamScore, guessSecondTeamScore);
  const actualResult = getResult(actualFirstTeamScore, actualSecondTeamScore);
  const resultPoints = guessResult === actualResult ? 3 : 0;

  // 2. Calculate score points
  let scorePoints = 0;

  // Check if exact score
  if (
    guessFirstTeamScore === actualFirstTeamScore &&
    guessSecondTeamScore === actualSecondTeamScore
  ) {
    scorePoints = 2; // Exact score
  } else {
    // Check if goal difference is correct
    const guessGoalDiff = getGoalDifference(
      guessFirstTeamScore,
      guessSecondTeamScore,
    );
    const actualGoalDiff = getGoalDifference(
      actualFirstTeamScore,
      actualSecondTeamScore,
    );

    if (guessGoalDiff === actualGoalDiff) {
      scorePoints = 1; // Correct goal difference only
    }
  }

  // 3. Base points (max 5)
  const basePoints = Math.min(resultPoints + scorePoints, 5);

  // 4. Apply phase multiplier
  const phaseMultiplier = getPhaseMultiplier(gamePhase);
  const pointsAfterPhase = basePoints * phaseMultiplier;

  // 5. Apply joker multiplier
  const jokerMultiplier = isJoker ? 2.0 : 1.0;
  const finalPoints = pointsAfterPhase * jokerMultiplier;

  return {
    resultPoints,
    scorePoints,
    basePoints,
    phaseMultiplier,
    pointsAfterPhase,
    jokerMultiplier,
    finalPoints,
  };
}

/**
 * Simple function that returns just the final points
 */
export function getPointsForGuess(input: PointsCalculationInput): number {
  return calculatePoints(input).finalPoints;
}

/**
 * Validates that a user can use a joker for a specific game in a round
 * This should be called before creating/updating a guess
 *
 * Each round is independent for joker usage:
 * - Group Stage Matchday 1 (round 1): 1 joker allowed
 * - Group Stage Matchday 2 (round 2): 1 joker allowed
 * - Group Stage Matchday 3 (round 3): 1 joker allowed
 * - Round of 32 (round 4): 1 joker allowed
 * - etc.
 *
 * @param existingJokersInRound number of jokers already used in this round
 * @param isJoker whether trying to use a joker
 * @returns boolean indicating if joker can be used
 */
export function canUseJoker(
  existingJokersInRound: number,
  isJoker: boolean,
): boolean {
  if (!isJoker) return true; // Not using joker, so it's always valid

  // Can only use 1 joker per round
  return existingJokersInRound === 0;
}
