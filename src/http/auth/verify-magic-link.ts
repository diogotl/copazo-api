import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidMagicLinkError } from "@/use-cases/errors/invalid-magic-link-error";
import { makeVerifyMagicLinkUseCase } from "@/use-cases/factories/make-verify-magic-link-use-case";

const verifyMagicLinkBodySchema = z.object({
  token: z.string(),
});

export async function verifyMagicLink(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parseResult = verifyMagicLinkBodySchema.safeParse(request.body);

  if (!parseResult.success) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: parseResult.error.flatten().fieldErrors,
    });
  }

  const { token } = parseResult.data;

  try {
    const verifyMagicLinkUseCase = makeVerifyMagicLinkUseCase();

    const { user } = await verifyMagicLinkUseCase.execute({ token });

    const accessToken = await reply.jwtSign(
      { type: "access" },
      {
        sign: {
          sub: user.id,
          expiresIn: "15m",
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      { type: "refresh" },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      },
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: "none",
        httpOnly: true,
      })
      .status(200)
      .send({
        token: accessToken,
        // Returned in body so mobile clients can store it
        // in secure storage (Keychain / Keystore).
        refreshToken,
      });
  } catch (err) {
    if (err instanceof InvalidMagicLinkError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err instanceof Error ? err : new Error(String(err));
  }
}
