# Agent 规范

本文件是项目级 AI Agent 行为规范，适用于所有 AI 编码工具（Claude Code、Cursor、GitHub Copilot、Windsurf 等）。各工具应在生成、修改代码时遵循以下约定。

## 项目概览

- **框架**：Next.js 16（App Router） + TypeScript strict
- **UI**：React 19 + Ant Design 6 + Tailwind CSS 4
- **国际化**：next-intl，页面位于 `src/app/[locale]`
- **状态管理**：Zustand（全局）、SWR（客户端数据）、Axios（HTTP）、Zod（校验）
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

## 编码规范

### TypeScript

- 严格模式，避免 `any`，优先 `unknown` 或具体类型
- 优先 `type` 声明；仅在需要声明合并时用 `interface`；禁止 `enum`
- 导入路径：`@/*` 优先；同一路径选较短者；按需导入
- 导入顺序：React → Next.js → 第三方库 → 内部模块 → 相对路径

### React 组件

- 组件使用 `const XX: FC<XXProps> = props => { ... }` 形式
- Props 用 `type` 定义，命名为组件名 + `Props`
- `Style` 是全局类型（提供 className/style），`PropsWithChildren` 处理 children
- 组件体内解构 props，children 在前，className/style 在后
- 简单事件内联；复杂事件用 `useMemoizedFn`（ahooks）包裹，按语义命名

### 数据请求

- **获取型**：`useSWR` + suspense 模式，配合 `withSuspense`/`withErrorBoundary`
- **提交型**：`useRequest`（ahooks），提交中 loading 状态，弹窗不可关闭

### 样式

- 优先 Tailwind 工具类；`cn()`（clsx + tailwind-merge）合并 className
- 含空格的 CSS 值（box-shadow 等）用 CSS Modules 或内联 style
- 复杂视觉效果优先 CSS Modules，不强行 Tailwind
- 不使用 Sass/Less

## Next.js 规范

### 运行时边界

- **Server Components**：默认形态，可 async，直接调用 Server Actions 获取数据
- **Client Components**：`'use client'` 开头，禁止引入 server-only 模块
- **Server Actions**：`'use server'` 声明，放在 `@/actions` 下按模块管理

### 约定式路由

- `page.tsx`：默认导出组件，`params`/`searchParams` 均为 Promise 需 await
- `layout.tsx`：使用 `LayoutProps`，含平行路由插槽
- `route.ts`：使用 `NextRequest`/`NextResponse`，`RouteContext` 类型化 context
- `generateMetadata`：动态元数据生成，参数类型与所在文件对应

### Server Actions vs Route Handlers

- 优先 Server Actions 替代网络请求
- Route Handlers 仅用于：HTTP 代理、文件上传下载、Webhook、自定义状态码等
- 输入数据统一用 Zod 验证

## 国际化

- 语言包：`messages/{locale}.json`
- 服务端：`getLocale()`/`getTranslations()`；客户端：`useTranslations()`/`useLocale()`
- 导航必须用 `@/i18n/navigation` 的 `Link`/`useRouter`/`redirect`，禁止直接 import `next/link`
- `NextIntlClientProvider` 传递最小必要的 messages，不传全量语言包
- 优先在服务端使用翻译能力

## 全局类型

- `Style`：className + style props（全局，不需导入）
- `ActionType<ActionMap>`：键值映射转可辨识联合类型
- `ValueController`：`import type { ValueController } from 'value-controller'`，建模受控/非受控场景

## 工具函数

- `@/utils`：`cn`、`sleep`、`withSuspense`、`withErrorBoundary`、`loadFile`、`isReactNode`
- `@/utils/server`：服务端专用（如 `isMobile`），禁止在客户端引用
- `@/hooks`：`useImmediateEffect`、`useSemiControlledValue`、`useComposition`

## 代码质量

- 生成/修改代码后用 `npx prettier` 格式化并 `npx eslint` 检查
- 忽略未使用变量的 ESLint 警告，不删除也不加 `_` 前缀
- 复杂逻辑添加注释，公共 API/Props 提供 JSDoc
