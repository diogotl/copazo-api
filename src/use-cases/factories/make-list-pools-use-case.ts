import { DrizzlePoolsRepository } from "@/repositories/drizzle/drizzle-pools-repository";
import { ListPoolsUseCase } from "../list-pools";

export function makeListPoolsUseCase() {
  const poolsRepository = new DrizzlePoolsRepository();

  return new ListPoolsUseCase(poolsRepository);
}
