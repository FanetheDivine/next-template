import { z } from "zod"
import ZodObjType from "@/type/ZodObjType"

export const LoginField = z.object({
    email: z.string().email(),
    password:z.string().max(20)
})
export type LoginField = ZodObjType<typeof LoginField>