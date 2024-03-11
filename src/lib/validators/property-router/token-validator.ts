import { z } from 'zod'

export const TokenValidator = z.object({ id: z.string() })

export type TTokenValidator = z.infer<typeof TokenValidator>
