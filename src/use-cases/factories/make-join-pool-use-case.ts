import { DrizzlePoolsRepository } from "@/repositories/drizzle/drizzle-pools-repository";
import { DrizzleParticipantsRepository } from "@/repositories/drizzle/drizzle-participants-repository";
import { JoinPoolUseCase } from "../join-pool";

export function makeJoinPoolUseCase() {
  const poolsRepository = new DrizzlePoolsRepository();
  const participantsRepository = new DrizzleParticipantsRepository();

  return new JoinPoolUseCase(poolsRepository, participantsRepository);
}
