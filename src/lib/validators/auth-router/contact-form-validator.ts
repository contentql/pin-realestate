import { z } from 'zod';

export const ContactFormValidator = z.object({
  first_name: z.string(),
  last_name: z.string(),
  //email: z.string(),
  query: z.string(),
});

export type TContactFormValidator = z.infer<typeof ContactFormValidator>;
