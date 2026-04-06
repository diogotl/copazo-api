import { DrizzlePoolsRepository } from "@/repositories/drizzle/drizzle-pools-repository";
import { CreatePoolUseCase } from "../create-pool";

export function makeCreatePoolUseCase() {
  const poolsRepository = new DrizzlePoolsRepository();
  return new CreatePoolUseCase(poolsRepository);
}
