import { hcWithType } from "api/hc";

const baseUrl =
	typeof window === "undefined" ? "http://localhost:4000" : "/api/v1";

export const api = hcWithType(baseUrl);
