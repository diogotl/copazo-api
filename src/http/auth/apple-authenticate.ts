import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { verifyAppleToken } from "@/libs/apple-auth";
import { makeAppleAuthenticateUseCase } from "@/use-cases/factories/make-apple-authenticate-use-case";

const appleAuthBodySchema = z.object({
  identityToken: z.string(),
  name: z.string().optional(),
});

export async function appleAuthenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parseResult = appleAuthBodySchema.safeParse(request.body);

  if (!parseResult.success) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: parseResult.error.flatten().fieldErrors,
    });
  }

  const { identityToken, name } = parseResult.data;

  let applePayload: Awaited<ReturnType<typeof verifyAppleToken>>;

  try {
    applePayload = await verifyAppleToken(identityToken);
  } catch {
    return reply.status(401).send({ message: "Invalid Apple identity token." });
  }

  const appleAuthenticateUseCase = makeAppleAuthenticateUseCase();

  const { user } = await appleAuthenticateUseCase.execute({
    appleId: applePayload.appleId,
    email: applePayload.email,
    // Apple only sends the name on the very first sign-in.
    // Prefer what the client sends (from the native Apple auth sheet)
    // over what the token carries.
    name: name ?? applePayload.name,
  });

  const token = await reply.jwtSign(
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
      token,
      // Returned in body so mobile clients can store it
      // in secure storage (Keychain / Keystore).
      refreshToken,
    });
}
