'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Result, Button } from 'antd'
import { RollbackOutlined, HomeOutlined } from '@ant-design/icons'
import { AbsoluteCenter } from '@/styles'
import { useRouter, Link } from '@/i18n/navigation'

// /locale/页面的notfound

const LocaleNotFound: FC = () => {
  const t = useTranslations()
  const router = useRouter()
  return (
    <Result
      className={AbsoluteCenter}
      status={'404'}
      title={t('common.page404')}
      extra={[
        <Button
          key='goback'
          type='primary'
          icon={<RollbackOutlined />}
          onClick={() => router.back()}
        >
          {t('common.goback')}
        </Button>,
        <Link href='/' key='homepage'>
          <Button icon={<HomeOutlined />}>{t('common.toHomepage')}</Button>
        </Link>,
      ]}
    />
  )
}

export default LocaleNotFound
