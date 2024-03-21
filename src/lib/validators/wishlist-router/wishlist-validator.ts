import { z } from 'zod'

export const WishlistPropertyValidator = z.object({
  id: z.string(),
  wishlistId: z.any(),
  updatedData: z.any(),
})

export type TWishlistPropertyValidator = z.infer<
  typeof WishlistPropertyValidator
>
