import { nanoid } from "nanoid";
import { PoolsRepository } from "../repositories/pools-repository";

interface CreatePoolUseCaseRequest {
  title: string;
  ownerId: string;
}

interface CreatePoolUseCaseResponse {
  pool: Pool;
}

export class CreatePoolUseCase {
  constructor(private poolsRepository: PoolsRepository) {}

  async execute({
    title,
    ownerId,
  }: CreatePoolUseCaseRequest): Promise<CreatePoolUseCaseResponse> {
    function generateCode(): string {
      return nanoid(6).toUpperCase();
    }

    const code = generateCode();
    const pool = await this.poolsRepository.create({ title, code, ownerId });
    return { pool };
  }
}
