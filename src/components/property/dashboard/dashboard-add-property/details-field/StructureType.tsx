'use client'

const structureTypeOptions = [
  { value: 'Rented', label: 'Rented' },
  { value: 'Sold', label: 'Sold' },
]

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
        <div className='location-area'>
          <select {...register('label')}>
            {structureTypeOptions.map((ele, id) => (
              <option key={id} value={ele.value}>
                {ele.value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default StructureType
