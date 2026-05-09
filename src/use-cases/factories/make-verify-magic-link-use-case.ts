import { DrizzleUsersRepository } from "@/repositories/drizzle/drizzle-users-repository";
import { RedisMagicLinkTokensRepository } from "@/repositories/redis/redis-magic-link-tokens-repository";
import { VerifyMagicLinkUseCase } from "../verify-magic-link";

export function makeVerifyMagicLinkUseCase() {
  const usersRepository = new DrizzleUsersRepository();
  const tokensRepository = new RedisMagicLinkTokensRepository();
  return new VerifyMagicLinkUseCase(usersRepository, tokensRepository);
}
