import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'
import Contact from './collections/Contact'
import { Media } from './collections/Media'
import Properties from './collections/Properties'
import PropertyType from './collections/PropertyType'
import Tags from './collections/Tags'
import Users from './collections/Users'
import { s3StorageAdapter } from './plugins/s3'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL!,
  collections: [Users, Media, Properties, Tags, Contact, PropertyType],
  routes: {
    admin: '/admin',
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config: any) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        util: false,
        os: false,
      }
      return config
    },
    meta: {
      titleSuffix: '- ContentQL',
    },
  },
  rateLimit: {
    max: 2000, // only for development
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: s3StorageAdapter,
        },
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
})
