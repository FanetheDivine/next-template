"use client"

import { FC, PropsWithChildren } from "react"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { App, ConfigProvider } from "antd"
import zhCN from "antd/locale/zh_CN"

export const AntdProvider: FC<PropsWithChildren> = (props) => {
  return (
    <AntdRegistry>
      <ConfigProvider locale={zhCN}>
        <App className="w-full h-full relative overflow-hidden m-0 border-0 p-0">
          {props.children}
        </App>
      </ConfigProvider>
    </AntdRegistry>
  )
}
