const PropertyAddress = ({ address }: any) => {
  console.log('PropertyAddress', address);
  const truncatedAddress =
    address?.location?.address && address?.location?.address.length > 50
      ? `${address?.location?.address.substring(0, 50)}...`
      : address?.location?.address;

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
            <p className='text mb10'>{address?.location?.city}</p>
            <p className='text mb-0'>{address?.location?.country}</p>
          </div>
        </div>
      </div>

      {/* End col */}

      <div className='col-md-12'>
        <iframe
          className='position-relative bdrs12 mt30 h250'
          loading='lazy'
          src={`https://maps.google.com/maps?q=${address?.location?.address}&t=m&z=14&output=embed&iwloc=near`}
          title={address?.location?.address}
          aria-label={address?.location?.address}
        />
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
