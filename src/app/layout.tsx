import type { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Button, Result } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import { AbsoluteCenter } from '@/styles'
import { cn } from '@/utils'
import { AntdProvider } from '@/lib/AntdProvider'
import { SWRProvider } from '@/lib/SWRProvider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Next14 项目模板',
}

const RootLayout: FC<PropsWithChildren> = (props) => {
  return (
    <html lang='zh-CN'>
      <body>
        <AntdProvider>
          <SWRProvider>
            <ErrorBoundary FallbackComponent={GlobalError}>{props.children}</ErrorBoundary>
          </SWRProvider>
        </AntdProvider>
      </body>
    </html>
  )
}

export default RootLayout

const GlobalError: FC<FallbackProps> = (props) => {
  const { error, resetErrorBoundary } = props
  return (
    <Result
      className={cn(AbsoluteCenter, '-translate-y-4/5')}
      status={'error'}
      title='页面错误'
      subTitle={error?.message}
      extra={
        <Button type='primary' icon={<RollbackOutlined />} onClick={resetErrorBoundary}>
          返回
        </Button>
      }
    />
  )
}
