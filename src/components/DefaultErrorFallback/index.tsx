'use client'

import { FC } from 'react'
import { Result, Button } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'

export const DefaultErrorFallback: FC<{ error?: Error; reset?: () => void }> = (props) => {
  const { error, reset } = props
  return (
    <Result
      className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4/5'}
      status={'error'}
      title='页面错误'
      subTitle={error?.message}
      extra={
        <Button type='primary' icon={<RollbackOutlined />} onClick={() => reset?.()}>
          重试
        </Button>
      }
    />
  )
}
