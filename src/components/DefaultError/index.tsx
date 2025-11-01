'use client'

import { FC } from 'react'
import { Result, Button } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import { AbsoluteCenter } from '@/styles'
import { cn } from '@/utils'

export const DefaultError: FC<{ error?: Error; reset?: () => void }> = (props) => {
  const { error, reset } = props
  return (
    <Result
      className={cn(AbsoluteCenter, '-translate-y-4/5')}
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
