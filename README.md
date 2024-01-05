# Next.js模板项目
## 语言
`typescript`
## 框架
`Next.js 14`
## 工具库
* 样式 `tailwindcss`
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
* `'src/'`简写为`'@/' `,`@/`下`app`目录为页面路径,其余为公共资源
### 路由
采用App Router规范
### 项目结构规范
每级路由都遵循以下规范(以`/example/`为例)
```
example
├── subPage/ 下级路由
├── module 本级路由资源
│   ├── server-action 服务端指令
│   │   └── login 登录(server action)
│   │       └─ loginField.ts 定义zod对象和传输数据类型
│   ├── component/ 组件
│   ├── images/ 图片
│   └── 其他资源
├── layout.tsx 布局
└── page.tsx 页面
```
### 组件规范
* 客户端组件不能直接引用服务端组件,反过来可以。如果有需要,创建客户端组件并以服务端组件作为参数(children或者其他)。
  #### page.tsx  
  ```ts
  import ClientComponent from './module/component/ClientComponent'

  export default function Page(){
    return <ClientComponent>{new Date().getTime()}</ClientComponent>
  }
  ```
  #### module/component/ClientComponent.tsx
  ```ts
  'use client'

  import { ReactNode, useState } from 'react'

  type Props = {
    children: ReactNode
  }

  export default function ClientComponent(props:Props){
    const [num, setNum] = sueState(0)
    return (
        <>
            <button onClick={()=>setNum(num+1)}>{num}</button>
            {props.children}
        </>
    )
  }
  ```
* 客户端管理多个组件共享的状态时,需引用`useSWR`自行创建钩子,并使用当前目录+数据名作为key,确保唯一性
* 客户端组件获取浏览器url信息通过`next/navigation`的钩子进行
* 尽可能使用`server-action`而不是`route.ts`。在与`server-action`不同的文件中通过zod定义请求体类型,在客户端和服务端双端校验。
* 客户端组件中,抽取状态和依赖此状态的组件至新组件,尽可能下沉状态的层级。如果新组件需要子组件,通过传参解决。参考第一条。