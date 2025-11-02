import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { FC, PropsWithChildren, Suspense } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { withSuspense } from '@/utils'
import { AntdProvider } from '@/lib/AntdProvider'
import { DynamicApp } from '@/lib/DynamicApp'
import { SWRProvider } from '@/lib/SWRProvider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Next14 项目模板',
}

const RootLayout: FC<PropsWithChildren> = (props) => {
  return (
    <html lang='zh-CN'>
      <body>
        <AntdRegistry>
          <AntdProvider>
            <SWRProvider>
              {withSuspense(<DynamicApp className='app'>{props.children}</DynamicApp>)}
            </SWRProvider>
          </AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}

export default RootLayout
