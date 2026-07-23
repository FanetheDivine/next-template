# next-template

## 项目概览

- **框架**：Next.js 16（App Router） + TypeScript strict
- **UI**：React 19 + Ant Design 6 + Tailwind CSS 4
- **国际化**：next-intl，页面位于 `src/app/[locale]`
- **状态管理**：Zustand（全局）、SWR（客户端数据获取）、Axios（HTTP）、Zod（校验）
- **工具链**：pnpm、ESLint 9、Prettier（sort-imports + tailwind 插件）
- **路径别名**：`@/* → src/*`

## 目录结构

```
src/
├─ actions/      # Server Actions（按模块分文件夹，不聚合导出）
├─ api/          # Route Handlers
├─ app/          # App Router（含 [locale]）
├─ components/   # 通用组件
├─ hooks/        # 自定义 hooks
├─ i18n/         # next-intl 配置与导航封装
├─ lib/          # 第三方封装（主题、Provider 等）
├─ styles/       # 样式与常量
├─ types/        # 全局类型声明
└─ utils/        # 工具函数
```

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 开发调试（`next dev`） |
| `pnpm build` | 正常构建 |
| `pnpm build:export` | `EXPORT=true` 静态导出 |
| `pnpm analyze` | `ANALYZE=true` 开启 bundle 分析 |
| `pnpm lint` | ESLint 检查 `src/` |
| `pnpm prettier` | `prettier --write src/` |

## 详细规范

- 编码规范（TypeScript / React / 样式）：[docs/coding.md](docs/coding.md)
- Next.js 约定（运行时边界、约定式路由、Server Actions）：[docs/nextjs.md](docs/nextjs.md)
- 国际化（next-intl、静态导出）：[docs/i18n.md](docs/i18n.md)
- 项目结构参考（全局类型、工具函数、hooks）：[docs/project.md](docs/project.md)

## 代码质量

- 生成/修改代码后使用 `npx prettier` 格式化并 `npx eslint` 检查
- 忽略未使用变量的 ESLint 警告，不删除也不加 `_` 前缀
- 复杂逻辑添加注释，公共 API/Props 提供 JSDoc
