'use client'
import { useAuth } from '@/providers/Auth'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const PersonalInfo = ({ register }: any) => {
  const { user } = useAuth()
  const { setValue } = useForm()

  useEffect(() => {
    setValue('user_name', user?.user_name!)
    user?.phone_number
      ? setValue('phone_number', user?.phone_number)
      : setValue('phone_number', '')
    user?.first_name
      ? setValue('first_name', user?.first_name)
      : setValue('first_name', '')
    user?.last_name
      ? setValue('last_name', user?.last_name)
      : setValue('last_name', '')
    user?.position
      ? setValue('position', user?.position)
      : setValue('position', '')
    user?.company ? setValue('company', user?.company) : setValue('company', '')
    user?.about ? setValue('about', user?.about) : setValue('about', '')
    user?.address ? setValue('address', user?.address) : setValue('address', '')
    user?.language
      ? setValue('language', user?.language)
      : setValue('language', '')
    user?.tax_number
      ? setValue('tax_number', user?.tax_number)
      : setValue('tax_number', '')
  }, [user])

  return (
    <div className='form-style1'>
      <div className='row'>
        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Username
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='username'
              {...register('user_name')}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>Email</label>
            <input
              type='email'
              className='form-control'
              defaultValue={user?.email}
              placeholder='Your E-mail Address'
              disabled
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>Phone</label>
            <input
              type='text'
              className='form-control'
              placeholder='Your Phone number'
              {...register('phone_number')}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              First Name
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your first name'
              {...register('first_name')}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Last Name
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your last Name'
              {...register('last_name')}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Position
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your position'
              {...register('position')}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Language
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='language'
              {...register('language')}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Company Name
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your Company Name'
              {...register('company')}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className='col-sm-6 col-xl-4'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Tax Number
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Tax Number'
              {...register('tax_number')}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className='col-xl-12'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Address
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Your Address'
              {...register('address')}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className='col-md-12'>
          <div className='mb10'>
            <label className='heading-color ff-heading fw600 mb10'>
              About me
            </label>
            <textarea
              cols={30}
              rows={4}
              placeholder='There are many variations of passages.'
              defaultValue={''}
              {...register('about')}
            />
          </div>
        </div>
        {/* End .col */}

        <div className='col-md-12'>
          <div className='text-end'>
            <button type='submit' className='ud-btn btn-dark'>
              Update Profile
              <i className='fal fa-arrow-right-long' />
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </div>
  )
}

export default PersonalInfo
