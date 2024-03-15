'use client'

const customStyles = {
  option: (styles: any, { isFocused, isSelected, isHovered }: any) => ({
    ...styles,
    backgroundColor: isSelected
      ? '#eb6753'
      : isHovered
        ? '#eb675312'
        : isFocused
          ? '#eb675312'
          : undefined,
  }),
}

const StructureType = ({ register }: any) => {
  return (
    <div className='col-sm-6 col-xl-4'>
      <div className='mb20'>
        <label className='heading-color ff-heading fw600 mb10'>Label</label>
        <label className='custom_checkbox'>
          Available for sale
          <input type='checkbox' id='amenity' {...register('label')} />
          <span className='checkmark' />
        </label>
      </div>
    </div>
  )
}

export default StructureType
