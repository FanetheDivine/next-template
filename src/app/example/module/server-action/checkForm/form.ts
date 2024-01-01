import { z } from "zod"

export const FormField = z.object({
    email: z.string().email(),
    password:z.string().max(20)
})
export type FormField = ReturnType<typeof FormField.parse>