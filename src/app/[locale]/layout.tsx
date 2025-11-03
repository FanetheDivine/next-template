import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { match } from 'ts-pattern'
import { DefaultLoadingFallback } from '@/components/DefaultLoadingFallback'
import { routing } from '@/i18n/routing'
import { type LocaleParams } from '@/i18n/type'

const AntdProvider = dynamic(() => import('@/lib/AntdProvider'), {
  loading: DefaultLoadingFallback,
})
const SWRProvider = dynamic(() => import('@/lib/SWRProvider'), { loading: DefaultLoadingFallback })
const DynamicApp = dynamic(() => import('antd/es/app'), { loading: DefaultLoadingFallback })

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  // 为了适应打包为静态html的情况
  const { params } = props
  const { locale } = await params
  const t = await getTranslations({ locale })
  return {
    title: t('metadata.title'),
  }
}

const RootLayout: FC<PropsWithChildren> = async (props) => {
  // 不能放在FC的类型里面 过不了检查
  const { children, params } = props as PropsWithChildren & LocaleParams

  const locale = await match(process.env.EXPORT === 'true')
    .with(true, async () => {
      // 静态html
      const { locale } = await params
      return locale
    })
    .with(false, getLocale)
    .exhaustive()

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  if (process.env.EXPORT === 'true') {
    setRequestLocale(locale)
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <AntdRegistry>
            <AntdProvider locale={locale}>
              <SWRProvider>
                <DynamicApp className='app'>{children}</DynamicApp>
              </SWRProvider>
            </AntdProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
