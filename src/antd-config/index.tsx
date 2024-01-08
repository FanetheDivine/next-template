'use client'

import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { ReactNode } from 'react'
import { themeConfig } from './theme'

type Props = {
    children: ReactNode
}
/** 配置主题、本地化等 */
export function AntdConfig(props: Props) {
    return (
        <ConfigProvider locale={zhCN} theme={themeConfig}>
            {props.children}
        </ConfigProvider>
    )
}