import { Property } from '@/payload-types'

const PropertyDetails = ({ data }: { data: Property }) => {
  const status =
    data?._propertyDetails.saleType?.length == 0
      ? data?._propertyDetails.saleType[0]
      : data?._propertyDetails.saleType &&
        data?._propertyDetails.saleType.join(' and ')

  const columns = [
    [
      {
        label: 'Property ID',
        value: data?.id,
      },
      {
        label: 'Price',
        value: data?._propertyDetails?.price,
      },
      {
        label: 'Property Size',
        value: data?._details?.homearea + ' sqft',
      },
      {
        label: 'Bathrooms',
        value: data?._details?.bathrooms,
      },
      {
        label: 'Bedrooms',
        value: data?._details?.bedrooms,
      },
    ],
    [
      {
        label: 'Garage',
        value: data?._details?.garages,
      },
      {
        label: 'Garage Size',
        value: data?._details?.garagesSize + ' sqft',
      },
      {
        label: 'Year Built',
        value: data?._details?.yearBuild,
      },
      {
        label: 'Property Type',
        value: data?._propertyDetails?.type,
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
