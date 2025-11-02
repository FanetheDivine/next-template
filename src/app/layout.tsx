import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { AntdProvider } from '@/lib/AntdProvider'
import { SWRProvider } from '@/lib/SWRProvider'
import '@/styles/globals.css'
import DefaultLoading from './loading'

const DynamicApp = dynamic(() => import('antd/es/app'), { loading: DefaultLoading })

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
