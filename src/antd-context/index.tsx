'use client'

import zhCN from 'antd/locale/zh_CN'
import { App, ConfigProvider } from 'antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ReactNode } from 'react'
import { fullBox } from '@/styles'
import { themeConfig } from './config'

type Props = {
    children: ReactNode
}
/** 配置主题、本地化等 */
export function AntdContext(props: Props) {
    return (
        <AntdRegistry>
            <ConfigProvider locale={zhCN} theme={themeConfig}>
                <App className={fullBox}>
                    {props.children}
                </App>
            </ConfigProvider>
        </AntdRegistry>
    )
}