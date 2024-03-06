import { z } from 'zod'

export const LoginCredentialsValidator = z.object({
  email: z.string().email('not a valid email'),
  password: z.string(),
})

export type TLoginCredentialsValidator = z.infer<
  typeof LoginCredentialsValidator
>
