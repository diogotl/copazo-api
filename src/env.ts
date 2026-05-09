import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url(),
  JWT_SECRET: z.string(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  APP_DEEP_LINK_SCHEME: z.string().default("copazo"),
});

export const env = envSchema.parse(process.env);
