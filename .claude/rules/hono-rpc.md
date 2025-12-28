# Hono RPC Client

## 型計算の最適化

コンパイル時に型を計算するパターンを使用する。

```typescript
// apps/api/src/hc.ts
import { hc } from "hono/client";
import { app } from "./app";

const client = hc<typeof app>("");
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof app>(...args);
```

- MUST: `app` オブジェクトを実体としてインポート（`import type` ではない）
- MUST: ダミークライアント `const client = hc<typeof app>("")` で型を事前計算
- MUST: `hcWithType` 関数をエクスポート

## クライアント側

```typescript
import { hcWithType } from "api/hc";

export const api = hcWithType("http://localhost:4000");
```

参考: https://github.com/m-shaka/hono-rpc-perf-tips-example
