'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Result, Button } from 'antd'
import { RollbackOutlined, HomeOutlined } from '@ant-design/icons'
import { AbsoluteCenter } from '@/styles'
import { useRouter } from '@/i18n/navigation'

export const GlobalNotFound: FC = () => {
  const tc = useTranslations('common')
  const router = useRouter()
  return (
    <Result
      className={AbsoluteCenter}
      status={'404'}
      title={tc('page404')}
      extra={[
        <Button
          key='goback'
          type='primary'
          icon={<RollbackOutlined />}
          onClick={() => router.back()}
        >
          {tc('goback')}
        </Button>,
        <a href='/' key='homepage'>
          <Button icon={<HomeOutlined />}>{tc('toHomepage')}</Button>
        </a>,
      ]}
    />
  )
}

export default GlobalNotFound
