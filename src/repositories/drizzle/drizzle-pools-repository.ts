import { eq } from "drizzle-orm";
import type { PoolsRepository } from "../pools-repository";
import { db } from "@/drizzle/client";
import { participants, pools } from "@/drizzle/schema/pools";
import type { CreatePoolData, Pool } from "@/drizzle/schema/pools";

export class DrizzlePoolsRepository implements PoolsRepository {
  async create(data: CreatePoolData): Promise<Pool> {
    const [pool] = await db.insert(pools).values(data).returning();
    return pool;
  }

  async findById(id: string): Promise<Pool | null> {
    const pool = await db.query.pools.findFirst({
      where: eq(pools.id, id),
    });
    return pool ?? null;
  }

  async findByCode(code: string): Promise<Pool | null> {
    const pool = await db.query.pools.findFirst({
      where: eq(pools.code, code),
    });
    return pool ?? null;
  }

  async findManyByUserId(userId: string): Promise<Pool[]> {
    const result = await db
      .select({ pool: pools })
      .from(participants)
      .innerJoin(pools, eq(participants.poolId, pools.id))
      .where(eq(participants.userId, userId));

    return result.map((r) => r.pool);
  }
}
