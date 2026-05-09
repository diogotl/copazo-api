import type { UsersRepository, User } from "@/repositories/users-repository";
import type { MagicLinkTokensRepository } from "@/repositories/magic-link-tokens-repository";
import { InvalidMagicLinkError } from "@/use-cases/errors/invalid-magic-link-error";

interface VerifyMagicLinkUseCaseRequest {
  token: string;
}

interface VerifyMagicLinkUseCaseResponse {
  user: User;
}

export class VerifyMagicLinkUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private magicLinkTokensRepository: MagicLinkTokensRepository,
  ) {}

  async execute({
    token,
  }: VerifyMagicLinkUseCaseRequest): Promise<VerifyMagicLinkUseCaseResponse> {
    const email = await this.magicLinkTokensRepository.findEmailByToken(token);

    if (!email) {
      throw new InvalidMagicLinkError();
    }

    // One-time use — delete immediately after reading
    await this.magicLinkTokensRepository.delete(token);

    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser) {
      return { user: existingUser };
    }

    // First sign-in — create account on the fly (no password needed)
    const name = email.split("@")[0];

    const user = await this.usersRepository.create({
      email,
      name,
      passwordHash: null,
      appleId: null,
      avatarUrl: null,
    });

    return { user };
  }
}
