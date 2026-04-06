import { eq } from "drizzle-orm";
import type { PoolsRepository } from "../pools-repository";
import { db } from "@/drizzle/client";
import {
  CreatePoolData,
  participants,
  Pool,
  pools,
} from "@/drizzle/schema/pools";

export class DrizzlePoolsRepository implements PoolsRepository {
  async create(data: CreatePoolData): Promise<Pool> {
    const [pool] = await db.insert(pools).values(data).returning();
    return pool;
  }

  async findByCode(code: string): Promise<Pool | null> {
    const pool = await db.query.pools.findFirst({
      where: eq(pools.code, code),
    });
    return pool ?? null;
  }

  async findManyByUserId(userId: string) {
    return db.query.participants.findMany({
      where: eq(participants.userId, userId),
      with: { pool: true },
    });
  }
}
