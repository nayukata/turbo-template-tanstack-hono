import * as v from "valibot";
import { describe, expect, it } from "vitest";
import { loginSchema, signUpSchema } from "./auth";

describe("loginSchema", () => {
	it("should validate correct login input", () => {
		const input = {
			email: "test@example.com",
			password: "password123",
		};
		const result = v.safeParse(loginSchema, input);
		expect(result.success).toBe(true);
	});

	it("should reject invalid email", () => {
		const input = {
			email: "invalid-email",
			password: "password123",
		};
		const result = v.safeParse(loginSchema, input);
		expect(result.success).toBe(false);
	});

	it("should reject short password", () => {
		const input = {
			email: "test@example.com",
			password: "short",
		};
		const result = v.safeParse(loginSchema, input);
		expect(result.success).toBe(false);
	});
});

describe("signUpSchema", () => {
	it("should validate correct signup input", () => {
		const input = {
			email: "test@example.com",
			password: "password123",
			name: "Test User",
		};
		const result = v.safeParse(signUpSchema, input);
		expect(result.success).toBe(true);
	});

	it("should allow optional name", () => {
		const input = {
			email: "test@example.com",
			password: "password123",
		};
		const result = v.safeParse(signUpSchema, input);
		expect(result.success).toBe(true);
	});
});
