'use client'

import Image from 'next/image'
import pic from './module/images/example.png'
import upload from './module/server-action/upload'
import login from './module/server-action/login'
import { LoginField } from './module/server-action/login/loginField'
import { Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Password from 'antd/es/input/Password'
import { usePathname, useRouter } from 'next/navigation'
import { ZodError } from 'zod'
import { fullBox } from '@/styles'
import { LoginOutlined } from '@ant-design/icons'

const FormItem = Form.Item<LoginField>

export default function Home() {
  const [form] = useForm<LoginField>()
  const router = useRouter()
  const pathname = usePathname()
  async function Login() {
    try {
      const formValues = form.getFieldsValue()
      await login(LoginField.parse(formValues))
      message.success('登录成功')
      router.push(`${pathname}/subPage`)
    } catch (e) {
      if (e instanceof ZodError) {
        message.error('表单错误')
      } else if (e instanceof Error) {
        message.error(e.message)
      } else {
        message.error('登录失败')
      }
    }
  }

  return (
    <div className={fullBox}>
      <Image alt='' src={pic}></Image>
      <div>
        <input type='file' onChange={async e => {
          const file = e.target.files?.[0]
          if (file) {
            const formData = new FormData()
            formData.set(encodeURIComponent(file.name), file)//必须传递文件名 file.name会乱码
            try {
              const fileName = await upload(formData)
              message.success(`上传成功,文件名为${fileName}`)
            } catch (e) {
              if (e instanceof Error) {
                message.error(e.message)
              } else {
                message.error('上传失败')
              }
            }
          }
        }}></input>
        <Form className='w-1/2' form={form}>
          <FormItem name='email'><Input placeholder='邮箱'></Input></FormItem>
          <FormItem name='password'><Password></Password></FormItem>
          <FormItem><Button onClick={Login}><LoginOutlined />登录</Button></FormItem>
        </Form>
      </div>
    </div>
  )
}