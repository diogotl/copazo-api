import { makeCreatePoolUseCase } from "@/use-cases/factories/make-create-pool-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPool(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Check if body exists
    if (!request.body) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "Request body is required",
      });
    }

    const bodySchema = z.object({
      title: z.string().min(1, "Title must not be empty").trim(),
    });

    const parseResult = bodySchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "Validation failed",
        details: parseResult.error.issues,
      });
    }

    const { title } = parseResult.data;

    // TODO: substituir pelo userId do JWT autenticado - request.user.sub
    const userId = "placeholder-user-id";

    const createPoolUseCase = makeCreatePoolUseCase();
    const { pool } = await createPoolUseCase.execute({
      title,
      ownerId: userId,
    });

    request.log.info(
      { poolId: pool.id, title: pool.title },
      "Pool created successfully",
    );

    return reply.status(201).send({
      pool: {
        id: pool.id,
        title: pool.title,
        code: pool.code,
        createdAt: pool.createdAt,
      },
    });
  } catch (error) {
    request.log.error({ error }, "Failed to create pool");

    return reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Failed to create pool",
    });
  }
}
