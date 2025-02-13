'use client'

import { FC, PropsWithChildren } from 'react'
import { fullContainer } from '@/styles'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

export const AntdProvider: FC<PropsWithChildren> = (props) => {
  return (
    <AntdRegistry>
      <ConfigProvider locale={zhCN}>
        <App className={fullContainer}>{props.children}</App>
      </ConfigProvider>
    </AntdRegistry>
  )
}
