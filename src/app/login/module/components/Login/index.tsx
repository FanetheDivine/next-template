'use client'

import { getZodForm } from "@/components/Form";
import { LoginField } from "./LoginField";
import { App, Button, Input } from "antd";
import Password from "antd/lib/input/Password";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";


const [Form, FormItem] = getZodForm(LoginField)
type Props = {
    token: string | undefined
}

export function Login(props: Props) {
    const session = useSession()
    useEffect(() => {
        console.log(session)
    }, [session])
    const searchParams = useSearchParams()
    const router = useRouter()
    const app = App.useApp()
    function submit(values: LoginField) {
        const formData = new FormData()
        let key: keyof LoginField
        for (key in values) {
            formData.append(key, values[key] ?? '')
        }
        fetch('/api/auth/callback/credentials', {
            body: formData,
            method: 'POST'
        }).then((res) => {
            console.log(res)
            app.message.success('登录成功')
            // router.push(searchParams.get('callbackUrl') ?? '/')
        }).catch(e => {
            app.message.error('登录失败')
        })
    }
    return (
        <>
        {session.data?.user?.name}
            <Button onClick={()=>signIn('credentials',{email:'11',a:1})}>Login</Button>
            <Form initialValues={{ csrfToken: props.token }} onFinish={submit}>
                <FormItem name='csrfToken'><Input disabled></Input></FormItem>
                <FormItem name='email' label='邮箱'><Input type='email'></Input></FormItem>
                <FormItem name='passwd' label='密码'><Password></Password></FormItem>
                <Button htmlType='submit' icon={<LoginOutlined />}>登录</Button>
                <Button icon={<LogoutOutlined />} onClick={() => signOut()}>登出</Button>
            </Form>
            <form action="/api/auth/callback/credentials" method="POST">
                <input name="csrfToken" defaultValue={props.token} />
                <div>
                    <label className="section-header">email</label>
                    <input name="email" type="text" placeholder="" />
                </div>
                <div>
                    <label className="section-header">passwd</label>
                    <input name="passwd" id="input-passwd-for-credentials-provider" type="text" placeholder="" />
                </div>
                <button type="submit">Sign in with Credentials</button>
            </form>
        </>
    )
}
