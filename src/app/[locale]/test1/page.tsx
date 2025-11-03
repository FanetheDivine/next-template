'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Link } from '@/i18n/navigation'

const Page: FC = () => {
  const t = useTranslations()
  return (
    <Link href='/' locale='en'>
      客户端组件
      {t('common.toHomepage')}
    </Link>
  )
}

export default Page
