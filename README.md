# Next.js模板项目
## 语言
`typescript`
## 框架
`Next.js 14`
## 工具库
* 样式 `sass`
* 组件库 `antd`
* 对象持久化 `immutable`
* 日期时间 `moment`
* 校验数据格式 `zod`
* 客户端状态管理 `swr`
* 常见工具函数 `lodash`
* 登录鉴权 `next-auth`
* 数据库操作 `prisma`
## 项目规范
### 后缀名
使用`JSX`的文件后缀名为`tsx`
### 路径简写
* `'src/'`简写为`'@/' `
### 路由
采用App Router规范
### 项目结构规范
每级路由都遵循以下规范(以`/example/`为例)
```
example
├── subPage/ 下级路由
├── globals.css 全局css
├── layout.tsx 布局
├── module 本级路由资源
│   ├── server-action 服务端指令
│   │   └── login 登录(server action)
│   │       └─ loginField.ts 定义zod对象和传输数据类型
│   ├── component/ 组件
│   ├── images/ 图片
│   ├── styles.module.scss 样式sass文件(命名不能更改)
│   └── 其他资源
└── page.tsx 页面
```
### 组件规范
* 客户端组件不能直接引用服务端组件,但可以将服务端组件作为其他组件的`children`或者作为页面使用
* 客户端全局状态管理使用需自行创建钩子并引用`useSWR`进行
* 客户端组件获取浏览器url信息通过`next/navigation`的钩子进行
* 尽可能使用`server-action`而不是`route.ts`。在与`server-action`不同的文件中通过zod定义请求体类型,在客户端和服务端双端校验。从`@/type/ZodObjType`获取数据类型。
* 尽可能下降持有状态的组件的层级。例如展示数据时表格应该根据分页自行持有状态,而不是由父组件持有