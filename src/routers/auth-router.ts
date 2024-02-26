import { TRPCError } from '@trpc/server';

import { getPayloadClient } from '../get-payload';
import { AuthCredentialsValidator } from '../lib/validators/auth-router/account-credentials-validator';
import { ForgotEmailValidator } from '../lib/validators/auth-router/forgot-email-validator';
import { ResetPasswordPayloadValidator } from '../lib/validators/auth-router/reset-password-payload-validator';
import { TokenValidator } from '../lib/validators/auth-router/token-validator';
import { publicProcedure, router } from '../trpc/trpc';

export const authRouter = router({
  createUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password, username } = input;

      const payload = await getPayloadClient();

      const { totalDocs: userExisted } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (!!userExisted) {
        throw new TRPCError({
          code: 'CONFLICT',
        });
      }

      const { id, email: newUserEmail } = await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          user_name: username,
        },
      });

      return { succuss: true, sentEmailTo: newUserEmail };
    }),

  verifyEmail: publicProcedure
    .input(TokenValidator)
    .query(async ({ input }) => {
      const { token } = input;

      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      });

      if (!isVerified) throw new TRPCError({ code: 'UNAUTHORIZED' });

      return { success: true };
    }),

  forgotPassword: publicProcedure
    .input(ForgotEmailValidator)
    .mutation(async ({ input }) => {
      const { email } = input;

      const payload = await getPayloadClient();

      const { totalDocs: userExisted } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (!userExisted) {
        throw new TRPCError({
          code: 'CONFLICT',
        });
      }

      const result = await payload.forgotPassword({
        collection: 'users',
        data: { email },
      });

      if (!result) throw new TRPCError({ code: 'UNAUTHORIZED' });

      return { success: true };
    }),

  resetPassword: publicProcedure
    .input(ResetPasswordPayloadValidator)
    .mutation(async ({ input }) => {
      const { password, token } = input;

      const payload = await getPayloadClient();

      const result = await payload.resetPassword({
        collection: 'users',
        data: { token, password },
        overrideAccess: true,
      });

      if (!result) throw new TRPCError({ code: 'UNAUTHORIZED' });

      return { success: true };
    }),

  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;

      const payload = await getPayloadClient();

      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        });

        return { success: true };
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
    }),
});
