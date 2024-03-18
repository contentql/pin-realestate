import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import seoPlugin from '@payloadcms/plugin-seo'
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
import Icon from './components/payload-icons/Icon'
import Logo from './components/payload-icons/Logo'
import { s3StorageAdapter } from './plugins/s3'
import {
  generateDescription,
  generateImage,
  generateTitle,
  generateURL,
} from './utilis/seo'

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
    css: path.resolve(__dirname, 'themes/cql/index.scss'),
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
      favicon: '/images/apple-touch-icon-60x60.png',
      ogImage: '/images/apple-touch-icon-60x60.png',
    },
    components: {
      graphics: {
        Logo: Logo,
        Icon: Icon,
      },
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
    seoPlugin({
      collections: ['properties'],
      uploadsCollection: 'media',
      generateTitle: generateTitle,
      generateDescription: generateDescription,
      generateImage: generateImage,
      generateURL: generateURL,
      tabbedUI: true,
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
})
