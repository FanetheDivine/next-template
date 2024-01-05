import { z } from "zod"

export const LoginField = z.object({
    email: z.string().email(),
    password: z.string().max(20)
})
export type LoginField = z.infer<typeof LoginField>