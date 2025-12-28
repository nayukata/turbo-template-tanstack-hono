import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

function createDb() {
	const url = process.env.TURSO_DATABASE_URL ?? "file:./local.db";

	const client = createClient({
		url,
		authToken: process.env.TURSO_AUTH_TOKEN,
	});

	return drizzle({ client, schema });
}

export const db = createDb();
export type Database = typeof db;

export { and, eq, gt, gte, inArray, lt, lte, ne, not, or } from "drizzle-orm";
export * from "./schema";
