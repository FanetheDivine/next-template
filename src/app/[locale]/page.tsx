import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import type { FC } from 'react'
import { Button } from 'antd'
import { AbsoluteCenter } from '@/styles'
import { toURLSearchParams } from '@/utils'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { isMobile } from '@/utils/server'
import { sleep } from '@/utils/sleep'
import { ConfirmBtn } from './client-components/ConfirmBtn'

export async function generateMetadata(props: PageProps<'/[locale]'>): Promise<Metadata> {
  const params = await props.params
  const searchParams = toURLSearchParams(await props.searchParams)
  const { locale } = params
  if (!hasLocale(routing.locales, locale)) {
    return {}
  }
  const t = await getTranslations({ locale })
  return {
    title: t('metadata.title'),
    description: t('metadata.title'),
  }
}

const Page: FC<PageProps<'/[locale]'>> = async (props) => {
  await sleep(2000)
  const locale = await getLocale()
  const t = await getTranslations()
  const ua = await isMobile()
  console.log(ua)
  return (
    <>
      {process.env.NEXT_PUBLIC_TEST}
      <ConfirmBtn />
      {JSON.stringify(ua)}
      <Link href='/test1' className={AbsoluteCenter}>
        <Button type='primary' className={'bg-black'}>
          {[locale, t('metadata.title')]}
        </Button>
      </Link>
    </>
  )
}

export default Page
