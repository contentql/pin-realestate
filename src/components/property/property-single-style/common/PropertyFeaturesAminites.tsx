const PropertyFeaturesAminites = ({ featuresAmenitiesData }: any) => {
  const result = Array.from(
    {
      length: Math.ceil(featuresAmenitiesData?.length / 4),
    },
    (_, index) => featuresAmenitiesData?.slice(index * 4, (index + 1) * 4),
  )

  return (
    <>
      {result?.map((row: any, rowIndex: any) => (
        <div key={rowIndex} className='col-sm-6 col-md-4'>
          <div className='pd-list'>
            {row?.map((item: any, index: any) => (
              <p key={index} className='text mb10'>
                <i className='fas fa-circle fz6 align-middle pe-2' />
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default PropertyFeaturesAminites
