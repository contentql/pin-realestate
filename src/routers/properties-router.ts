import { TRPCError } from '@trpc/server';

import { publicProcedure, router } from '../trpc/trpc';
import { getPayloadClient } from '../get-payload';
import { AuthCredentialsValidator } from '../lib/validators/auth-router/account-credentials-validator';
import { TokenValidator } from '../lib/validators/auth-router/token-validator';
import { PropertyByIdValidator } from '../lib/validators/property-router/property-id-validator';

export const propertiesRouter = router({
  getProperties: {
    list: publicProcedure.query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const payload = await getPayloadClient();

      const properties = await payload.find({ collection: 'properties' });
      //   const firstPageKeys = [{ name: 'title' }];
      const newProperties = properties.docs.map(
        ({
          id,
          title,
          location,
          city,
          bed,
          bath,
          forRent,
          sqft,
          propertyType,
          price,
          featured,
          tags,
          features,
          updatedAt,
          createdAt,
        }) => {
          return {
            id: id,
            title: title,
            location: location,
            city: city,
            bed: bed,
            bath: bath,
            forRent: forRent,
            sqft: sqft,
            propertyType: propertyType,
            price: price,
            featured: featured,
            tags: tags,
            features: features,
            updatedAt: updatedAt,
            createdAt: createdAt,
          };
        }
      );

      //    ^?
      return newProperties;
    }),
  },
  byPropertyId: publicProcedure
    .input(PropertyByIdValidator)
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const propertyById = await payload.find({
        collection: 'properties',
        where: {
          id: {
            equals: input?.id,
          },
        },
      });

      return propertyById;
    }),
});
