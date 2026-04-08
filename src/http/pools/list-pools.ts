import { FastifyReply, FastifyRequest } from "fastify";

export async function listPools(request: FastifyRequest, reply: FastifyReply) {
  // Aqui você pode acessar o usuário autenticado, se necessário
  // e buscar os bolões do usuário no banco de dados.

  // Exemplo de resposta vazia (ajuste conforme sua lógica):
  return reply.status(200).send({
    pools: [],
    message: "List pools not implemented yet",
  });
}
