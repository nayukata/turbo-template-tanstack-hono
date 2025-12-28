import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

type ErrorResponse = {
	success: false;
	error: {
		message: string;
		code?: string;
	};
};

export function errorHandler(err: Error, c: Context) {
	console.error("API Error:", err);

	const response: ErrorResponse = {
		success: false,
		error: {
			message: err.message || "Internal server error",
		},
	};

	const status: ContentfulStatusCode =
		"status" in err &&
		typeof err.status === "number" &&
		err.status >= 200 &&
		err.status < 600
			? (err.status as ContentfulStatusCode)
			: 500;

	return c.json(response, status);
}
