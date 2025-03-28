'use client'

import { FC, PropsWithChildren } from 'react'
import { StyleProvider } from '@ant-design/cssinjs'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { fullContainer } from '@/styles'

export const AntdProvider: FC<PropsWithChildren> = (props) => {
  return (
    <AntdRegistry>
      <StyleProvider layer>
        <ConfigProvider locale={zhCN}>
          <App className={fullContainer}>{props.children}</App>
        </ConfigProvider>
      </StyleProvider>
    </AntdRegistry>
  )
}
