import { z } from 'zod'

const AmenitySchema = z.array(z.string())

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
  // floorImage: z.string(),
})

export type TPropertyValidator = z.infer<typeof PropertyValidator>
