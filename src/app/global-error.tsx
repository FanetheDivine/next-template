'use client'

import Link from 'next/link'
import { FC } from 'react'
import { Result, Button } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'

const GlobalError: FC = () => {
  return (
    <Result
      className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4/5'}
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
