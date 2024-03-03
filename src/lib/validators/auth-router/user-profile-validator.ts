import { z } from 'zod';

export const UserProfileValidator = z.object({
  user_name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  position: z.string(),
  language: z.string(),
  company: z.string(),
  tax_number: z.string(),
  address: z.string(),
  about: z.string(),
});

export type TUserProfileValidator = z.infer<typeof UserProfileValidator>;
