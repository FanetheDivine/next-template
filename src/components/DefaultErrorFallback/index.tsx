'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Result, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

export const DefaultErrorFallback: FC<{ error?: Error; reset?: () => void }> = (props) => {
  const { error, reset } = props
  const tc = useTranslations('common')
  return (
    <Result
      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4/5'
      status={'error'}
      title={tc('pageError')}
      subTitle={error?.message}
      extra={[
        <Button key='retry' type='primary' icon={<ReloadOutlined />} onClick={reset}>
          {tc('retry')}
        </Button>,
        <Button
          key='refresh'
          // eslint-disable-next-line no-self-assign
          onClick={() => (window.location.href = window.location.href)}
        >
          {tc('reloadPage')}
        </Button>,
      ]}
    />
  )
}
