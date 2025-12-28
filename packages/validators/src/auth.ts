import * as v from "valibot";

export const loginSchema = v.object({
	email: v.pipe(v.string(), v.email("Invalid email address")),
	password: v.pipe(
		v.string(),
		v.minLength(8, "Password must be at least 8 characters"),
	),
});

export const signUpSchema = v.object({
	email: v.pipe(v.string(), v.email("Invalid email address")),
	password: v.pipe(
		v.string(),
		v.minLength(8, "Password must be at least 8 characters"),
		v.maxLength(128, "Password must be at most 128 characters"),
	),
	name: v.optional(v.pipe(v.string(), v.minLength(1), v.maxLength(100))),
});

export type LoginInput = v.InferInput<typeof loginSchema>;
export type SignUpInput = v.InferInput<typeof signUpSchema>;
