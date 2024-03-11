'use client'

interface Options {
  countries: string[]
  cities: string[]
  additionalCountries: string[]
}

type Option = 'countries' | 'cities' | 'additionalCountries'

const options: Options = {
  countries: [
    'Belgium',
    'France',
    'Kuwait',
    'Qatar',
    'Netherlands',
    'Germany',
    'Turkey',
    'UK',
    'USA',
  ],
  cities: [
    'California',
    'Chicago',
    'Los Angeles',
    'Manhattan',
    'New Jersey',
    'New York',
    'San Diego',
    'San Francisco',
    'Texas',
  ],
  additionalCountries: [
    'Belgium',
    'France',
    'Kuwait',
    'Qatar',
    'Netherlands',
    'Germany',
    'Turkey',
    'UK',
    'USA',
  ],
}

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

const SelectMultiField = ({ register }: any) => {
  const fieldTitles = ['state', 'City', 'Country']
  return (
    <>
      {Object.keys(options).map((key: string, index: number) => (
        <div className='col-sm-6 col-xl-4' key={index}>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              {fieldTitles[index]}
            </label>
            <div className='location-area'>
              <select
                className='form-control'
                {...register(fieldTitles[index])}>
                {options[key as Option].map((option: string, index: number) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default SelectMultiField
