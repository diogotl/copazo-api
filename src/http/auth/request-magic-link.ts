import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRequestMagicLinkUseCase } from "@/use-cases/factories/make-request-magic-link-use-case";

const requestMagicLinkBodySchema = z.object({
  email: z.string().email(),
});

export async function requestMagicLink(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parseResult = requestMagicLinkBodySchema.safeParse(request.body);

  if (!parseResult.success) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: parseResult.error.flatten().fieldErrors,
    });
  }

  const { email } = parseResult.data;

  const useCase = makeRequestMagicLinkUseCase();

  await useCase.execute({ email });

  // Always return 200 regardless of whether the email exists
  // to avoid leaking which emails are registered.
  return reply.status(200).send({
    message: "If that email is valid, a magic link has been sent.",
  });
}
