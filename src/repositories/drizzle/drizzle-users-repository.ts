// src/repositories/drizzle/drizzle-users-repository.ts
import { db } from "@/drizzle/client";
import { users } from "@/drizzle/schema/users";
import { eq } from "drizzle-orm";
import type { UsersRepository } from "../users-repository";
import type { CreateUserData } from "../users-repository";

export class DrizzleUsersRepository implements UsersRepository {
  async findByAppleId(appleId: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.appleId, appleId),
    });
    return user ?? null;
  }

  async findByEmail(email: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user ?? null;
  }

  async create(data: CreateUserData) {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  async linkAppleId(userId: string, appleId: string) {
    await db.update(users).set({ appleId }).where(eq(users.id, userId));
  }
}
