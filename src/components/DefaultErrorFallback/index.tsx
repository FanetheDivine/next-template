'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Result, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

export const DefaultErrorFallback: FC<{ error?: Error; reset?: () => void }> = (props) => {
  const { error, reset } = props
  const t = useTranslations()
  return (
    <div className='flex h-full w-full flex-1 items-center justify-center'>
      <Result
        status={'error'}
        title={t('common.pageError')}
        subTitle={error?.message}
        extra={[
          <Button key='retry' type='primary' icon={<ReloadOutlined />} onClick={reset}>
            {t('common.retry')}
          </Button>,
          <Button
            key='refresh'
            // eslint-disable-next-line no-self-assign
            onClick={() => (window.location.href = window.location.href)}
          >
            {t('common.reloadPage')}
          </Button>,
        ]}
      />
    </div>
  )
}
