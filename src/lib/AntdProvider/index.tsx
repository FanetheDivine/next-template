'use client'

import { Locale } from 'next-intl'
import { FC, PropsWithChildren, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import antd_en_US from 'antd/es/locale/en_US'
import antd_zh_CN from 'antd/es/locale/zh_CN'
import { StyleProvider } from '@ant-design/cssinjs'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { match } from 'ts-pattern'

/** antd 首屏样式 样式兼容 本地化 主题等 */
export const AntdProvider: FC<PropsWithChildren & { locale: Locale }> = (props) => {
  const { locale } = props
  const antdLocale = match(locale)
    .with('zh', () => antd_zh_CN)
    .with('en', () => antd_en_US)
    .exhaustive()
  useEffect(() => {
    match(locale)
      .with('zh', () => antd_zh_CN)
      .with('en', () => antd_en_US)
      .exhaustive()
  }, [])
  return (
    <StyleProvider layer>
      <ConfigProvider locale={antdLocale}>{props.children}</ConfigProvider>
    </StyleProvider>
  )
}

export default AntdProvider
