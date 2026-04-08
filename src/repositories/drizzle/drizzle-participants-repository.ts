import { db } from "@/drizzle/client";
import { participants } from "@/drizzle/schema/pools";
import { and, eq } from "drizzle-orm";
import type {
  ParticipantsRepository,
  CreateParticipantData,
} from "../participants-repository";

export class DrizzleParticipantsRepository implements ParticipantsRepository {
  async create(data: CreateParticipantData) {
    const [participant] = await db
      .insert(participants)
      .values(data)
      .returning();
    return participant;
  }

  async findByUserAndPool(userId: string, poolId: string) {
    const participant = await db.query.participants.findFirst({
      where: and(
        eq(participants.userId, userId),
        eq(participants.poolId, poolId),
      ),
    });

    return participant ?? null;
  }
}
