import { nanoid } from "nanoid";
import type { PoolsRepository } from "@/repositories/pools-repository";
import type { ParticipantsRepository } from "@/repositories/participants-repository";

interface CreatePoolUseCaseRequest {
  title: string;
  ownerId: string;
}

export class CreatePoolUseCase {
  constructor(
    private poolsRepository: PoolsRepository,
    private participantsRepository: ParticipantsRepository,
  ) {}

  async execute({ title, ownerId }: CreatePoolUseCaseRequest) {
    const code = nanoid(6).toUpperCase();

    const pool = await this.poolsRepository.create({ title, code, ownerId });

    await this.participantsRepository.create({
      userId: ownerId,
      poolId: pool.id,
    });

    return { pool };
  }
}
