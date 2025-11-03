'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Result, Button } from 'antd'
import { RollbackOutlined, HomeOutlined } from '@ant-design/icons'
import { AbsoluteCenter } from '@/styles'
import locale from '@/../messages/en.json'

const GlobalNotFound: FC = () => {
  const router = useRouter()
  return (
    <Result
      className={AbsoluteCenter}
      status={'404'}
      title={locale.common.pageError}
      extra={[
        <Button
          key='goback'
          type='primary'
          icon={<RollbackOutlined />}
          onClick={() => router.back()}
        >
          {locale.common.goback}
        </Button>,
        <Link href='/' key='homepage'>
          <Button icon={<HomeOutlined />}>{locale.common.goback}</Button>
        </Link>,
      ]}
    />
  )
}

const RootNotFound: FC = () => {
  return (
    <html lang='en'>
      <body>
        <GlobalNotFound />
      </body>
    </html>
  )
}

export default RootNotFound
