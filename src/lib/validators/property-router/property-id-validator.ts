import { z } from 'zod';

export const PropertyByIdValidator = z
  .object({
    id: z.string().nullish(),
  })
  .nullish();

export type TPropertyByIdValidator = z.infer<typeof PropertyByIdValidator>;
