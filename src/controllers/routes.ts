import { FastifyInstance } from "fastify";
import { createPool } from "../http/pools/create-pool";

export async function routes(app: FastifyInstance) {
  app.post("/pools", createPool);
}
