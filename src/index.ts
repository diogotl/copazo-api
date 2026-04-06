import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env";
import { routes } from "./controllers/routes";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(routes);

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
