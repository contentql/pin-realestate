import { Controller } from 'react-hook-form'
import PhoneInputWithCountrySelect, {
  isValidPhoneNumber,
} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const OwnerFeilds = ({ register, control }: any) => {
  const Inputt = () => {
    return (
      <input
        type='text'
        className='form-control'
        placeholder='Owner PhoneNumber'
      />
    )
  }
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

            <Controller
              name='ownerPhoneNumber'
              control={control}
              rules={{
                validate: value => isValidPhoneNumber(value),
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInputWithCountrySelect
                  value={value}
                  //inputComponent={Inputt}
                  onChange={onChange}
                  defaultCountry='IN'
                  id='ownerPhoneNumber'
                />
              )}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Whats app
            </label>

            <Controller
              name='ownerWhatsApp'
              control={control}
              rules={{
                validate: value => isValidPhoneNumber(value),
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInputWithCountrySelect
                  value={value}
                  //inputComponent={Inputt}
                  onChange={onChange}
                  defaultCountry='IN'
                  id='ownerWhatsApp'
                />
              )}
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
