import { eq, users } from "@repo/db";
import { updateUserSchema, userSchema } from "@repo/validators";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/valibot";
import * as v from "valibot";
import type { Env } from "../env";
import type { DbVariables } from "../middleware/db";

const userResponseSchema = v.object({
	success: v.literal(true),
	data: userSchema,
});

const usersListResponseSchema = v.object({
	success: v.literal(true),
	data: v.array(userSchema),
});

const errorResponseSchema = v.object({
	success: v.literal(false),
	error: v.object({
		message: v.string(),
	}),
});

const userIdParamSchema = v.object({
	id: v.string(),
});

export const usersRoute = new Hono<{
	Bindings: Env;
	Variables: DbVariables;
}>()
	.get(
		"/",
		describeRoute({
			tags: ["Users"],
			summary: "List all users",
			responses: {
				200: {
					description: "List of users",
					content: {
						"application/json": {
							schema: resolver(usersListResponseSchema),
						},
					},
				},
			},
		}),
		async (c) => {
			const db = c.get("db");
			const allUsers = await db.select().from(users);
			return c.json({
				success: true as const,
				data: allUsers,
			});
		},
	)
	.get(
		"/:id",
		describeRoute({
			tags: ["Users"],
			summary: "Get user by ID",
			responses: {
				200: {
					description: "User found",
					content: {
						"application/json": {
							schema: resolver(userResponseSchema),
						},
					},
				},
				404: {
					description: "User not found",
					content: {
						"application/json": {
							schema: resolver(errorResponseSchema),
						},
					},
				},
			},
		}),
		validator("param", userIdParamSchema),
		async (c) => {
			const db = c.get("db");
			const { id } = c.req.valid("param");
			const user = await db.select().from(users).where(eq(users.id, id)).get();

			if (!user) {
				return c.json(
					{
						success: false as const,
						error: { message: "User not found" },
					},
					404,
				);
			}

			return c.json({
				success: true as const,
				data: user,
			});
		},
	)
	.patch(
		"/:id",
		describeRoute({
			tags: ["Users"],
			summary: "Update user",
			responses: {
				200: {
					description: "User updated",
					content: {
						"application/json": {
							schema: resolver(userResponseSchema),
						},
					},
				},
				404: {
					description: "User not found",
					content: {
						"application/json": {
							schema: resolver(errorResponseSchema),
						},
					},
				},
			},
		}),
		validator("param", userIdParamSchema),
		validator("json", updateUserSchema),
		async (c) => {
			const db = c.get("db");
			const { id } = c.req.valid("param");
			const body = c.req.valid("json");

			const existing = await db
				.select()
				.from(users)
				.where(eq(users.id, id))
				.get();

			if (!existing) {
				return c.json(
					{
						success: false as const,
						error: { message: "User not found" },
					},
					404,
				);
			}

			const updated = await db
				.update(users)
				.set({ ...body, updatedAt: new Date() })
				.where(eq(users.id, id))
				.returning()
				.get();

			return c.json({
				success: true as const,
				data: updated,
			});
		},
	);
