import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import { App } from 'antd'
import { match } from 'ts-pattern'
import { routing } from '@/i18n/routing'
import AntdProvider from '@/lib/AntdProvider'
import SWRProvider from '@/lib/SWRProvider'

export async function generateMetadata(props: PageProps<'/[locale]'>): Promise<Metadata> {
  // 为了适应打包为静态html的情况
  const { params } = props
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    return {}
  }
  const t = await getTranslations({ locale })
  return {
    title: t('metadata.title'),
  }
}

const RootLayout: FC<PropsWithChildren & PageProps<'/[locale]'>> = async (props) => {
  const { children, params } = props

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
          <AntdProvider locale={locale}>
            <SWRProvider>
              <App className='app'>{children}</App>
            </SWRProvider>
          </AntdProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
