import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { openAPISpecs } from "hono-openapi";
import type { Env } from "./env";
import { apiReference } from "./lib/openapi";
import { type DbVariables, dbMiddleware } from "./middleware/db";
import { errorHandler } from "./middleware/error-handler";
import { healthRoute } from "./routes/health";
import { usersRoute } from "./routes/users";

const routes = new Hono<{ Bindings: Env; Variables: DbVariables }>()
	.route("/health", healthRoute)
	.route("/users", usersRoute);

const app = new Hono<{ Bindings: Env; Variables: DbVariables }>()
	.basePath("/api/v1")
	.use(logger())
	.use(
		cors({
			origin: ["http://localhost:5173"],
			credentials: true,
		}),
	)
	.use(dbMiddleware)
	.onError(errorHandler)
	.route("/", routes)
	.get(
		"/openapi",
		openAPISpecs(routes, {
			documentation: {
				...apiReference,
				servers: [{ url: "http://localhost:4000/api/v1" }],
			},
		}),
	);

export { app };
export type AppType = typeof routes;
