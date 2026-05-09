import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { results } from "@/drizzle/schema/results";

export type Result = InferSelectModel<typeof results>;
export type CreateResultData = Omit<
  InferInsertModel<typeof results>,
  "id" | "createdAt"
>;
export type UpdateResultData = Pick<Result, "firstTeamScore" | "secondTeamScore" | "insertedBy">;

export interface ResultsRepository {
  create(data: CreateResultData): Promise<Result>;
  upsert(data: CreateResultData): Promise<Result>;
  update(resultId: string, data: UpdateResultData): Promise<Result>;
  findByGameId(gameId: string): Promise<Result | null>;
  findById(id: string): Promise<Result | null>;
  deleteByGameId(gameId: string): Promise<void>;
}
