import { z } from 'zod'

export const WishlistPropertyValidator = z.object({
  id: z.string(),
})

export type TWishlistPropertyValidator = z.infer<
  typeof WishlistPropertyValidator
>
