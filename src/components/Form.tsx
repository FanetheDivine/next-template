'use client'

import { Form as AntdForm, FormItemProps } from 'antd'
import { useForm as useAntdForm } from 'antd/es/form/Form'
import Item from 'antd/es/form/FormItem'
import { z } from 'zod'

/** 
 * 通过简单zod构造基于antd的表单
 * @example
 * const [Form, FormItem, useForm] = getZodForm(zodObj)
 */
export function getZodForm<
    ZodType extends z.ZodObject<{
        [key: string]: z.ZodFirstPartySchemaTypes
    }, any, any>
>(zod: ZodType) {
    type FormField = z.infer<ZodType>
    const Form = AntdForm<FormField>
    const AntdFormItem = Item<FormField>
    const FormItem =
        (props: FormItemProps<FormField> & { name?: string }) => {
            const field = props.name
            if (!field) {
                return <AntdFormItem {...props} />
            } else {
                const fieldZod = zod.shape[field]
                return (
                    <AntdFormItem {...props} required={!fieldZod.isOptional()}
                        rules={[{
                            validator: async (_, val) => {
                                const res = fieldZod.safeParse(val === '' ? undefined : val)
                                if (!res.success) {
                                    throw new Error(res.error.errors[0].message)
                                }
                            }
                        }]}
                    />
                )
            }
        }
    const useForm = useAntdForm<FormField>
    return [Form, FormItem, useForm] as const
}