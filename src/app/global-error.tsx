'use client'

import Link from 'next/link'
import { FC } from 'react'
import { Result, Button } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import { AbsoluteCenter } from '@/styles'
import { cn } from '@/utils'

const GlobalError: FC = () => {
  return (
    <Result
      className={cn(AbsoluteCenter, '-translate-y-4/5')}
      status={'error'}
      title='页面错误'
      extra={
        <Link href='/'>
          <Button type='primary' icon={<RollbackOutlined />}>
            返回首页
          </Button>
        </Link>
      }
    />
  )
}

export default GlobalError
