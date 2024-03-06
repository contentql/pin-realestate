import { CollectionConfig } from 'payload/types'
import { PrimaryActionResetPasswordEmailHtml } from '../../email-templates/forgotPassword'
import { PrimaryActionWelcomeEmailHtml } from '../../email-templates/welcome'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    cookies: {
      secure: true,
      sameSite: 'strict',
    },
    verify: {
      generateEmailHTML: ({ token, user }) => {
        const frontendUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`
        return PrimaryActionWelcomeEmailHtml({ verificationLink: frontendUrl })
      },
    },
    forgotPassword: {
      generateEmailHTML: ({ token, user }: any) => {
        const frontendUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`
        return PrimaryActionResetPasswordEmailHtml({
          resetPasswordLink: frontendUrl,
          userFirstname: user.user_name,
        })
      },
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'user_name',
      type: 'text',
      label: 'User Name',
    },
    {
      name: 'roles',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Seller', value: 'seller' },
      ],
      defaultValue: ['user'],
      hasMany: true,
      saveToJWT: true,
    },
    {
      name: 'phone_number',
      type: 'text',
      label: 'Phone Number',
      unique: true,
    },
    {
      name: 'first_name',
      type: 'text',
      label: 'first Name',
    },
    {
      name: 'last_name',
      type: 'text',
      label: 'last Name',
    },
    {
      name: 'position',
      type: 'text',
      label: 'position',
    },
    {
      name: 'language',
      type: 'text',
      label: 'language',
    },
    {
      name: 'company',
      type: 'text',
      label: 'company',
    },
    {
      name: 'tax_number',
      type: 'text',
      label: 'tax number',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'address',
    },
    {
      name: 'about',
      type: 'textarea',
      label: 'About',
    },
    {
      name: 'profile_pic',
      type: 'upload',
      label: 'Profile picture',
      relationTo: 'media',
    },
  ],
}

export default Users
