import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { guesses } from "@/drizzle/schema/guesses";

export type Guess = InferSelectModel<typeof guesses>;
export type CreateGuessData = Omit<
  InferInsertModel<typeof guesses>,
  "id" | "createdAt" | "points"
>;
export type UpdateGuessData = Pick<Guess, "firstTeamScore" | "secondTeamScore">;

export interface GuessesRepository {
  create(data: CreateGuessData): Promise<Guess>;
  update(guessId: string, data: UpdateGuessData): Promise<Guess>;
  findByParticipantAndGame(
    participantId: string,
    gameId: string,
  ): Promise<Guess | null>;
}
