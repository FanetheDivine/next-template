'use client'

import zhCN from 'antd/locale/zh_CN'
import { App, ConfigProvider } from 'antd'
import { ReactNode } from 'react'
import { themeConfig } from './theme'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { fullBox } from '@/styles'

type Props = {
    children: ReactNode
}
/** 配置主题、本地化等 */
export function AntdConfig(props: Props) {
    return (
        <AntdRegistry>
            <ConfigProvider locale={zhCN} theme={themeConfig}>
                <App className={[fullBox, 'overflow-hidden'].join(' ')}>
                    {props.children}
                </App>
            </ConfigProvider>
        </AntdRegistry>
    )
}