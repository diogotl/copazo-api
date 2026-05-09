import { RedisMagicLinkTokensRepository } from "@/repositories/redis/redis-magic-link-tokens-repository";
import { RequestMagicLinkUseCase } from "../request-magic-link";

export function makeRequestMagicLinkUseCase() {
  const tokensRepository = new RedisMagicLinkTokensRepository();
  return new RequestMagicLinkUseCase(tokensRepository);
}
