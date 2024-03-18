import type { Metadata } from 'next'

import type { Property } from '../payload-types'
import { mergeOpenGraph } from './merge-open-graph'

export const generateMeta = async (args: {
  doc: Property
}): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    doc.meta.image.url

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/'properties'/${doc?.id}`

  return {
    title: doc?.meta?.title || 'Property',
    description: doc?.meta?.description || 'Property - Description',
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title!,
      description: doc?.meta?.description!,
      url,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}
