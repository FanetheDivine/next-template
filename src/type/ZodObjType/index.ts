import { ZodObject } from 'zod'

type ZodObjType<T> = T extends ZodObject<any, any, any, infer U, any> ? U : never

export default ZodObjType