import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { FC } from 'react'
import { App } from 'antd'
import { match } from 'ts-pattern'
import { routing } from '@/i18n/routing'
import AntdProvider from '@/lib/AntdProvider'
import SWRProvider from '@/lib/SWRProvider'

export async function generateMetadata(
  props: Pick<LayoutProps<'/[locale]'>, 'params'>,
): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  if (!hasLocale(routing.locales, locale)) {
    return {}
  }
  const t = await getTranslations({ locale })
  return {
    title: t('metadata.title'),
  }
}

const RootLayout: FC<LayoutProps<'/[locale]'>> = async (props) => {
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
  const messages = await getMessages({ locale })
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={{ common: messages.common }}>
          <SWRProvider>
            <AntdProvider locale={locale}>
              <App className='app'>{children}</App>
            </AntdProvider>
          </SWRProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
