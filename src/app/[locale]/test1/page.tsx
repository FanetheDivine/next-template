import { getTranslations } from 'next-intl/server'
import { FC } from 'react'
import { Link } from '@/i18n/navigation'

const Page: FC = async () => {
  const t = await getTranslations()
  return (
    <Link href='/' locale='en'>
      {t('common.toHomepage')}
    </Link>
  )
}

export default Page
