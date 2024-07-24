import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Route Handler 示例
 * 演示如何使用 RouteContext 类型化动态路由参数
 *
 * 访问示例：
 * - GET /api/123 -> { id: "123" }
 */
export async function GET(req: NextRequest, ctx: RouteContext<'/api/[id]'>) {
  // RouteContext 中的 params 是 Promise，需要使用 await 访问
  const { id } = await ctx.params

  // 可以从 NextRequest 中获取查询参数、headers 等
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('query')

  return NextResponse.json({
    id,
    query,
    message: 'Hello from route handler',
    timestamp: new Date().toISOString(),
  })
}

/**
 * POST 方法示例
 * 展示如何处理请求体和动态路由参数
 */
export async function POST(req: NextRequest, ctx: RouteContext<'/api/[id]'>) {
  const { id } = await ctx.params
  const body = await req.json()

  return NextResponse.json({
    id,
    receivedBody: body,
    message: 'POST request processed',
  })
}
