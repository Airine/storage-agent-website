# storage-agent-website

Storage Agent 的官方网站（Fumadocs + Next.js 16）。

## 本地开发

```sh
pnpm install
pnpm dev
```

## 构建

```sh
pnpm build
pnpm start
```

## 部署

- **Vercel**：导入本仓库即可，框架自动识别 Next.js。
- **GitHub Pages**：`pnpm build`（next.config 需加 `output: 'export'`）后部署 `out/`。
