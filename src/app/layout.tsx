import type { Metadata } from 'next'
import { AntdConfig } from '@/antd-config'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App } from 'antd'
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
				<AntdRegistry>
					<AntdConfig>
						<App className={MainViewport}>
							{props.children}
						</App>
					</AntdConfig>
				</AntdRegistry>
			</body>
		</html>
	)
}