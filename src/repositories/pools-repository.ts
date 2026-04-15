import type { Pool, CreatePoolData } from "@/drizzle/schema/pools";

export interface PoolsRepository {
  create(data: CreatePoolData): Promise<Pool>;
  findById(id: string): Promise<Pool | null>;
  findByCode(code: string): Promise<Pool | null>;
  findManyByUserId(userId: string): Promise<Pool[]>;
}
