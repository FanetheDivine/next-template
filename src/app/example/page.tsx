'use client'

import Image from 'next/image'
import pic from './module/images/example.png'
import upload from './module/server-action/upload'
import login from './module/server-action/login'
import { LoginField } from './module/server-action/login/loginField'
import { App, Button, Card, FloatButton, Input, Layout, Select, Upload, message } from 'antd'
import Password from 'antd/es/input/Password'
import { usePathname, useRouter } from 'next/navigation'
import { LoginOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons'
import { getZodForm } from '@/components/Form'
import { fullBox, positionCenter } from '@/styles'

const [Form, FormItem] = getZodForm(LoginField)
export default function Home() {
	const router = useRouter()
	const pathname = usePathname()
	const app = App.useApp()
	async function submit(value: LoginField) {
		try {
			await login(value)
			message.success('登录成功')
			router.push(`${pathname}/subPage`)
		} catch (e) {
			if (e instanceof Error) {
				app.message.error(e.message)
			} else {
				app.message.error('登录失败')
			}
		}
	}

	return (
		<Layout className={fullBox}>
			<FloatButton onClick={() => app.modal.confirm({ title: '11' })}></FloatButton>
			<Image alt='' src={pic} onClick={() => app.modal.info({ title: 1 })}></Image>
			<Upload accept='image/*' multiple={false} beforeUpload={() => false}>
				<Button type='primary' icon={<UploadOutlined></UploadOutlined>}></Button>
			</Upload>
			<Card className={[positionCenter, 'w-1/3'].join(' ')}>
				<Form onFinish={submit}>
					<FormItem name='email' label='邮箱'><Input></Input></FormItem>
					<FormItem name='password' label='密码'><Password></Password></FormItem>
					<FormItem>
						<span className='flex justify-evenly'>
							<Button htmlType='submit' type='primary' icon={<LoginOutlined />}>登录</Button>
							<Button htmlType='reset' type='primary' icon={<UndoOutlined />}>重置</Button>
						</span>
					</FormItem>
				</Form>
			</Card>
		</Layout>
	)
}