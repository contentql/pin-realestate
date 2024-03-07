import { Details, Property } from '@/payload-types'
import { getPayloadClient } from '../get-payload'
import { TokenValidator } from '../lib/validators/property-router/token-validator'
//import { PropertyByIdValidator } from '../lib/validators/property-router/property-id-validator';
import { PropertyValidator } from '../lib/validators/property-router/property-validator'
import { publicProcedure, router, userProcedure } from '../trpc/trpc'

type Status = 'For Sale' | 'For Rent'

export const propertiesRouter = router({
  getProperties: {
    list: publicProcedure.query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const payload = await getPayloadClient()

      const properties = await payload.find({ collection: 'properties' })
      //   const firstPageKeys = [{ name: 'title' }];
      const newProperties = properties.docs.map(
        ({ id, propertiesDetails, location, details, amenities }: Property) => {
          return {
            id,
            propertiesDetails,
            location: location.location,
            details: details.details,
            amenities: amenities.amenities,
          }
        },
      )
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
  // Function for adding property
  addProperty: userProcedure
    .input(PropertyValidator)
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient()

      const newProperty = await payload.create({
        collection: 'properties',
        data: {
          propertiesDetails: {
            title: input.title,
            description: input.description,
            price: Number(input.price),
            propertyType: 'For rent',
            status: ['For rent'],
          },
          Nearby_places: {
            education: { education: input.educations },
            medical: { medical: input.medicals },
            transportation: { transportation: input.transportations },
          },
          amenities: { amenities: input.amenity as any },
          details: {
            details: {
              baths: Number(input.baths),
              beds: Number(input.beds),
              garages: Number(input.garages),
              garagesSize: Number(input.garagesSize),
              homearea: Number(input.homearea),
              lotarea: Number(input.lotarea),
              material: input.material as Details['material'],
              rooms: Number(input.rooms),
              yearBuild: Number(input.yearBuild),
              label: input.label as Details['label'],
            },
          },
          floors: {
            floors: [
              {
                baths: Number(input.floorBaths),
                bedrooms: Number(input.floorBeds),
                rooms: Number(input.floorRooms),
                content: 'This is floor content',
                price: Number(input.floorPrice),
                size: Number(input.floorSize),
              },
            ],
          },
          location: {
            location: {
              address: input.address,
              city: input.City,
              state: input.state,
              country: input.Country,
              zipcode: input.zipcode,
              maplocation: input.mapLocation,
              locationPoints: [
                Number(input.longitude),
                Number(input.latitude),
              ] as [number, number],
            },
          },
        },
        overrideAccess: true,
      })

      return newProperty
    }),
})
