import { ZodObject } from 'zod'

/** 从zod对象的类型得到生成对象的类型 */
export type ZodObjType<T> = T extends ZodObject<any, any, any, infer U, any> ? U : never