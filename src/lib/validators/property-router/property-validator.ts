import { z } from 'zod'

const AmenitySchema = z.array(z.string())

const Nearby_places = {
  name: z.string(),
  distance: z.number(),
  rating: z.number(),
}

export const PropertyValidator = z.object({
  City: z.string(),
  Country: z.string(),
  state: z.string(),
  address: z.string(),
  amenity: AmenitySchema,
  baths: z.string(),
  beds: z.string(),
  description: z.string(),
  garages: z.string(),
  garagesSize: z.string(),
  homearea: z.string(),
  label: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  lotarea: z.string(),
  mapLocation: z.string(),
  material: z.string(),
  price: z.string(),
  propertType: z.string(),
  propertyStatus: z.string(),
  rooms: z.string(),
  title: z.string(),
  yearBuild: z.string(),
  zipcode: z.string(),
  floorRooms: z.string(),
  floorBeds: z.string(),
  floorBaths: z.string(),
  floorPrice: z.string(),
  floorSize: z.string(),
  content: z.string(),
  ownerName: z.string(),
  ownerPhoneNumber: z.string(),
  ownerWhatsApp: z.string(),
  ownerEmail: z.string(),
  educations: z.array(
    z.object({
      name: z.string(),
      distance: z.string(),
    }),
  ),
  medicals: z.array(
    z.object({
      name: z.string(),
      distance: z.string(),
    }),
  ),
  transportations: z.array(
    z.object({
      name: z.string(),
      distance: z.string(),
    }),
  ),
  // floorImage: z.string(),
})

export type TPropertyValidator = z.infer<typeof PropertyValidator>
