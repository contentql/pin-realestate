import { authRouter } from '../routers/auth-router'
import { ContactRouter } from '../routers/contact-router'
import { propertiesRouter } from '../routers/properties-router'
import { router, userProcedure } from './trpc'

export const appRouter = router({
  anyApiRoute: userProcedure.query(() => {
    return { name: 'akhil' }
  }),

  auth: authRouter,
  properties: propertiesRouter,
  contact: ContactRouter,
})

export type AppRouter = typeof appRouter
