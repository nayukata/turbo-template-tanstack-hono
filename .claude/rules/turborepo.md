# Turborepo Internal Packages

## パッケージ戦略

| 場所 | 戦略 | 説明 |
|------|------|------|
| `apps/*` | Compiled Package | `hc.ts` のみビルドし型定義をエクスポート |
| `packages/*` | JIT Package | TypeScript ソース (`src/`) を直接エクスポート |

## Compiled Package (apps/api)

サーバーは RPC クライアント用の型定義のみビルドする。

### tsconfig.build.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/hc.ts"]
}
```

### package.json

```json
{
  "exports": {
    "./hc": {
      "import": {
        "types": "./dist/hc.d.ts",
        "default": "./dist/hc.js"
      }
    }
  },
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc -p tsconfig.build.json",
    "start": "tsx src/index.ts"
  }
}
```

- MUST: `tsconfig.build.json` で `hc.ts` のみビルド
- MUST: `declaration: true` と `declarationMap: true` を設定
- MUST: dev/start は `tsx` でランタイム実行

## JIT Package (packages/)

共有パッケージは JIT Package として構成する。

```json
{
  "exports": {
    "./*": "./src/*.tsx"
  }
}
```

- MUST: exports は `./src/` の TypeScript ソースを直接参照
- MUST: `build` スクリプトは不要

参考: https://turborepo.com/docs/core-concepts/internal-packages
