import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Property',
  title: 'Property',
  description: 'An Realestate site built with Payload and Next.js.',
  images: [
    {
      url: 'https://pin-realestate-production.up.railway.app/images/apple-touch-icon-60x60.png',
    },
  ],
}

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
