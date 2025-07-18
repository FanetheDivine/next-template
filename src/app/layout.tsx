import { FC, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { fullContainerClass } from '@/styles'
import { AntdProvider } from '@/lib/AntdProvider'
import { SWRProvider } from '@/lib/SWRProvider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Next14 项目模板',
}

const RootLayout: FC<PropsWithChildren> = (props) => {
  return (
    <html lang='zh-CN' className={fullContainerClass}>
      <body className={fullContainerClass}>
        <AntdProvider>
          <SWRProvider>{props.children}</SWRProvider>
        </AntdProvider>
      </body>
    </html>
  )
}

export default RootLayout
