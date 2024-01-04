import type { Metadata } from 'next'
import { fullBox } from '@/styles'
import favicon from '@/favicon.ico'
import '@/globals.css'

export const metadata: Metadata = {
  title: 'next项目模板',
  description: 'next项目模板',
  icons: favicon.src
}
type Props = {
  children: React.ReactNode
}

export default function RootLayout(props: Props) {
  return (
    <html lang="zh-CN" className={fullBox}>
      <body className={fullBox}>{props.children}</body>
    </html>
  )
}
