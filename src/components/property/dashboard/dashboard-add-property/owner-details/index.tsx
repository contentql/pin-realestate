const OwnerFeilds = ({ register }: any) => {
  return (
    <div className='form-style1'>
      <div className='row'>
        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Full name
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Homearea size'
              {...register('ownerName')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Phone number (only numbers)
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Lot area size'
              {...register('ownerPhoneNumber')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Whats app
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Total rooms'
              {...register('ownerWhatsApp')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>Email</label>
            <input
              type='text'
              className='form-control'
              placeholder='Email'
              {...register('ownerEmail')}
            />
          </div>
        </div>
        {/* End .col-4 */}
      </div>
    </div>
  )
}

export default OwnerFeilds
