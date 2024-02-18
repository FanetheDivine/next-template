'use client'

import { getZodForm } from "@/components/Form";
import { LoginField } from "./LoginField";
import { App, Button, Input } from "antd";
import Password from "antd/lib/input/Password";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


const [Form, FormItem] = getZodForm(LoginField)
type Props = {
    token: string | undefined
}

export function Login(props: Props) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const app = App.useApp()
    function submit(values: LoginField) {
        const formData = new FormData()
        let key: keyof LoginField
        for (key in values) {
            formData.append(key, values[key] ?? '')
        }
    }
    return (
        <Form initialValues={{ csrfToken: props.token }} onFinish={submit}>
            <FormItem name='csrfToken'><Input disabled></Input></FormItem>
            <FormItem name='email' label='邮箱'><Input type='email'></Input></FormItem>
            <FormItem name='passwd' label='密码'><Password></Password></FormItem>
            <Button htmlType='submit' icon={<LoginOutlined />}>登录</Button>
            <Button icon={<LogoutOutlined />} >登出</Button>
        </Form>
    )
}
