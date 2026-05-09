import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: object;
    user: {
      sub: string;
      type: "access" | "refresh";
    };
  }
}
