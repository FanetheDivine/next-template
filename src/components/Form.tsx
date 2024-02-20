'use client'

import { Form, FormItemProps } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { z } from 'zod'

/** 
 * 通过简单zod构造基于antd的表单 仅客户端组件中使用
 * @example
 * const [Form, FormItem, useForm] = getZodForm(zodObj)
 */
export function getZodForm<T extends z.ZodObject<Record<string, z.ZodFirstPartySchemaTypes>>>(zod: T) {
    type FormField = z.infer<T>

    /** 必须指定`name`描述表单对应项的属性名 */
    function FormItem(props: FormItemProps<FormField> & { name: keyof FormField & string }) {
        const fieldZod = zod.shape[props.name]
        return (
            <Form.Item<FormField> {...props} required={!fieldZod.isOptional()}
                rules={[{
                    validator: async (_, val) => {
                        const res = fieldZod.safeParse(val === '' ? undefined : val)// 空串被zod视为有值 做特殊处理
                        if (!res.success) {
                            throw new Error(res.error.errors[0].message)
                        }
                    }
                }]}
            />
        )
    }
    return [Form<FormField>, FormItem, useForm<FormField>] as const // [Form,FormItem,useForm]
}
