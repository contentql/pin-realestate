import { z } from 'zod'

export const TokenValidator = z.object({ id: z.string() })
export const PaginationValidator = z.object({
  pageNumber: z.number(),
  //   pageSize: z.number(),
})

export type TTokenValidator = z.infer<typeof TokenValidator>
