import { z } from "zod";

export const LoginField = z.object({
    csrfToken:z.string().optional(),
    email:z.string().email(),
    passwd:z.string().max(20)
})

export type LoginField = z.infer<typeof LoginField>