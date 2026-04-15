import { FastifyInstance } from "fastify";
import { createPool } from "../http/pools/create-pool";
import { joinPool } from "../http/pools/join-pool";
import { listPools } from "../http/pools/list-pools";
import { createGuess } from "../http/guesses/create-guess";
import { updateGuess } from "../http/guesses/update-guess";
import { listGames } from "../http/list-games";
import { getPoolGames } from "../http/get-pool-games";

export async function routes(app: FastifyInstance) {
  // Pool routes
  app.post("/pools", createPool);
  app.post("/pools/join", joinPool);
  app.get("/pools", listPools);
  app.get("/pools/:poolId/games", getPoolGames);

  // Guess routes
  app.post("/pools/:poolId/games/:gameId/guesses", createGuess);
  app.put("/pools/:poolId/games/:gameId/guesses", updateGuess);

  // Game routes
  app.get("/games", listGames);
}
