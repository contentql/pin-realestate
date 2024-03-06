import { Property, PropertyType } from '@/payload-types'

interface PropertyData extends Property {
  propertiesDetails: {
    title?: string | null
    Description?:
      | {
          [k: string]: unknown
        }[]
      | null
    propertyType?: {
      relationTo: 'propertyType'
      value: PropertyType
    } | null
    status?: ('For sale' | 'For rent')[] | null
    price?: number | null
  }
}

const PropertyDetails = ({ data }: { data: PropertyData }) => {
  const status =
    data?.propertiesDetails.status?.length == 0
      ? data?.propertiesDetails?.status[0]
      : data?.propertiesDetails?.status &&
        data?.propertiesDetails?.status.join(' and ')

  const columns = [
    [
      {
        label: 'Property ID',
        value: data?.id,
      },
      {
        label: 'Price',
        value: data?.propertiesDetails?.price,
      },
      {
        label: 'Property Size',
        value: data?.details?.details?.homearea,
      },
      {
        label: 'Bathrooms',
        value: data?.details?.details?.baths,
      },
      {
        label: 'Bedrooms',
        value: data?.details?.details?.beds,
      },
    ],
    [
      {
        label: 'Garage',
        value: data?.details?.details?.garages,
      },
      {
        label: 'Garage Size',
        value: 'static',
      },
      {
        label: 'Year Built',
        value: data?.details?.details?.yearBuild,
      },
      {
        label: 'Property Type',
        value: data?.propertiesDetails?.propertyType?.value?.type,
      },
      {
        label: 'Property Status',
        value: status,
      },
    ],
  ]

  console.log('Details: ', columns)

  return (
    <div className='row'>
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-4${
            columnIndex === 1 ? ' offset-xl-2' : ''
          }`}>
          {column.map((detail, index) => (
            <div key={index} className='d-flex justify-content-between'>
              <div className='pd-list'>
                <p className='fw600 mb10 mr20 ff-heading dark-color'>
                  {detail.label}
                </p>
              </div>
              <div className='pd-list'>
                <p className='text mb10'>{detail?.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default PropertyDetails
