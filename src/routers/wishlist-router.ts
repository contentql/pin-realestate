import { getPayloadClient } from '../get-payload'
//import { PropertyByIdValidator } from '../lib/validators/property-router/property-id-validator';
import { WishlistPropertyValidator } from '../lib/validators/wishlist-router/wishlist-validator'
import { router, userProcedure } from '../trpc/trpc'

export const wishlistRouter = router({
  getWishlistProperty: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx
    const payload = await getPayloadClient()

    const propertyById = await payload.find({
      collection: 'wishlist',
      user,
      overrideAccess: false,
      depth: 10,
    })

    return { docs: propertyById.docs, totalDocs: propertyById.totalDocs }
  }),
  deleteWishlistPropertyId: userProcedure
    .input(WishlistPropertyValidator)
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient()
      const { id, updatedData, wishlistId } = input

      const propertyById = await payload.update({
        collection: 'wishlist',
        id: wishlistId,
        data: {
          user: { relationTo: 'users', value: ctx.user?.id },
          wishlistProperties: updatedData,
        },
      })

      return id
    }),

  // Function for adding property
  wishlistAddProperty: userProcedure
    .input(WishlistPropertyValidator)
    .mutation(async ({ input, ctx }) => {
      const { id } = input
      const payload = await getPayloadClient()

      const { user } = ctx

      const newProperty = await payload.create({
        user: user,
        collection: 'wishlist',
        data: {
          user: { relationTo: 'users', value: user?.id },
          wishlistProperties: [{ relationTo: 'properties', value: id }],
        },
      })

      return newProperty
    }),

  wishlistUpdateProperty: userProcedure
    .input(WishlistPropertyValidator)
    .mutation(async ({ input, ctx }) => {
      const { id, wishlistId } = input
      const payload = await getPayloadClient()

      // Fetch existing wishlist to preserve other properties
      const existingWishlist = await payload.findByID({
        collection: 'wishlist',
        id: wishlistId,
      })

      // Extract existing wishlist properties and format them
      const existingProperties =
        existingWishlist?.wishlistProperties?.map((ele: any) => ({
          relationTo: 'properties',
          value: ele.value.id as string,
        })) || []

      // Add the new property to the existing properties
      const updatedProperties = [
        ...existingProperties,
        { relationTo: 'properties', value: id },
      ]

      // Update the wishlist with the merged list of properties
      const updatedWishlist = await payload.update({
        user: ctx.user,
        collection: 'wishlist',
        id: wishlistId,
        data: {
          user: { relationTo: 'users', value: ctx.user?.id },
          wishlistProperties: updatedProperties as any,
        },
      })

      return updatedWishlist
    }),
})
