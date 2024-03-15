import {
  GenerateDescription,
  GenerateImage,
  GenerateTitle,
  GenerateURL,
} from '@payloadcms/plugin-seo/dist/types'

export const generateTitle: GenerateTitle = (data: any) => {
  const title = `${data?.doc['_propertyDetails.title']?.value || ''}`

  return title
}

export const generateDescription: GenerateDescription = (data: any) => {
  const description = `${data?.doc['_propertyDetails.description']?.value || ''}`

  return description
}

export const generateImage: GenerateImage = (data: any) => {
  const image = `${data?.doc['_assets.allMedia.0.asset']?.value || ''}`

  return image
}

export const generateURL: GenerateURL = (data: any) => {
  const url = `https://pin-realestate-production.up.railway.app/${data?.locale ? data?.locale + '/' : ''}${data?.slug || ''}/${data?.id || ''}`

  return url
}
