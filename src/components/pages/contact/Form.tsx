'use client'
import {
  ContactFormValidator,
  TContactFormValidator,
} from '@/lib/validators/auth-router/contact-form-validator'
import { useAuth } from '@/providers/Auth'
import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ZodError } from 'zod'

const Form = () => {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TContactFormValidator>({
    resolver: zodResolver(ContactFormValidator),
  })

  const { mutate: newContact } = trpc.contact.createNewContact.useMutation({
    onError: err => {
      if (err.data?.code === 'NOT_FOUND') {
        toast.error('Account does not exist')

        return
      }
      if (err.data?.code === 'UNAUTHORIZED') {
        // in toast
        toast.error('E-mail or Password incorrect')

        return
      }

      if (err instanceof ZodError) {
        // in toast
        console.error(err.issues[0].message)

        return
      }

      console.error('Something went wrong. Please try again.')
    },
    onSuccess: () => {
      reset()
      toast.success('Thank you for contacting us. our team will reach you!')
    },
  })

  const onSubmit = ({
    first_name,
    last_name,
    query,
  }: TContactFormValidator) => {
    console.log(`onSubmit:`, first_name, last_name, query)
    newContact({ first_name, last_name, query })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className='form-style1'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              First Name
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='First Name'
              {...register('first_name')}
              required
            />
          </div>
          {errors.first_name && <p>{errors.first_name.message}</p>}
        </div>
        {/* End .col-lg-12 */}

        <div className='col-lg-12'>
          <div className='mb20'>
            <label className='heading-color ff-heading fw600 mb10'>
              Last Name
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Last Name'
              {...register('last_name')}
              required
            />
          </div>
          {errors.last_name && <p>{errors.last_name.message}</p>}
        </div>
        {/* End .col-lg-12 */}

        {/* End .col-lg-12 */}

        <div className='col-md-12'>
          <div className='mb10'>
            <label className='heading-color ff-heading fw600 mb10'>
              Textarea
            </label>
            <textarea
              cols={30}
              rows={4}
              placeholder='There are many variations of passages.'
              defaultValue={''}
              {...register('query')}
              required
            />
          </div>
          {errors.query && <p>{errors.query.message}</p>}
        </div>
        {/* End .col-lg-12 */}

        <div className='col-md-12'>
          <div className='d-grid'>
            <button type='submit' className='ud-btn btn-thm'>
              Submit
              <i className='fal fa-arrow-right-long' />
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Form
