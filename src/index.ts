import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env";
import { routes } from "./controllers/routes";

const app = fastify({
  logger: true,
});

// Add JSON content type parser
app.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  function (req, body, done) {
    try {
      const json = JSON.parse(body as string);
      done(null, json);
    } catch (err) {
      err.statusCode = 400;
      done(err, undefined);
    }
  },
);

app.register(fastifyCors, {
  origin: "*",
});

// Global error handler
app.setErrorHandler((error, _request, reply) => {
  console.error("API Error:", error);

  return reply.status(500).send({
    statusCode: 500,
    error: "Internal Server Error",
    message: "Something went wrong",
  });
});

app.register(routes);

app.listen({ port: env.PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
