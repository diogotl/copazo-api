import type { FastifyInstance } from "fastify";
import { requestMagicLink } from "../http/auth/request-magic-link";
import { verifyMagicLink } from "../http/auth/verify-magic-link";
import { refresh } from "../http/auth/refresh";
import { logout } from "../http/auth/logout";
import { appleAuthenticate } from "../http/auth/apple-authenticate";
import { verifyJWT } from "../http/auth/verify-jwt";
import { createPool } from "../http/pools/create-pool";
import { joinPool } from "../http/pools/join-pool";
import { listPools } from "../http/pools/list-pools";
import { createGuess } from "../http/guesses/create-guess";
import { updateGuess } from "../http/guesses/update-guess";
import { listGames } from "../http/list-games";
import { getPoolGames } from "../http/get-pool-games";
import { insertGameResult } from "../http/games/insert-game-result";

export async function routes(app: FastifyInstance) {
  // Auth routes (public) — rate limited to prevent abuse
  app.post(
    "/auth/magic-link",
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "1 minute",
        },
      },
    },
    requestMagicLink,
  );

  app.post(
    "/auth/magic-link/verify",
    {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: "1 minute",
        },
      },
    },
    verifyMagicLink,
  );

  app.post(
    "/auth/apple",
    {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: "1 minute",
        },
      },
    },
    appleAuthenticate,
  );

  app.post(
    "/auth/refresh",
    {
      config: {
        rateLimit: {
          max: 20,
          timeWindow: "1 minute",
        },
      },
    },
    refresh,
  );

  app.post("/auth/logout", { preHandler: [verifyJWT] }, logout);

  // Pool routes (protected)
  app.post("/pools", { preHandler: [verifyJWT] }, createPool);
  app.post("/pools/join", { preHandler: [verifyJWT] }, joinPool);
  app.get("/pools", { preHandler: [verifyJWT] }, listPools);
  app.get("/pools/:poolId/games", { preHandler: [verifyJWT] }, getPoolGames);

  // Guess routes (protected)
  app.post(
    "/pools/:poolId/games/:gameId/guesses",
    { preHandler: [verifyJWT] },
    createGuess,
  );
  app.put(
    "/pools/:poolId/games/:gameId/guesses",
    { preHandler: [verifyJWT] },
    updateGuess,
  );

  // Game routes (protected)
  app.get("/games", { preHandler: [verifyJWT] }, listGames);
  app.post(
    "/games/:gameId/result",
    { preHandler: [verifyJWT] },
    insertGameResult,
  );
}
