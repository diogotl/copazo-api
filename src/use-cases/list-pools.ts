import type { PoolsRepository } from "@/repositories/pools-repository";
import type { Pool } from "@/drizzle/schema/pools";

interface ListPoolsUseCaseRequest {
  userId: string;
}

interface ListPoolsUseCaseResponse {
  pools: Pool[];
}

export class ListPoolsUseCase {
  constructor(private poolsRepository: PoolsRepository) {}

  async execute({
    userId,
  }: ListPoolsUseCaseRequest): Promise<ListPoolsUseCaseResponse> {
    const pools = await this.poolsRepository.findManyByUserId(userId);

    return { pools };
  }
}
