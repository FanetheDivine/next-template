# Next.js 规范

## 运行时边界

- **Server Components**：默认形态，可以被定义为异步函数，可安全调用 `next-intl/server`、`@/utils/server`、数据库，通过 `getLocale`、`getTranslations` 等实现国际化。获取数据时，直接调用 Server Actions 或其他异步函数并取值，不使用 useSWR。不要在其中引用仅客户端可用的库。
- **Client Components**：必须以 `'use client'` 开头，禁止引入 `@/utils/server` 或任何使用 `next/headers`/`server-only` 的模块，以免打包失败。遵循常规 React 组件规范（见 [docs/coding.md](coding.md)）。只能在事件函数和 `useEffect` 中调用浏览器 API。通过 `useLocale`、`useTranslations` 等进行国际化。
- **Server Actions**：在文件顶部声明 `'use server'`，其中定义的所有函数都是 Server Actions。这些函数仅运行在服务端，可以访问数据库，但可以被任何组件导入并自由使用，优先替代与服务端交互的常规网络请求。Server Actions 应放在 `@/actions` 下，按模块分文件夹管理，不聚合导出。

## 约定式路由

Next.js 使用约定式路由，相应的文件应当遵循 Next.js 的导出规则。例如，`page.tsx` 需要默认导出组件，命名导出元数据生成函数、SSG 生成函数等，而 `route.ts` 需要导出 `GET`、`POST` 函数用于接收 HTTP 请求。

### page.tsx

需要默认导出一个组件，优先导出服务端组件。

#### 如果导出服务端组件

可以使用 `PageProps` 定义组件。它包含路径参数 `params` 和查询参数 `searchParams`，均为 Promise，需要使用 `await` 访问。`params` 和 `searchParams` 不应从 `props` 解构得到，而要始终为其单独定义和赋值。`props.searchParams` 应使用 `toURLSearchParams` 进行转换。

```ts
import { toURLSearchParams } from '@/utils'

const Page: FC<PageProps<'/example'>> = async (props) => {
  const params = await props.params
  const searchParams = toURLSearchParams(await props.searchParams)
  const query = searchParams.get('query')
  return null
}

export default Page
```

### layout.tsx

需要默认导出一个组件，优先导出服务端组件。

#### 如果导出服务端组件

可以使用 `LayoutProps` 定义组件。它包含路径参数 `params`，但不包含查询参数。此外，`LayoutProps` 还包含平行路由插槽，`children` 已经在其中，不需要额外添加 `PropsWithChildren`。`params` 不应从 `props` 解构得到，而要始终为其单独定义和赋值，而其他参数应当从 `props` 解构。其他插槽排在 `children` 后面。

```ts
import type { FC } from 'react'

const Layout: FC<LayoutProps<'/[locale]'>> = async (props) => {
  const { children } = props
  const params = await props.params
  const { locale } = params

  return <div lang={locale}>{children}</div>
}

export default Layout
```

### route.ts

用于类型化 `route.ts` 中请求处理函数的 `context` 参数。使用 `RouteContext` 类型化 `context` 参数，它包含路径参数 `params`（动态），不包含查询参数。

如需使用查询参数，应从 `NextRequest` 的 `nextUrl.searchParams` 获取。

生成代码时，`params` 不应从 `ctx` 解构得到，而要始终为其单独定义和赋值。

总是单独定义 `searchParams` 并赋值。

```ts
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, ctx: RouteContext<'/api/example'>) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('query')
  return NextResponse.json({ query })
}
```

### 关于 generateMetadata

在 `layout.tsx` 和 `page.tsx` 导出服务端组件时，也可以导出名为 `generateMetadata` 的函数用于动态生成元数据。

```ts
import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  props: Pick<LayoutProps<'/[locale]'>, 'params'>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params
  // const parentMetadata = await parent
}
```

第二个参数是父级元数据，类型是 `Promise`。`generateMetadata` 生成的元数据不会和父级自动合并，如果有这种需求，取得 `parentMetadata` 后在其基础上更改即可。该参数一般不需要，不自动生成，只在明确提及需要合并时再生成。

当此函数位于 `layout` 时，第一个参数是 `Pick<LayoutProps<xxx>, 'params'>`，应当仿照 `Layout` 组件定义 `params` 并赋值。

当位于 `page` 时，第一个参数是 `PageProps`，同样应当仿照 `Page` 组件定义 `params` 和 `searchParams`。

## Server Actions 和 Route Handlers

- 优先使用 Server Actions 替代常规的网络请求。
- **Server Actions 组织**：Server Actions 放在 `@/actions` 下，内部按照所属的不同模块分多个文件夹（如 `@/actions/user`、`@/actions/product`），每个模块独立管理，不聚合导出。使用时直接从对应模块导入，例如 `import { createUser } from '@/actions/user'`。
- **Route Handlers 使用场景**：仅在以下场景使用 Route Handlers（放在 `@/api` 下）：
  - 需要处理 HTTP 请求/响应（如第三方 API 代理）
  - 文件上传下载
  - Webhook 接收
  - 需要自定义 HTTP 方法、状态码、响应头等
- Route Handlers 必须使用 `next/server` 导出的 `NextRequest` 和 `NextResponse` 类型，禁止使用原生的 `Request` 和 `Response`。
- **数据验证**：Server Actions 和 Route Handlers 中的输入数据应使用 Zod 进行验证。

## Next.js 中的 Context

React Context 仅限在客户端组件（Client Components）中使用，服务端组件（Server Components）一般不使用 Context。如果服务端组件必须使用 Context，需要使用 Server Context（如 `next-intl` 提供的服务端 Context）。
