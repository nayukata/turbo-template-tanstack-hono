import * as v from "valibot";

export const userSchema = v.object({
	id: v.string(),
	email: v.pipe(v.string(), v.email()),
	emailVerified: v.optional(v.boolean()),
	name: v.optional(v.string()),
	image: v.optional(v.string()),
	createdAt: v.date(),
	updatedAt: v.date(),
});

export const createUserSchema = v.object({
	email: v.pipe(v.string(), v.email("Invalid email address")),
	name: v.optional(v.pipe(v.string(), v.minLength(1), v.maxLength(100))),
	image: v.optional(v.pipe(v.string(), v.url())),
});

export const updateUserSchema = v.partial(createUserSchema);

export type User = v.InferOutput<typeof userSchema>;
export type CreateUserInput = v.InferInput<typeof createUserSchema>;
export type UpdateUserInput = v.InferInput<typeof updateUserSchema>;
