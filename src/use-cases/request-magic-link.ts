import { nanoid } from "nanoid";
import type { MagicLinkTokensRepository } from "@/repositories/magic-link-tokens-repository";
import { sendMagicLinkEmail } from "@/libs/mailer";

const MAGIC_LINK_TTL_SECONDS = 60 * 15; // 15 minutes

interface RequestMagicLinkUseCaseRequest {
  email: string;
}

export class RequestMagicLinkUseCase {
  constructor(private tokensRepository: MagicLinkTokensRepository) {}

  async execute({ email }: RequestMagicLinkUseCaseRequest): Promise<void> {
    const token = nanoid(32);

    await this.tokensRepository.save(token, email, MAGIC_LINK_TTL_SECONDS);

    await sendMagicLinkEmail(email, token);
  }
}
