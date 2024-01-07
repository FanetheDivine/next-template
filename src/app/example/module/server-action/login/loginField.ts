import { z } from "zod"

export const LoginField = z.object({
    email: z.string({ required_error: '请输入邮箱' }).email('请提供合法邮箱'),
    password: z.string({ required_error: '请输入密码' }).max(20, '密码长度应小于20')
})
export type LoginField = z.infer<typeof LoginField>