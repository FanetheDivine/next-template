'use client'

import { FC, PropsWithChildren } from 'react'
import { StyleProvider } from '@ant-design/cssinjs'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { fullContainerClass } from '@/styles'

/** antd 首屏样式 样式兼容 本地化 主题等 */
export const AntdProvider: FC<PropsWithChildren> = (props) => {
  return (
    <AntdRegistry>
      <StyleProvider layer>
        <ConfigProvider locale={zhCN}>
          <App className={fullContainerClass}>{props.children}</App>
        </ConfigProvider>
      </StyleProvider>
    </AntdRegistry>
  )
}
