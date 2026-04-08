import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { participants } from "@/drizzle/schema/pools";

export type Participant = InferSelectModel<typeof participants>;
export type CreateParticipantData = Pick<
  InferInsertModel<typeof participants>,
  "userId" | "poolId"
>;

export interface ParticipantsRepository {
  create(data: CreateParticipantData): Promise<Participant>;
  findByUserAndPool(
    userId: string,
    poolId: string,
  ): Promise<Participant | null>;
}
