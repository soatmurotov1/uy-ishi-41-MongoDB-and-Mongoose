import z, { string } from "zod"


export const addressValidation = z.object({
    name: string().min(2).
})