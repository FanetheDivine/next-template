import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { DefaultLoadingFallback } from '@/components/DefaultLoadingFallback'
import { routing } from '@/i18n/routing'
import '@/styles/globals.css'

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
  const { children } = props
  const locale = await getLocale()
  console.log(locale)
  if (!hasLocale(routing.locales, locale)) {
    notFound()
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
