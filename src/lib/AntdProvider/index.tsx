import { Locale } from 'next-intl'
import { FC, PropsWithChildren } from 'react'
import { ConfigProvider } from 'antd'
import antd_en_US from 'antd/es/locale/en_US'
import antd_zh_CN from 'antd/es/locale/zh_CN'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { match } from 'ts-pattern'
import { ClientAntdProvider } from './ClientAntdProvider'

/** antd 首屏样式 样式兼容 本地化 主题等 */
export const AntdProvider: FC<PropsWithChildren & { locale: Locale }> = (props) => {
  const { locale } = props
  const antdLocale = match(locale)
    .with('zh', () => antd_zh_CN)
    .with('en', () => antd_en_US)
    .exhaustive()
  match(locale)
    .with('zh', () => dayjs.locale('zh'))
    .with('en', () => dayjs.locale('en'))
    .exhaustive()

  return (
    <AntdRegistry>
      <ClientAntdProvider>
        <ConfigProvider locale={antdLocale}>{props.children}</ConfigProvider>
      </ClientAntdProvider>
    </AntdRegistry>
  )
}

export default AntdProvider
