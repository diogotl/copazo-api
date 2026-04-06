import { makeCreatePoolUseCase } from "@/use-cases/factories/make-create-pool-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPool(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    title: z.string().min(1),
  });

  const { title } = bodySchema.parse(request.body);

  const createPoolUseCase = makeCreatePoolUseCase();
  const { pool } = await createPoolUseCase.execute({
    title,
    // ownerId: request.user.sub,
  });

  return reply.status(201).send({ pool });
}
