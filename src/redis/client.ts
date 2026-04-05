import { Redis } from "ioredis";
import { env } from "../env.ts";

export const redisClient = new Redis(env.REDIS_URL);
