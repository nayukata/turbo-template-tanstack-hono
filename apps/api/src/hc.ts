import { hc } from "hono/client";
import { app } from "./app";

// コンパイル時に型を計算するためのダミークライアント
const client = hc<typeof app>("");
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
	hc<typeof app>(...args);
