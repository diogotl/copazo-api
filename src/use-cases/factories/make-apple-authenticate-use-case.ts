import { DrizzleUsersRepository } from "@/repositories/drizzle/drizzle-users-repository";
import { AppleAuthenticateUseCase } from "../apple-authenticate";

export function makeAppleAuthenticateUseCase() {
  const usersRepository = new DrizzleUsersRepository();
  return new AppleAuthenticateUseCase(usersRepository);
}
