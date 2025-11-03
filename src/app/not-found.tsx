'use client'

import Link from 'next/link'
import { FC } from 'react'
import { Result, Button } from 'antd'
import { RollbackOutlined, HomeOutlined } from '@ant-design/icons'
import { AbsoluteCenter } from '@/styles'
import locale from '@/../messages/en.json'

const GlobalNotFound: FC = () => {
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
          onClick={() => history.go(-1)}
        >
          {locale.common.goback}
        </Button>,
        <a href='/' key='homepage'>
          <Button icon={<HomeOutlined />}>{locale.common.goback}</Button>
        </a>,
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
