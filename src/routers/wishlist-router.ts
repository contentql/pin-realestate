import { getPayloadClient } from '../get-payload'
import { TokenValidator } from '../lib/validators/property-router/token-validator'
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
      depth: 5,
    })

    return propertyById.docs
  }),
  deleteWishlistPropertyId: userProcedure
    .input(TokenValidator)
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient()
      const { id } = input

      const propertyById = await payload.delete({
        collection: 'wishlist',
        where: {
          'wishlistProperties.value': {
            equals: id,
          },
        },
      })

      return propertyById
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
          wishlistProperties: { relationTo: 'properties', value: id },
        },
      })

      return newProperty
    }),
})
