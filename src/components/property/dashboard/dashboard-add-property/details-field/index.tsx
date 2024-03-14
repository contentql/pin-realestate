import StructureType from './StructureType'

const DetailsFiled = ({ register }: any) => {
  const materialOptions = [
    { value: 'Wood', label: 'Wood' },
    { value: 'Block', label: 'Block' },
    { value: 'Brick', label: 'Brick' },
    { value: 'Rock', label: 'Rock' },
  ]
  return (
    <div className='form-style1'>
      <div className='row'>
        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Size in sqft (only numbers)
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Homearea size'
              {...register('homearea')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Lot size in ft (only numbers)
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Lot area size'
              {...register('lotarea')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>Rooms</label>
            <input
              type='text'
              className='form-control'
              placeholder='Total rooms'
              {...register('rooms')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Bedrooms
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Total bedrooms'
              {...register('beds')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Bathrooms
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Total bathrooms'
              {...register('baths')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Garages
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Total no of garages'
              {...register('garages')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Garage size
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your Name'
              {...register('garagesSize')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Year built (numeric)
            </label>
            <input
              type='text'
              {...register('yearBuild')}
              className='form-control'
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Exterior Material
            </label>
            <div className='location-area'>
              <select className='form-control' {...register('material')}>
                {materialOptions.map((ele, id) => (
                  <option key={id} value={ele.value}>
                    {ele.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* End .col-4 */}

        <StructureType register={register} />
      </div>
      {/* End .row */}
    </div>
  )
}

export default DetailsFiled
