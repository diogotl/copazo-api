export interface PoolsRepository {
  create(data: CreatePoolData): Promise<Pool>;
  findByCode(code: string): Promise<Pool | null>;
  findManyByUserId(userId: string): Promise<Pool[]>;
}
