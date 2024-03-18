import { useFieldArray, useForm } from 'react-hook-form'

const Floors = ({ register }: any) => {
  const { control } = useForm()

  const {
    fields: floorFields,
    append: appendFloor,
    remove: removeFloor,
  } = useFieldArray({
    control,
    name: 'floors',
  })

  return (
    <div className='form-style1'>
      {floorFields.map((field: any, index: number) => (
        <div key={field.id} className='row relative'>
          <div className='col-sm-6 col-xl-4'>
            <div className='mb20'>
              <label className='heading-color ff-heading fw600 mb10'>
                Rooms (only numbers)
              </label>
              <input
                type='number'
                className='form-control'
                placeholder='Rooms'
                {...register(`floors.${index}.floorRooms` as const)}
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
                {...register(`floors.${index}.floorBeds` as const)}
              />
            </div>
          </div>
          {/* End .col-4 */}

          <div className='col-sm-6 col-xl-4'>
            <div className='mb20'>
              <label className='heading-color ff-heading fw600 mb10'>
                Baths
              </label>
              <input
                type='number'
                className='form-control'
                placeholder='Total Bathrooms'
                {...register(`floors.${index}.floorBaths` as const)}
              />
            </div>
          </div>
          {/* End .col-4 */}

          <div className='col-sm-6 col-xl-4'>
            <div className='mb20'>
              <label className='heading-color ff-heading fw600 mb10'>
                Price
              </label>
              <input
                type='number'
                className='form-control'
                placeholder='Price'
                {...register(`floors.${index}.floorPrice` as const)}
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
                {...register(`floors.${index}.floorSize` as const)}
              />
            </div>
          </div>
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
                {...register(`floors.${index}.floorDescription` as const)}
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
                {...register(`floors.${index}.floorImage` as const)}
              />
            </div>
          </div>
          {/* End .col-4 */}
          <div className='col-sm-4 col-xl-5 right-corner mb10'>
            <button
              type='button'
              className='custom-btn btn-thm3 btn-dark '
              onClick={() => removeFloor(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type='button'
        className='custom-btn btn-thm3 btn-dark mb10'
        onClick={() =>
          appendFloor({
            floorDescription: '',
            floorSize: '',
            floorPrice: '',
            floorBaths: '',
            floorBeds: '',
            floorRooms: '',
            imageSrc: '',
          })
        }
      >
        Add Floor
      </button>
      {/* End .row */}
    </div>
  )
}

export default Floors
