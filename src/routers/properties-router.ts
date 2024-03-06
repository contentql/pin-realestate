import { Property } from '@/payload-types'
import { getPayloadClient } from '../get-payload'
import { TokenValidator } from '../lib/validators/property-router/token-validator'
//import { PropertyByIdValidator } from '../lib/validators/property-router/property-id-validator';
import { publicProcedure, router } from '../trpc/trpc'

export const propertiesRouter = router({
  getProperties: {
    list: publicProcedure.query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const payload = await getPayloadClient()

      const properties = await payload.find({ collection: 'properties' })
      //   const firstPageKeys = [{ name: 'title' }];
      const newProperties = properties.docs.map(
        ({
          id,
          propertiesDetails,
          location,
          details,
          amenities,
          floors,
        }: Property) => {
          return {
            id,
            propertiesDetails,
            location: location.location,
            details: details.details,
            amenities: amenities.amenities,
            floors: floors?.floors,
          }
        },
      )
      // const newProperties = properties.docs.map(
      //   ({
      //     id
      //     title,
      //     location,
      //     city,
      //     bed,
      //     bath,
      //     forRent,
      //     sqft,
      //     propertyType,
      //     price,
      //     featured,
      //     tags,
      //     features,
      //     updatedAt,
      //     createdAt,
      //   }) => {
      //     return {
      //       id: id,
      //       title: title,
      //       location: location,
      //       city: city,
      //       bed: bed,
      //       bath: bath,
      //       forRent: forRent,
      //       sqft: sqft,
      //       propertyType: propertyType,
      //       price: price,
      //       featured: featured,
      //       tags: tags,
      //       features: features,
      //       updatedAt: updatedAt,
      //       createdAt: createdAt,
      //     };
      //   }
      // );

      //    ^?
      return newProperties
    }),
  },
  byPropertyId: publicProcedure
    .input(TokenValidator)
    .query(async ({ input }) => {
      const payload = await getPayloadClient()
      const { token } = input

      const propertyById = await payload.find({
        collection: 'properties',
        where: {
          id: {
            equals: token,
          },
        },
      })

      return propertyById?.docs[0]
    }),
})
