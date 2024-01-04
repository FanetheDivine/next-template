import { ZodObject } from 'zod'

export type ZodObjType<T> = T extends ZodObject<any, any, any, infer U, any> ? U : never