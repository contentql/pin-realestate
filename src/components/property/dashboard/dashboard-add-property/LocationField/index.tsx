import Map from './Map'
import SelectMulitField from './SelectMulitField'

const LocationField = ({ register }: any) => {
  return (
    <div className='form-style1'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Address
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Address'
              {...register('address')}
            />
          </div>
        </div>
        {/* End col-12 */}

        <SelectMulitField register={register} />

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>Zip</label>
            <input
              type='text'
              className='form-control'
              {...register('zipcode')}
            />
          </div>
        </div>
        {/* End col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Map location
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='map location'
              {...register('mapLocation')}
            />
          </div>
        </div>
        {/* End col-4 */}

        <div className='col-sm-12'>
          <div className='mb20 mt30'>
            <label className='heading-color ff-heading fw600 mb30'>
              Place the listing pin on the map
            </label>
            <Map />
          </div>
        </div>
        {/* End col-12 */}
      </div>
      {/* End .row */}

      <div className='row'>
        <div className='col-sm-6 col-xl-4'>
          <div className='mb30'>
            <label className='heading-color ff-heading fw600 mb10'>
              Latitude
            </label>
            <input
              type='text'
              className='form-control'
              {...register('latitude')}
            />
          </div>
        </div>
        {/* End .col-sm-6 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb30'>
            <label className='heading-color ff-heading fw600 mb10'>
              Longitude
            </label>
            <input
              type='text'
              className='form-control'
              {...register('longitude')}
            />
          </div>
        </div>
      </div>
      {/* End .row */}
    </div>
  )
}

export default LocationField
