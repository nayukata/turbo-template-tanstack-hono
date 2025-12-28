# TanStack Start

## 概要

TanStack Start は TanStack Router + Vite ベースのフルスタック React フレームワーク。

## ルーティング

### ファイルベースルーティング

`src/routes/` ディレクトリ構造がルート定義に自動変換される。

```
src/routes/
├── __root.tsx      # ルートレイアウト
├── index.tsx       # /
├── about.tsx       # /about
├── posts/
│   ├── index.tsx   # /posts
│   └── $postId.tsx # /posts/:postId (動的パラメータ)
```

### パスパラメータ

`$` プレフィックスで動的パラメータを定義:

```tsx
// src/routes/posts/$postId.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams();
  return <div>Post ID: {postId}</div>;
}
```

## データフェッチ

### loader 関数 (SSR対応)

ルートに `loader` を定義し、サーバー/クライアント両方で実行可能:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  loader: async () => {
    const response = await fetch("https://api.example.com/posts");
    return response.json();
  },
  component: PostsPage,
});

function PostsPage() {
  const posts = Route.useLoaderData();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### このプロジェクトでのアプローチ

データフェッチは TanStack Query + Hono RPC client を使用:

```tsx
import { useQuery } from "@tanstack/react-query";
import { api } from "~/lib/api";

function PostsPage() {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await api.posts.$get();
      return res.json();
    },
  });
  // ...
}
```

## Server Functions

### createServerFn()

サーバー専用関数を定義。クライアントから呼び出すとネットワーク経由でサーバーにリクエストが送信される:

```tsx
import { createServerFn } from "@tanstack/react-start/server";

const createPost = createServerFn({ method: "POST" })
  .validator((data: { title: string; body: string }) => data)
  .handler(async ({ data }) => {
    // サーバーでのみ実行される
    await db.insert(posts).values(data);
    return { success: true };
  });

// コンポーネントから呼び出し
function CreatePostForm() {
  const handleSubmit = async (formData: FormData) => {
    await createPost({
      data: {
        title: formData.get("title") as string,
        body: formData.get("body") as string,
      },
    });
  };
  // ...
}
```

### createIsomorphicFn()

サーバー/クライアントで異なるロジックを実行:

```tsx
import { createIsomorphicFn } from "@tanstack/react-start";

const getEnv = createIsomorphicFn()
  .server(() => {
    return process.env.API_URL;
  })
  .client(() => {
    return window.__ENV__.API_URL;
  });
```

## キャッシュ/静的生成

### ISR (Incremental Static Regeneration)

`loader` 内で `Cache-Control` ヘッダーを設定:

```tsx
export const Route = createFileRoute("/posts")({
  loader: async ({ context }) => {
    context.response.headers.set(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=300"
    );
    // ...
  },
});
```

### 静的プリレンダリング

`vite.config.ts` で設定:

```ts
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        routes: ["/", "/about"],
        // または全リンクをクロール
        crawlLinks: true,
      },
    }),
  ],
});
```

## プログレッシブエンハンスメント

フォームを JavaScript 無しでも動作させる:

```tsx
import { useServerFn } from "@tanstack/react-start";

function ContactForm() {
  const submit = useServerFn(submitContact);

  return (
    <form action={submit} method="POST">
      <input name="email" type="email" required />
      <button type="submit">送信</button>
    </form>
  );
}
```

## 参考

- https://azukiazusa.dev/blog/try-tanstack-start/
- https://tanstack.com/router/latest/docs/framework/react/start/overview
