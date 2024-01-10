import type { Metadata } from 'next'
import { AntdConfig } from '@/antd-config'
import favicon from '@/favicon.ico'
import '@/globals.css'
import { fullBox } from '@/styles'

export const metadata: Metadata = {
	title: 'next项目模板',
	description: 'next项目模板',
	icons: favicon.src
}
type Props = {
	children: React.ReactNode
}

const MainViewport = [fullBox, 'overflow-hidden'].join(' ')

export default function RootLayout(props: Props) {
	return (
		<html lang="zh-CN">
			<body className={MainViewport}>
				<AntdConfig>
					{props.children}
				</AntdConfig>
			</body>
		</html>
	)
}