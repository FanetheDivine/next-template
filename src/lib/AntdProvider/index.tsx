'use client'

import { FC, PropsWithChildren } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { StyleProvider } from '@ant-design/cssinjs'

/** antd 首屏样式 样式兼容 本地化 主题等 */
export const AntdProvider: FC<PropsWithChildren> = (props) => {
  return (
    <StyleProvider layer>
      <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>
    </StyleProvider>
  )
}
