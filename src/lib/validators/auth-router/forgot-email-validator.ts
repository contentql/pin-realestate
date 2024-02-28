import { z } from 'zod';

export const ForgotEmailValidator = z.object({
  email: z.string().email('not a valid email'),
});

export type TForgotEmailValidator = z.infer<typeof ForgotEmailValidator>;
