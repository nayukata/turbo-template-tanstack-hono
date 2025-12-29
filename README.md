# TanStack Start + Hono + Turso Template

Turborepo を使用したフルスタック TypeScript モノレポテンプレート。

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| モノレポ | Turborepo, pnpm |
| フロントエンド | TanStack Start, TanStack Router, TanStack Query, React 19 |
| バックエンド | Hono, hono-openapi |
| データベース | Turso (libSQL), Drizzle ORM |
| 認証 | Better Auth |
| スタイリング | Tailwind CSS v4, React Aria Components, tailwind-variants |
| バリデーション | Valibot |
| リンター | Biome |
| テスト | Vitest |
| デプロイ | Cloudflare Workers |

## プロジェクト構成

```
apps/
  api/          # Hono API サーバー
  web/          # TanStack Start フロントエンド

packages/
  auth/         # Better Auth 設定
  db/           # Turso + Drizzle ORM
  ui/           # React Aria Components
  validators/   # Valibot スキーマ
  biome-config/ # Biome 設定
  typescript-config/ # TypeScript 設定
```

## セットアップ

### 必要条件

- Node.js >= 24
- pnpm >= 10.26.2

### 初期設定

```sh
# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

### 環境変数

TanStack Start の規約に従い、環境ごとにファイルを分離:

```
.env              # 共通設定（平文、コミット）
.env.development  # 開発環境（暗号化してコミット）
.env.production   # 本番環境（暗号化してコミット）
.env.local        # ローカルオーバーライド（gitignore）
```

**apps/api**

| 変数 | ファイル | 説明 |
|------|----------|------|
| `API_PORT` | `.env` | API サーバーポート (デフォルト: 4000) |
| `TURSO_DATABASE_URL` | `.env.[env]` | Turso データベース URL |
| `TURSO_AUTH_TOKEN` | `.env.[env]` | Turso 認証トークン |

**apps/web**

| 変数 | ファイル | 説明 |
|------|----------|------|
| `BETTER_AUTH_SECRET` | `.env.[env]` | 認証シークレット (32文字以上) |
| `BETTER_AUTH_URL` | `.env.[env]` | 認証コールバック URL |

### データベース

```sh
# マイグレーションを生成
pnpm db:generate

# マイグレーションを適用
pnpm db:migrate

# スキーマを直接プッシュ (開発用)
pnpm db:push
```

### 開発

```sh
# 全アプリを起動
pnpm dev

# 特定のアプリを起動
pnpm dev --filter=web
pnpm dev --filter=api
```

### ビルド

```sh
# 全てビルド
pnpm build

# 特定のアプリをビルド
pnpm build --filter=web
```

### リント & 型チェック

```sh
# リント
pnpm lint

# 型チェック
pnpm check-types

# フォーマット
pnpm format
```

### テスト

```sh
# テスト実行 (watch モード)
pnpm test

# テスト実行 (1回のみ)
pnpm test:run
```

## API クライアント (Hono RPC)

Hono RPC による型安全な API クライアント:

```typescript
import { hcWithType } from "api/hc";

const api = hcWithType("http://localhost:4000");

// リクエスト/レスポンスが完全に型付け
const res = await api.users.$get();
const users = await res.json();
```

## デプロイ

両アプリを Cloudflare Workers にデプロイ。

```sh
# web をデプロイ
pnpm --filter=web deploy

# api をデプロイ
pnpm --filter=api deploy
```

### 環境変数の暗号化 (dotenvx)

[dotenvx](https://dotenvx.com/) で環境変数を暗号化し、チームで安全に共有。

**暗号化コマンド**:

```sh
# 開発環境を暗号化
pnpm env:encrypt:dev

# 本番環境を暗号化
pnpm env:encrypt:prod
```

**初回セットアップ (リーダー)**:

```sh
# 1. .env.development, .env.production を編集
# 2. 暗号化
pnpm env:encrypt:dev
pnpm env:encrypt:prod

# 3. 暗号化されたファイルをコミット
git add apps/*/.env.development apps/*/.env.production
git commit -m "Add encrypted env files"

# 4. .env.keys をチームに共有 (1Password, Slack DM など)
```

**チームメンバー**:

```sh
# 1. リーダーから .env.keys を受け取る
# 2. 各 apps/*/ に配置
# 3. 必要に応じて復号
pnpm env:decrypt:dev
pnpm env:decrypt:prod
```

**CI/CD (GitHub Actions)**:

`.env.keys` から秘密鍵を取得し、GitHub Secrets に設定:

| Secret | 値 |
|--------|-----|
| `DOTENV_PRIVATE_KEY_DEVELOPMENT` | `.env.keys` の `DOTENV_PRIVATE_KEY_DEVELOPMENT` |
| `DOTENV_PRIVATE_KEY_PRODUCTION` | `.env.keys` の `DOTENV_PRIVATE_KEY_PRODUCTION` |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API トークン |

## アーキテクチャ

### 環境変数

`dotenvx run` で環境変数を注入し、Hono の `env()` ヘルパーでアクセス:

```typescript
// Hono のランタイム非依存ヘルパーでアクセス
import { env } from "hono/adapter";

app.get("/", (c) => {
  const { TURSO_DATABASE_URL } = env<Env>(c);
});
```

実行時は `dotenvx run` が自動で環境変数を注入:

```sh
# package.json
"dev": "dotenvx run -f .env -f .env.development -- tsx watch src/index.ts"
```

### データベース初期化

Cloudflare Workers 対応のため、リクエストごとにミドルウェアで DB を初期化:

```typescript
// packages/db
export function createDb(env: DbEnv) {
  return drizzle({ client: createClient({ url: env.TURSO_DATABASE_URL, ... }) });
}

// apps/api/src/middleware/db.ts
export const dbMiddleware = createMiddleware(async (c, next) => {
  const db = createDb(env(c));
  c.set("db", db);
  await next();
});
```

## ライセンス

MIT
