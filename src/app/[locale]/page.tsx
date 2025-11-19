import { getLocale, getTranslations } from 'next-intl/server'
import { FC } from 'react'
import { Button } from 'antd'
import { AbsoluteCenter } from '@/styles'
import { Link } from '@/i18n/navigation'
import { isMobile } from '@/utils/server'
import { sleep } from '@/utils/sleep'
import { ConfirmBtn } from './client-components/ConfirmBtn'

const Page: FC = async () => {
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
