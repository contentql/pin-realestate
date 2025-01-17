'use client'

const StatusMapping: any = {
  All: 'All',
  Buy: 'For sale',
  Rent: 'For rent',
}

const ListingStatus = ({ filterFunctions }: any) => {
  const options = [
    { id: 'flexRadioDefault3', label: 'All', defaultChecked: true },
    { id: 'flexRadioDefault1', label: 'Buy' },
    { id: 'flexRadioDefault2', label: 'Rent' },
  ]

  return (
    <>
      {options.map(option => (
        <div
          className='form-check d-flex align-items-center mb10'
          key={option.id}
        >
          <input
            className='form-check-input'
            type='radio'
            checked={
              filterFunctions?.listingStatus == StatusMapping[option.label]
            }
            onChange={() =>
              filterFunctions.handlelistingStatus(StatusMapping[option.label])
            }
          />
          <label className='form-check-label' htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  )
}

export default ListingStatus
