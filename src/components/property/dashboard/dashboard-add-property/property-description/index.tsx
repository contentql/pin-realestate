'use client'

const PropertyDescription = ({ register }: any) => {
  const catergoryOptions = [
    { value: 'apartment', label: 'Apartments' },
    { value: 'bungalow', label: 'Bungalow' },
    { value: 'office', label: 'Office' },
    { value: 'villa', label: 'Villa' },
  ]
  const listedIn = [
    { value: 'All Listing', label: 'All Listing' },
    { value: 'Active', label: 'Active' },
    { value: 'Sold', label: 'Sold' },
    { value: 'Processing', label: 'Processing' },
  ]
  const PropertyStatus = [
    { value: 'rent', label: 'For Rent' },
    { value: 'sale', label: 'For sale' },
  ]

  const customStyles = {
    option: (styles: any, { isFocused, isSelected, isHovered }: any) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? '#eb6753'
          : isHovered
            ? '#eb675312'
            : isFocused
              ? '#eb675312'
              : undefined,
      }
    },
  }

  return (
    <div className='form-style1'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>Title</label>
            <input
              type='text'
              className='form-control'
              placeholder='Name of Your Name'
              {...register('title')}
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className='col-sm-12'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Description
            </label>
            <textarea
              cols={30}
              rows={5}
              placeholder='There are many variations of passages.'
              defaultValue={''}
              {...register('description')}
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Property Type
            </label>
            <div className='location-area'>
              <select className='form-control' {...register('propertType')}>
                {catergoryOptions.map((ele, id) => (
                  <option key={id} value={ele.value}>
                    {ele.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        {/* <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Listed in
            </label>
            <div className='location-area'>
              <Select
                defaultValue={[listedIn[1]]}
                name='colors'
                options={listedIn}
                styles={customStyles}
                className='select-custom pl-0'
                classNamePrefix='select'
                required
                isMulti
              />
            </div>
          </div>
        </div> */}
        {/* End .col-6 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Property Sale Type
            </label>
            <div className='location-area'>
              <select
                className='form-control'
                {...register('propertySaleType')}>
                {PropertyStatus.map((ele, id) => (
                  <option key={id} value={ele.value}>
                    {ele.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb30'>
            <label className='heading-color ff-heading fw600 mb10'>
              Price in $
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your Name'
              {...register('price')}
            />
          </div>
        </div>
        {/* End .col-6 */}

        {/* <div className='col-sm-6 col-xl-4'>
          <div className='mb30'>
            <label className='heading-color ff-heading fw600 mb10'>
              Yearly Tax Rate
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your Name'
            />
          </div>
        </div> */}
        {/* End .col-6 */}

        {/* <div className='col-sm-6 col-xl-4'>
          <div className='mb30'>
            <label className='heading-color ff-heading fw600 mb10'>
              After Price Label
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your Name'
            />
          </div>
        </div> */}
        {/* End .col-6 */}
      </div>
    </div>
  )
}

export default PropertyDescription
