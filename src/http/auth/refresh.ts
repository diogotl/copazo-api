import type { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  // Accepts token from:
  //   - Authorization: Bearer <token>  (mobile — stored in Keychain/Keystore)
  //   - refreshToken cookie            (web — httpOnly cookie)
  await request.jwtVerify({ onlyCookie: false });

  if (request.user.type !== "refresh") {
    return reply.status(401).send({ message: "Unauthorized." });
  }

  const token = await reply.jwtSign(
    { type: "access" },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "15m",
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    { type: "refresh" },
    {
      sign: {
        sub: request.user.sub,
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
