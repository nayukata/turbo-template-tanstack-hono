import { createDb, type Database } from "@repo/db";
import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";
import type { Env } from "../env";

export type DbVariables = {
	db: Database;
};

export const dbMiddleware = createMiddleware<{
	Bindings: Env;
	Variables: DbVariables;
}>(async (c, next) => {
	const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = env<Env>(c);
	const db = createDb({
		TURSO_DATABASE_URL,
		TURSO_AUTH_TOKEN,
	});
	c.set("db", db);
	await next();
});
