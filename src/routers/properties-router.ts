import { Details, Property } from '@/payload-types'
import { getPayloadClient } from '../get-payload'
import {
  TokenValidator,
  PaginationValidator,
} from '../lib/validators/property-router/token-validator'
//import { PropertyByIdValidator } from '../lib/validators/property-router/property-id-validator';
import { PropertyValidator } from '../lib/validators/property-router/property-validator'
import { publicProcedure, router, userProcedure } from '../trpc/trpc'

type Status = 'For Sale' | 'For Rent'

export const propertiesRouter = router({
  getProperties: {
    list: publicProcedure
      .input(PaginationValidator)
      .query(async ({ input }) => {
        const {
          pageNumber,
          statusFilter,
          maxPriceLimit,
          bedRooms,
          bathrooms,
          location,
        } = input
        console.log('location', location)
        // Retrieve users from a datasource, this is an imaginary database
        const payload = await getPayloadClient()

        const properties = await payload.find({
          collection: 'properties',
          page: pageNumber,
          limit: 2,
          where: {
            'propertiesDetails.status': {
              contains: statusFilter === 'All' ? '' : statusFilter,
            },
            and: [
              {
                'propertiesDetails.price': {
                  less_than: maxPriceLimit,
                },
                'details.details.baths': {
                  greater_than_equal: bathrooms,
                },
                'details.details.beds': {
                  greater_than_equal: bedRooms,
                },
                // 'location.location': {
                //   contains: location === 'All Cities' ? '' : location,
                // },
              },
            ],
          },
        })

        //   console.log('total', total)
        //   const firstPageKeys = [{ name: 'title' }];
        const totalProperties = properties.totalDocs
        const newProperties = properties.docs.map(
          ({
            id,
            propertiesDetails,
            location,
            details,
            amenities,
            media,
            floors,
          }: Property) => {
            return {
              id,
              propertiesDetails,
              location: location.location,
              details: details.details,
              amenities: amenities.amenities,
              media: media.propertyImages?.at(0)?.image,
              floor: floors.floors?.at(0),
            }
          },
        )

        return {
          newProperties: newProperties,
          totalProperties: totalProperties,
        }
      }),
  },

  getPropertiesForMyPropertiesPage: {
    list: publicProcedure.query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const payload = await getPayloadClient()

      const properties = await payload.find({
        collection: 'properties',
        depth: 10,
      })
      const propertyData = properties?.docs?.map(ele => {
        return {
          id: ele?.id,
          title: ele?.propertiesDetails?.title,
          imageSrc: ele?.floors?.floors?.at(0)?.imageSrc,
          location: ele?.location?.location?.address,
          price: ele?.propertiesDetails?.price,
          datePublished: ele?.createdAt,
          status: ele?.propertiesDetails?.status,
        }
      })
      //const firstPageKeys = [{ name: 'title' }];
      console.log('all properties', properties.docs.at(0)?.floors.floors)
      return propertyData
    }),
  },
  byPropertyId: publicProcedure
    .input(TokenValidator)
    .query(async ({ input }) => {
      const payload = await getPayloadClient()
      const { id } = input

      const propertyById = await payload.findByID({
        collection: 'properties',
        id: id,
      })

      return propertyById
    }),
  //function for deleting a property
  deletePropertyId: userProcedure
    .input(TokenValidator)
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient()
      const { id } = input

      const propertyById = await payload.delete({
        collection: 'properties',
        where: {
          id: {
            equals: id,
          },
        },
      })

      return propertyById
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
          owner: {
            userDetails: {
              userName: input.ownerName,
              phoneNumber: input.ownerPhoneNumber,
              whatsAppNumber: input.ownerWhatsApp,
              userEmail: input.ownerEmail,
            },
          },
          floors: { floors: input.floors as any },
          media: {},

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
