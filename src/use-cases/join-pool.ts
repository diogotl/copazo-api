import type { PoolsRepository } from "@/repositories/pools-repository";
import type { ParticipantsRepository } from "@/repositories/participants-repository";
import { PoolNotFoundError } from "./errors/pool-not-found-error";
import { AlreadyInPoolError } from "./errors/already-in-pool-error";

interface JoinPoolUseCaseRequest {
  userId: string;
  code: string;
}

export class JoinPoolUseCase {
  constructor(
    private poolsRepository: PoolsRepository,
    private participantsRepository: ParticipantsRepository,
  ) {}

  async execute({ userId, code }: JoinPoolUseCaseRequest) {
    const pool = await this.poolsRepository.findByCode(code);
    if (!pool) throw new PoolNotFoundError();

    const existingParticipant = await this.participantsRepository.findByUserAndPool(
      userId,
      pool.id,
    );
    if (existingParticipant) throw new AlreadyInPoolError();

    const participant = await this.participantsRepository.create({
      userId,
      poolId: pool.id,
    });

    return { participant };
  }
}
