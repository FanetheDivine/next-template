# Next.js模板项目
基于`Next.js 14.0.4`和`typescript`,为`Next.js`项目提供模板
## 工具库
* 样式 `tailwindcss`
* 组件库 `antd`
* 对象持久化 `immutable`
* 日期时间 `moment`
* 校验数据格式 `zod`
* 客户端状态管理 `swr`
* 常见工具函数 `lodash` 
* 常用钩子 `ahooks`
## 项目结构
* `src/` 简写为`@/`
* `@/app` Next.js App Router下的页面和路由.每级路由遵循以下结构(以`@/app/`为例)
  ```
  app
  ├── example/ 下级路由
  ├── module 本级路由资源
  │   ├── components/ 组件
  │   ├── images/ 图片
  │   ├── state/ 状态
  │   └── 其他资源
  ├── layout.tsx 布局
  └── page.tsx 页面
  ```
* `@/`下其余的文件夹放置全局资源
  * `@/state` 全局状态
  * `@/components'` 全局组件
  * `@/utils` 全局工具函数和钩子
  * `@/lib` 不被组件直接引用的全局工具函数和钩子
## server action
web前后端不直接进行网络请求,而是使用[server action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).`sevrer action`是运行于服务端的函数,但可以在任何位置被调用.`server action`只接受简单的参数,即数字,字符串和表单(尽管表单内可以放置二进制对象)等.  
尽量按照`server-action`的类型描述提供参数,否则容易报错.下面是一个错误的例子
```ts
<Button onClick={serverAction}></Button>//serverAction隐式接受了一个复杂参数(事件) 导致抛出异常
```
## 代码提交规范
* 控制每次提交的代码的数量和范围
* 提交代码前成功运行项目并进行简单的自测
* 提交代码时,消息具有以下结构(参考commitlint.config.js)
  ```
  perf(本次提交涉及的范围): 简单描述

  具体描述
  ```
## 开发规范
* 表单使用`@/components/Form`配合zod
* 简单的弹窗、消息等使用`App.useApp`调用
* 主视窗已经设置为`overflow:hidden`.有滚动需要自行设置.
* 多个样式使用`classnames`库进行联合
* 多个端共享的变量(例如zod对象),应该单独定义在一个文件.此外,服务端组件向客户端组件传输的参数,必须是*简单对象*(`plain object`)
* 一般情况下,尽可能多使用rem、百分数,少使用em、vh、vw,不明确指定px
* 使用antd的Layout组件,体现底色
* 客户端组件不能直接引用服务端组件,反过来可以.如果有需要,创建客户端组件并以服务端组件作为参数(children或者其他).
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
* 客户端组件中,抽取状态和依赖此状态的组件至新组件,尽可能下沉状态的层级.如果新组件需要子组件,通过传参解决.参考上一条.
* 在`'./module/state'`下使用`useSWR`创建钩子管理状态,以当前目录+数据名作为key,确保唯一性.多个组件共享的状态,在`@/state/`下创建钩子.
* 客户端组件获取浏览器url信息通过`next/navigation`的钩子进行
* 尽可能使用`server-action`而不是`route.ts`.在与`server-action`不同的文件中通过zod定义请求体类型,在客户端和服务端双端校验.
* 充分利用React的`Suspense`组件、Next的`loading.tsx`,以及antd的`Skeleton`(骨架屏)和`Loading`组件填充加载时内容
* 利用`@/utils/isMobile`判断用户是否处于触摸设备以展示不同的内容