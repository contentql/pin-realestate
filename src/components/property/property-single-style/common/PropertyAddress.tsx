import { Property } from '@/payload-types'

const PropertyAddress = ({ address }: { address: Property['_location'] }) => {
  console.log('PropertyAddress', address)
  const truncatedAddress =
    address?.address && address?.address.length > 50
      ? `${address?.address.substring(0, 50)}...`
      : address?.address

  return (
    <>
      <div className={`col-md-6 col-xl-8 offset-xl-0 `}>
        <div className='d-flex justify-content-between'>
          <div className='pd-list'>
            <p className='fw600 mb10 ff-heading dark-color'>Address</p>
            <p className='fw600 mb10 ff-heading dark-color'>City</p>
            <p className='fw600 mb-0 ff-heading dark-color'>State/county</p>
          </div>
          <div className='pd-list'>
            <p className='text mb10'>{truncatedAddress}</p>
            <p className='text mb10'>{address?.city}</p>
            <p className='text mb-0'>{address?.country}</p>
          </div>
        </div>
      </div>

      {/* End col */}

      <div className='col-md-12'>
        <iframe
          className='position-relative bdrs12 mt30 h250'
          loading='lazy'
          src={`https://maps.google.com/maps?q=${address?.address}&t=m&z=14&output=embed&iwloc=near`}
          title={address?.address}
          aria-label={address?.address}
        />
      </div>
      {/* End col */}
    </>
  )
}

export default PropertyAddress
