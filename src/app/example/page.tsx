'use client'

import Image from 'next/image'
import pic from './module/images/example.png'
import styles from './module/styles.module.scss'
// 必须命名为xxx.module.xxx
import upload from './module/server-action/upload'
import checkEmail from './module/server-action/checkForm'
import { FormField } from './module/server-action/checkForm/form'
// 常量不能和server action定义在一个文件里
import { Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Password from 'antd/es/input/Password'
import { useParams, usePathname, useRouter } from 'next/navigation'

const FormItem = Form.Item<FormField>

export default function Home() {
  const [form] = useForm<FormField>()
  const router = useRouter()
  const pathname = usePathname()
  async function Login() {
    router.push(`${pathname}/logged`)
    // const formValues = form.getFieldsValue()
    // try {
    //   const val = await checkEmail(FormField.parse(formValues))
    //   console.log(val)
    // } catch (e) {
    //   console.log(e)
    // }
  }

  return (
    <div>
      {/* 在样式中引用图片 */}
      <span className={styles.example} style={{ width: pic.width, height: pic.height }}></span>
      {/* 导入图片后在next/Image使用 */}
      <Image alt='' src={pic}></Image>
      {/* 自定义路由 */}
      <Image alt='' src={'/example/pic'} width={pic.width} height={pic.height}></Image>
      <div>
        {/* 通过server action上传文件 */}
        <input type='file' onChange={async e => {
          const file = e.target.files?.[0]
          if (file) {
            const formData = new FormData()
            formData.set(encodeURI(file.name), file)// 编码中文文件名
            upload(formData).catch(e => message.error(e.message ?? '上传失败'))
          }
        }}></input>
        <Form form={form}>
          <FormItem name='email'><Input placeholder='邮箱'></Input></FormItem>
          <FormItem name='password'><Password></Password></FormItem>
          <FormItem><Button onClick={Login}>登录</Button></FormItem>
        </Form>
      </div>
    </div>
  )
}