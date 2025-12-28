import { describeRoute } from "hono-openapi";

export const apiReference = {
	info: {
		title: "API",
		version: "1.0.0",
		description: "TanStack Start + Hono + Turso Template API",
	},
	servers: [
		{
			url: "http://localhost:4000",
			description: "Development server",
		},
	],
};

export { describeRoute };
