import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { openAPISpecs } from "hono-openapi";
import { apiReference } from "./lib/openapi";
import { errorHandler } from "./middleware/error-handler";
import { healthRoute } from "./routes/health";
import { usersRoute } from "./routes/users";

const app = new Hono().basePath("/api/v1");

app.use("*", logger());
app.use(
	"*",
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	}),
);

app.onError(errorHandler);

app.route("/health", healthRoute);
app.route("/users", usersRoute);

app.get(
	"/openapi",
	openAPISpecs(app, {
		documentation: {
			...apiReference,
			servers: [{ url: "http://localhost:4000/api/v1" }],
		},
	}),
);

export { app };
export type AppType = typeof app;
