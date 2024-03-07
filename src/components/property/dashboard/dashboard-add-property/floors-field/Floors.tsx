const Floors = ({ register }: any) => {
  return (
    <div className='form-style1'>
      <div className='row'>
        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Rooms (only numbers)
            </label>
            <input
              type='number'
              className='form-control'
              placeholder='Rooms'
              {...register('floorRooms')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Beds (only numbers)
            </label>
            <input
              type='number'
              className='form-control'
              placeholder='Beds'
              {...register('floorBeds')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>Baths</label>
            <input
              type='number'
              className='form-control'
              placeholder='Total Bathrooms'
              {...register('floorBaths')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>Price</label>
            <input
              type='number'
              className='form-control'
              placeholder='Price'
              {...register('floorPrice')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Size in sqft
            </label>
            <input
              type='number'
              className='form-control'
              placeholder='Size in sqft'
              {...register('floorSize')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        {/* <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Custom ID (text)
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your Name'
            />
          </div>
        </div> */}
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Textarea
            </label>
            <textarea
              type='text'
              className='form-control'
              placeholder='Add additional details about property'
              {...register('content')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Upload floor image
            </label>
            <input
              type='file'
              className='form-control'
              placeholder='Floor image'
              //  {...register('floorImage')}
            />
          </div>
        </div>
        {/* End .col-4 */}

        {/* <div className='col-sm-6 col-xl-4'>
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
        </div> */}
        {/* End .col-4 */}

        {/* End .col-4 */}

        {/* <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Basement
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your Name'
            />
          </div>
        </div> */}
        {/* End .col-4 */}

        {/* <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Extra details
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your Name'
            />
          </div>
        </div> */}
        {/* End .col-4 */}

        {/* <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Roofing
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your Name'
            />
          </div>
        </div> */}
        {/* End .col-4 */}

        {/* <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Exterior Material
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Material type'
              {...register('material')}
            />
          </div>
        </div> */}
        {/* End .col-4 */}
      </div>
      {/* End .row */}

      {/* <div className='row'>
        <MultiSelectField />

        <div className='col-sm-12'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Owner/ Agent nots (not visible on front end)
            </label>
            <textarea
              cols={30}
              rows={5}
              placeholder='There are many variations of passages.'
              defaultValue={''}
            />
          </div>
        </div> 
      </div> */}
    </div>
  )
}

export default Floors
