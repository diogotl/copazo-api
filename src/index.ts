import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.get("/", async (request, reply) => {
  console.log(request.body);
});

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
