# 编码规范

分为以下三部分，优先级从低到高，后面的规则会覆盖和补充前面的规则：

- 常规规范：框架无关的规范
- React 规范：React 相关的规范
- 样式规范：Tailwind / CSS Modules 相关的规范

## 常规规范

### 代码复用

项目的依赖、全局类型、全局 hooks 等参考 [docs/project.md](project.md)。

尽可能引用已有的代码而不是写新的。

### TypeScript

- `tsconfig.json` 已开启 `strict`、`noEmit`，请保持类型完整。
- 避免 `any`；若必须使用，请注释原因。优先 `unknown` 或具体类型。
- **优先使用 `type`** 来声明结构或工具类型；仅在需要声明合并/模块拓展时使用 `interface`。
- 禁止使用 `enum`，请用联合字面量或对象常量。
- 导出类型使用命名导出；局部类型就近声明。

### 资源导入

- `@/*` 是 `src/*` 的别名，在 `src/` 下的文件应当使用这一别名。
- 同一导入的相对路径和绝对路径，选择较短者。
- 尽可能使用按需导入。
- 生成代码时，导入顺序如下：
  1. React 相关库
  2. Next.js 相关库
  3. 第三方库（`antd`、`lodash` 等）
  4. 内部模块（`@/components` 等）
  5. 相对路径

### 资源定义和导出

- **函数类型声明**：如果函数有明确的类型，使用 `const fn: FN = xxx;` 形式；否则使用 `function` 声明。
- **导出规范**：尽可能使用命名导出，即 `export const` 或 `export function`。
- **默认导出**：使用默认导出时，`export default` 和值的定义必须分开，不能写成合并。

### 代码质量

- 复杂逻辑添加注释；公共 API/组件 `Props` 提供 JSDoc 或类型注释。
- 每次生成或更新代码后，对于创建或修改的文件，使用 `prettier` 将其格式化，并执行 ESLint 检查。注意，使用 `npx` 执行命令，利用项目内下载好的包和已定义的规则。
- 忽略变量/类型未使用的 ESLint 警告，不要将其删除，也不要添加注释或 `_` 前缀。

## React 规范

### 组件定义

- 组件必须使用 `const XX: FC<XXProps> = props => { XX }` 的形式。
- 组件参数使用 `type` 定义，其名称应当是组件名称后缀 `Props`，是否导出也和组件保持一致。
- `Style` 是**全局类型**，定义在 `@/types/index.d.ts`，用于提供与原生相同的 `className` 和 `style` 类型。如果需要接受外部样式，使用这个类型。
- `PropsWithChildren` 用于处理需要 `children` 的组件。
- 组件体内解构 `props`，`children` 在最前面，最后两个参数为 `className` 和 `style`。

```typescript
import type { FC, PropsWithChildren } from 'react'

// 全量示例（包含 Style 和 PropsWithChildren）
// Style 是全局类型，不能导入
export type ContainerProps = Style &
  PropsWithChildren & {
    title?: string
  }

export const Container: FC<ContainerProps> = (props) => {
  const { children, title, className, style } = props
  return (
    <div className={className} style={style}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  )
}
```

如果组件语义上需要 `value`-`onChange` 的参数，考虑使用 `ValueController`。通过 `import type { ValueController } from 'value-controller'` 导入，按需求配置 `strictValue`、`strictOnChange` 等参数，可以调整 `value`、`onChange` 的类型，`onChange` 的参数类型。

### 关于 Hooks

- Hooks 命名以 `use` 开头并必须严格遵守 React Hooks 规则（只在顶层调用、只在 React 组件或其他 hooks 中调用、依赖列表完整）。
- 使用项目自定义 hooks（`@/hooks`）时，请参考 [docs/project.md](project.md) 中的 hooks 介绍，了解各 hook 的用途和适用场景。

### 事件处理函数

简单的事件处理函数**优先内联编写**，例如 `onClick={() => { /* 执行操作 */ }}`。

如果事件处理函数相对复杂，应当独立写在组件的函数体中，使用 `useMemoizedFn`（来自 `ahooks`）包裹。这种情况下，其名称应当依据功能和语义而定，例如 `submitUserForm`、`deleteHistoryItem`，不能命名为 `handleClick` 或 `onClick`。此外，还应为其添加 TSDoc 注释，描述其作用和限制。

### 数据请求

- **数据获取型请求**：对于数据获取型的网络请求，优先使用 `useSWR`，开启 `suspense` 模式，使用 `withSuspense` 和 `withErrorBoundary`（来自 `@/utils`）包裹组件，确保加载和错误状态的统一处理。
- **提交型请求**：对于"提交"这类场景（触发型的网络请求），使用 `useRequest`（来自 `ahooks`）。提交中按钮进入 `loading` 状态。如果按钮处于弹窗/抽屉等语义独立的部分中，提交过程中这些部分必须持续存在。以 Ant Design 弹窗为例，提交过程中，点击蒙层、按下 `Esc` 键都不能关闭，`closable` 设置为 `true`，取消按钮应设置为 `disabled`。

### Context

- React Context 的创建（`createContext`）应当放在一个独立的文件中，避免在组件文件内创建 Context，以防止热重载时 Context 被刷新导致状态丢失。
- Context Provider 组件可以放在同一文件或单独文件中，但 Context 对象本身必须独立导出。

## 样式规范

- 优先 Tailwind 工具类；合并 `className` 时调用 `@/utils` 导出的 `cn`（`clsx` + `tailwind-merge` 包装）。
- Tailwind 使用细则：
  1. 简单样式（词数 ≤ 3，如 `m-0`、`max-h-full`）尽量使用 Tailwind；若组合过长，可按语义拆组（如布局类一组、边框类一组）并用 `cn` 拼接。
  2. 凡是 CSS 属性值包含空格的样式（例如 `box-shadow`、`grid-column: span 1 / -1`）不使用 Tailwind，可放入 CSS Modules 以获得更好的提示。
  3. 若组件只有极少数复杂样式（如单个 `grid-column: 1 / -1`），可用 `style` 内联；但 `grid-column: span 1 / -1`、`box-shadow` 等需写在 CSS 中。带空格的复杂样式原则上都放 CSS，只有可拆分为多个简单属性（如 `padding` 的 `pl-*`、`pr-*`）才可以继续使用 Tailwind。
- 对于复杂视觉效果（自定义阴影、渐变背景、网格列、精细化修改 Ant Design 组件等），优先使用 CSS Modules 或内联 `style`，无需强行使用 Tailwind。
- 使用 `@/styles/index.ts` 导出的常用 `className` 常量（如 `AbsoluteCenter`）时，直接导入使用即可。
- 不使用 Sass/Less；全部样式以原生 CSS、CSS Modules 或 Tailwind 为主。

## 参考

如需补充规范，允许联网查阅 Next.js、next-intl、Ant Design 等官方文档或权威资料，确保内容与最新版本保持一致。
