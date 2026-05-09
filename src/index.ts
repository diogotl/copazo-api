import { ZodError } from "zod";
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyRateLimit from "@fastify/rate-limit";
import { env } from "./env";
import { routes } from "./controllers/routes";

const app = fastify({
  logger: true,
});

// Add JSON content type parser
app.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (_req, body, done) => {
    try {
      const json = JSON.parse(body as string);
      done(null, json);
    } catch (err) {
      const error = err as Error & { statusCode?: number };
      error.statusCode = 400;
      done(error, undefined);
    }
  },
);

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifyCookie);

// Rate limiting — global: false means only routes with an explicit
// config.rateLimit option are limited (i.e. the auth endpoints).
app.register(fastifyRateLimit, {
  global: false,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "15m",
  },
});

// Global error handler
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.flatten().fieldErrors,
    });
  }

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
