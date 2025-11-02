import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { DefaultLoadingFallback } from '@/components/DefaultLoadingFallback'
import { routing } from '@/i18n/routing'

const AntdProvider = dynamic(() => import('@/lib/AntdProvider'), {
  loading: DefaultLoadingFallback,
})
const SWRProvider = dynamic(() => import('@/lib/SWRProvider'), { loading: DefaultLoadingFallback })
const DynamicApp = dynamic(() => import('antd/es/app'), { loading: DefaultLoadingFallback })

export async function generateMetadata(props: ParamsWithLocale): Promise<Metadata> {
  const { params } = props
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('title'),
  }
}

const RootLayout: FC<PropsWithChildren & ParamsWithLocale> = async (props) => {
  const { children, params } = props
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  return (
    <html lang={locale}>
      <body>
        <AntdRegistry>
          <AntdProvider>
            <SWRProvider>
              <DynamicApp className='app'>{children}</DynamicApp>
            </SWRProvider>
          </AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}

export default RootLayout

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
