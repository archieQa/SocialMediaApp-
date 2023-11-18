import * as z from "zod"


export const SignupValidation = z.object({
    username: z.string().min(2, {message: 'Too short'}).max(50),
    name:z.string().min(2, { message: 'Too short'}),
    email:z.string().email(),
    password:z.string().min(8, { message: 'Too short'}),

  })