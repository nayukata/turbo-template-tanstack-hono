import * as v from "valibot";

export const serverEnvSchema = v.object({
	TURSO_DATABASE_URL: v.pipe(v.string(), v.url()),
	TURSO_AUTH_TOKEN: v.string(),
	BETTER_AUTH_SECRET: v.pipe(v.string(), v.minLength(32)),
	BETTER_AUTH_URL: v.pipe(v.string(), v.url()),
	API_PORT: v.optional(v.pipe(v.string(), v.transform(Number))),
});

export const clientEnvSchema = v.object({
	VITE_API_URL: v.optional(v.pipe(v.string(), v.url())),
});

export function validateServerEnv(env: NodeJS.ProcessEnv) {
	return v.parse(serverEnvSchema, env);
}

export function validateClientEnv(env: Record<string, string | undefined>) {
	return v.parse(clientEnvSchema, env);
}

export type ServerEnv = v.InferOutput<typeof serverEnvSchema>;
export type ClientEnv = v.InferOutput<typeof clientEnvSchema>;
