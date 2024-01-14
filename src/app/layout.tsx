import type { Metadata } from 'next'
import { AntdConfig } from './module/components/antd-config'
import favicon from './module/images/favicon.ico'
import './module/styles/globals.css'
import { SessionProvider } from './module/components/session-provider'

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
		<html lang="zh-CN">
			<body>
				<SessionProvider>
					<AntdConfig>
						{props.children}
					</AntdConfig>
				</SessionProvider>
			</body>
		</html>
	)
}