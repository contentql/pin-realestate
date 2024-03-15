import { TRPCError } from '@trpc/server'

import { Media } from '@/payload-types'
import { getPayloadClient } from '../get-payload'
import { AuthCredentialsValidator } from '../lib/validators/auth-router/account-credentials-validator'
import { ForgotEmailValidator } from '../lib/validators/auth-router/forgot-email-validator'
import { LoginCredentialsValidator } from '../lib/validators/auth-router/login-credentials-validator'
import { ResetPasswordValidator } from '../lib/validators/auth-router/reset-password-validator'
import { TokenValidator } from '../lib/validators/auth-router/token-validator'
import { UserProfileValidator } from '../lib/validators/auth-router/user-profile-validator'
import { publicProcedure, router, userProcedure } from '../trpc/trpc'

export const authRouter = router({
  // function for creating a user or signup
  createUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password, username } = input

      const payload = await getPayloadClient()

      const { totalDocs: userExisted } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      if (!!userExisted) {
        throw new TRPCError({
          code: 'CONFLICT',
        })
      }

      const { id, email: newUserEmail } = await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          user_name: username,
        },
      })

      return { succuss: true, sentEmailTo: newUserEmail }
    }),
  //function for updating the user profile except email and password fields
  updateUserData: userProcedure
    .input(UserProfileValidator)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx
      const {
        user_name,
        first_name,
        last_name,
        company,
        language,
        phone_number,
        tax_number,
        position,
        address,
        about,
        profile_pic,
      } = input

      const payload = await getPayloadClient()

      try {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            email: user.email,
            user_name: user_name,
            first_name: first_name,
            last_name: last_name,
            company: company,
            language: language,
            phone_number: phone_number,
            tax_number: tax_number,
            position: position,
            address: address,
            about: about,
            profile_pic: profile_pic
              ? profile_pic
              : (user.profile_pic as Media).id,
          },
        })

        // await payload.delete({
        //   collection: 'media',
        //   id: (ctx.user.profile_pic as Media).id,
        // })

        return { succuss: true }
      } catch (err) {
        console.error(err)
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),

  //function for verifying the user after signUp
  verifyEmail: publicProcedure
    .input(TokenValidator)
    .query(async ({ input }) => {
      const { token } = input

      const payload = await getPayloadClient()

      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      })

      if (!isVerified) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return { success: true }
    }),

  //function for forgot password which triggers email
  forgotPassword: publicProcedure
    .input(ForgotEmailValidator)
    .mutation(async ({ input }) => {
      const { email } = input

      const payload = await getPayloadClient()

      const { totalDocs: userExisted } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })
      if (!userExisted) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        })
      }

      const result = await payload.forgotPassword({
        collection: 'users',
        data: { email },
      })

      if (!result) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return { success: true }
    }),

  //function for reset password
  resetPassword: publicProcedure
    .input(ResetPasswordValidator)
    .mutation(async ({ input }) => {
      const { password, token, confirmPassword } = input

      const payload = await getPayloadClient()

      const result = await payload.resetPassword({
        collection: 'users',
        data: { token, password },
        overrideAccess: true,
      })

      if (!result) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return { success: true }
    }),

  //function for signIn
  signIn: publicProcedure
    .input(LoginCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input
      const { res } = ctx

      const payload = await getPayloadClient()

      const { totalDocs: userExisted } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })
      if (!userExisted) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        })
      }

      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        })

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),
})
