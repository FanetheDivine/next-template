# Next.js + antd + tailwindcss 项目模板

- `ahooks` 常见客户端 hook
- `immer` & `use-immer` 处理复杂、嵌套的状态
- `zustand` 简单的全局状态管理工具
- `zod` 类型校验工具
- `daysjs` 日期时间处理工具
- `swr` 管理网络请求
- `next-intl` 国际化相关.详见[i18n.md](i18n.md)

## utils

`@/utils`里提供了常用的函数

- `loadFile` 函数式加载本地文件
- `classnames` 使用`clsx` `tailwind-merge`合并样式
- `sleep` 等待一段时间
- `isReactNode` 判断一个值是不是`ReactNode`
- `withSuspense` 为`ReactNode`或者一个组件包裹`Suspense`
- `withErrorBoundary` 为`ReactNode`或者一个组件包裹`ErrorBoundary`
- `Rxjs` 自定义rxjs运算符和流

## hooks

`@/hooks`提供了常见的hook

- `useImmediateEffect` 在依赖项变化后 同步地执行副作用
- `useSemiControlledValue` 取得一个值的半受控版本 可以自由变更 且在原始值变化时突变
- `useComposition` 处理输入法合成问题

## 其他

- `@/styles`定义了绝对定位的样式 定义了滚动条的样式 将所有标签默认设置为`position:relative` `overflow:hidden`
- `@/types`定义了常见的类型
  - `Style` `className`和`style`的类型
  - `ValueController` `value`&`onChange`
- `@/components`定义了默认的fallback
