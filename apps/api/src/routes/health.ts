import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/valibot";
import * as v from "valibot";

const healthResponseSchema = v.object({
	status: v.literal("ok"),
	timestamp: v.string(),
});

export const healthRoute = new Hono().get(
	"/",
	describeRoute({
		tags: ["Health"],
		summary: "Health check endpoint",
		responses: {
			200: {
				description: "API is healthy",
				content: {
					"application/json": {
						schema: resolver(healthResponseSchema),
					},
				},
			},
		},
	}),
	(c) => {
		return c.json({
			status: "ok" as const,
			timestamp: new Date().toISOString(),
		});
	},
);
