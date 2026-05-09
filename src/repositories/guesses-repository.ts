import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { guesses } from "@/drizzle/schema/guesses";

export type Guess = InferSelectModel<typeof guesses>;
export type CreateGuessData = Omit<
  InferInsertModel<typeof guesses>,
  "id" | "createdAt" | "points"
>;
export type UpdateGuessData = Pick<
  Guess,
  "firstTeamScore" | "secondTeamScore" | "isJoker"
>;

export interface GuessesRepository {
  create(data: CreateGuessData): Promise<Guess>;
  update(guessId: string, data: UpdateGuessData): Promise<Guess>;
  updatePoints(guessId: string, points: number): Promise<Guess>;
  findByParticipantAndGame(
    participantId: string,
    gameId: string,
  ): Promise<Guess | null>;
  findByUserAndPool(userId: string, poolId: string): Promise<Guess[]>;
  findByUserAndGame(
    userId: string,
    gameId: string,
    poolId: string,
  ): Promise<Guess | null>;
  findByGameId(gameId: string): Promise<Guess[]>;
  countJokersInTournamentRound(
    userId: string,
    poolId: string,
    gamePhase: string,
    gameRound: number,
    excludeGameId?: string,
  ): Promise<number>;
}
