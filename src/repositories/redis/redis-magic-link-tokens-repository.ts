import { redisClient } from "@/redis/client";
import type { MagicLinkTokensRepository } from "../magic-link-tokens-repository";

const KEY_PREFIX = "magic:token:";

export class RedisMagicLinkTokensRepository
  implements MagicLinkTokensRepository
{
  async save(token: string, email: string, ttlSeconds: number): Promise<void> {
    await redisClient.set(`${KEY_PREFIX}${token}`, email, "EX", ttlSeconds);
  }

  async findEmailByToken(token: string): Promise<string | null> {
    return redisClient.get(`${KEY_PREFIX}${token}`);
  }

  async delete(token: string): Promise<void> {
    await redisClient.del(`${KEY_PREFIX}${token}`);
  }
}
