import { z } from 'zod'

export const TokenValidator = z.object({ id: z.string() })
export const PaginationValidator = z.object({
  pageNumber: z.number(),
  statusFilter: z.string(),
  maxPriceLimit: z.number(),
  bedRooms: z.number(),
  bathrooms: z.number(),
  location: z.string(),
  //   pageSize: z.number(),
})

export type TTokenValidator = z.infer<typeof TokenValidator>
