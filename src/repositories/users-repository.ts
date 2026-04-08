import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { users } from "@/drizzle/schema/users";

export type User = InferSelectModel<typeof users>;
export type CreateUserData = Pick<
  InferInsertModel<typeof users>,
  "name" | "email" | "appleId" | "passwordHash" | "avatarUrl"
>;

export interface UsersRepository {
  findByAppleId(appleId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
  linkAppleId(userId: string, appleId: string): Promise<void>;
}
