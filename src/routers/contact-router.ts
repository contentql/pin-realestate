import { getPayloadClient } from '../get-payload';
import { ContactFormValidator } from '../lib/validators/auth-router/contact-form-validator';
import { router, userProcedure } from '../trpc/trpc';

export const ContactRouter = router({
  createNewContact: userProcedure
    .input(ContactFormValidator)
    .mutation(async ({ ctx, input }) => {
      const { first_name, last_name, query } = input;
      const { user } = ctx;
      const payload = await getPayloadClient();

      await payload.create({
        collection: 'contact',
        data: {
          email: user?.email,
          first_name: first_name,
          last_name: last_name,
          query: query,
        },
      });

      return { succuss: true };
    }),
});
