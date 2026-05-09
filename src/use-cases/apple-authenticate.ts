import type { UsersRepository, User } from "@/repositories/users-repository";

interface AppleAuthenticateUseCaseRequest {
  appleId: string;
  email?: string;
  name?: string;
}

interface AppleAuthenticateUseCaseResponse {
  user: User;
}

export class AppleAuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    appleId,
    email,
    name,
  }: AppleAuthenticateUseCaseRequest): Promise<AppleAuthenticateUseCaseResponse> {
    // 1. User already linked to this Apple ID → just sign in
    const existingByAppleId = await this.usersRepository.findByAppleId(appleId);

    if (existingByAppleId) {
      return { user: existingByAppleId };
    }

    // 2. User exists with the same email but never signed in with Apple
    //    → link the Apple ID to the existing account
    if (email) {
      const existingByEmail = await this.usersRepository.findByEmail(email);

      if (existingByEmail) {
        await this.usersRepository.linkAppleId(existingByEmail.id, appleId);

        return { user: { ...existingByEmail, appleId } };
      }
    }

    // 3. Brand new user — create account.
    //    Apple only provides name on the very first sign-in, so we fall back
    //    to the email prefix when it's unavailable on subsequent attempts.
    const fallbackName = email ? email.split("@")[0] : "User";

    const user = await this.usersRepository.create({
      appleId,
      email: email ?? null,
      name: name ?? fallbackName,
      passwordHash: null,
      avatarUrl: null,
    });

    return { user };
  }
}
