import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'next项目模板',
  description: 'next项目模板'
}
type Props={
  children:React.ReactNode
}

export default function RootLayout(props:Props) {
  return (
    <html lang="zh-CN">
      <body>{props.children}</body>
    </html>
  )
}
