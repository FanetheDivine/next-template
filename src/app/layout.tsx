import { FC, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { AntdProvider } from '@/lib/AntdProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next14 项目模板',
}

const RootLayout: FC<PropsWithChildren> = (props) => {
  return (
    <html lang='zh-CN'>
      <body>
        <AntdProvider>{props.children}</AntdProvider>
      </body>
    </html>
  )
}

export default RootLayout
