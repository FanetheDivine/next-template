import Link from 'next/link'
import { FC } from 'react'
import { Button } from 'antd'
import { AbsoluteCenter } from '@/styles'
import { routing } from '@/i18n/routing'
import { sleep } from '@/utils/sleep'

const Page: FC = async () => {
  await sleep(2000)
  return (
    <Link href='/test1' className={AbsoluteCenter}>
      <Button type='primary' className={'bg-black'}>
        Test Page
      </Button>
    </Link>
  )
}

export default Page

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
