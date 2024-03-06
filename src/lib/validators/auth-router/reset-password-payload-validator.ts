import { z } from 'zod'

export const ResetPasswordPayloadValidator = z.object({
  password: z
    .string()
    .regex(
      new RegExp('.*[A-Z].*'),
      'Must contain at least one uppercase character',
    )
    .regex(
      new RegExp('.*[a-z].*'),
      'Must contain at least  one lowercase character',
    )
    .regex(new RegExp('.*\\d.*'), 'Must contain at least one number')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'Must contain at least one special character',
    )
    .min(8, 'Must be at least 8 characters in length'),
  token: z.string(),
})
export type TResetPasswordPayloadValidator = z.infer<
  typeof ResetPasswordPayloadValidator
>
