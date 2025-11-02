import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { DefaultLoadingFallback } from '@/components/DefaultLoadingFallback'
import '@/styles/globals.css'

const AntdProvider = dynamic(() => import('@/lib/AntdProvider'), {
  loading: DefaultLoadingFallback,
})
const SWRProvider = dynamic(() => import('@/lib/SWRProvider'), { loading: DefaultLoadingFallback })
const DynamicApp = dynamic(() => import('antd/es/app'), { loading: DefaultLoadingFallback })

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
              <DynamicApp className='app'>{props.children}</DynamicApp>
            </SWRProvider>
          </AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}

export default RootLayout
