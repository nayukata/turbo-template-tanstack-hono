import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

type DbEnv = {
	TURSO_DATABASE_URL?: string;
	TURSO_AUTH_TOKEN?: string;
};

export function createDb(env: DbEnv) {
	const url = env.TURSO_DATABASE_URL ?? "file:./local.db";

	const client = createClient({
		url,
		authToken: env.TURSO_AUTH_TOKEN,
	});

	return drizzle({ client, schema });
}

export type Database = ReturnType<typeof createDb>;

export { and, eq, gt, gte, inArray, lt, lte, ne, not, or } from "drizzle-orm";
export * from "./schema";
