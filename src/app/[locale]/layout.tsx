import type { Metadata } from 'next'
import { hasLocale, Locale } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { match } from 'ts-pattern'
import { DefaultLoadingFallback } from '@/components/DefaultLoadingFallback'
import { routing } from '@/i18n/routing'

const AntdProvider = dynamic(() => import('@/lib/AntdProvider'), {
  loading: DefaultLoadingFallback,
})
const SWRProvider = dynamic(() => import('@/lib/SWRProvider'), { loading: DefaultLoadingFallback })
const DynamicApp = dynamic(() => import('antd/es/app'), { loading: DefaultLoadingFallback })

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()
  return {
    title: t('metadata.title'),
  }
}
const RootLayout: FC<PropsWithChildren> = async (props) => {
  // 不能放在FC的类型里面 过不了检查
  const { children, params } = props as PropsWithChildren & {
    params: Promise<{ locale: Locale }>
  }
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
        <AntdRegistry>
          <NextIntlClientProvider>
            <AntdProvider>
              <SWRProvider>
                <DynamicApp className='app'>{children}</DynamicApp>
              </SWRProvider>
            </AntdProvider>
          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}

export default RootLayout

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
