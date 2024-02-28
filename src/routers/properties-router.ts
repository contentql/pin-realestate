import { TRPCError } from '@trpc/server';

import { publicProcedure, router } from '../trpc/trpc';
import { getPayloadClient } from '../get-payload';
import { AuthCredentialsValidator } from '../lib/validators/auth-router/account-credentials-validator';
import { TokenValidator } from '../lib/validators/auth-router/token-validator';

export const propertiesRouter = router({
  getProperties: {
    list: publicProcedure.query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const payload = await getPayloadClient();

      const properties = await payload.find({ collection: 'properties' });
      //    ^?
      return properties;
    }),
  },
});
