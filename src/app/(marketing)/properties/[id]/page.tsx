import { getPayloadClient } from '@/get-payload'
import { Property } from '@/payload-types'
import { generateMeta } from '@/utilis/generate-meta'
import PropertyById from '@/views/SinglePropertyView'
import { Metadata } from 'next'

function SingleProperty({ params }: any) {
  return <PropertyById params={params} />
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()

  const allProperties = await payload.find({
    collection: 'properties',
    pagination: false,
  })

  const propertyIdsArray = allProperties.docs.map(property => ({
    propertyId: property.id,
  }))

  return propertyIdsArray
}

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> => {
  let property: Property | null = null

  const payload = await getPayloadClient()

  try {
    const result = await payload.findByID({
      collection: 'properties',
      id,
    })

    property = result as Property
  } catch (error) {
    console.error('Error fetching property:', error)
  }

  return generateMeta({ doc: property as Property })
}

export default SingleProperty
