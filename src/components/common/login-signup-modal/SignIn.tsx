'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ZodError } from 'zod'

import {
  LoginCredentialsValidator,
  TLoginCredentialsValidator,
} from '@/lib/validators/auth-router/login-credentials-validator'
import { useAuth } from '@/providers/Auth'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'

const SignIn = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginCredentialsValidator>({
    resolver: zodResolver(LoginCredentialsValidator),
  })

  const { login } = useAuth()

  const { mutate: loginUser } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onError: err => {
      if (err?.message === 'Invalid login') {
        toast.error('Account does not exist')

        return
      }
      // if (err?.message === 'UNAUTHORIZED') {
      //   // in toast
      //   toast.error('E-mail or Password incorrect')

      //   return
      // }

      if (err instanceof ZodError) {
        // in toast
        console.error(err.issues[0].message)

        return
      }

      console.error('Something went wrong. Please try again.')
    },
    onSuccess: () => {
      toast.success('Login succcessfully')
      router.push('/')
    },
  })

  const onSubmit = ({ email, password }: TLoginCredentialsValidator) => {
    loginUser({ email, password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className='form-style1'>
      <div className='mb25'>
        <label className='form-label fw600 dark-color'>Email</label>
        <input
          {...register('email')}
          type='email'
          className='form-control'
          placeholder='Enter Email'
          required
        />
        {errors?.email && <p>{errors?.email.message}</p>}
      </div>
      {/* End email */}

      <div className='mb15'>
        <label className='form-label fw600 dark-color'>Password</label>
        <input
          {...register('password')}
          type='text'
          className='form-control'
          placeholder='Enter Password'
          required
        />
        {errors?.password && (
          <p className='error'>{errors?.password.message}</p>
        )}
      </div>
      {/* End Password */}

      <div className='checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10'>
        <label className='custom_checkbox fz14 ff-heading'>
          Remember me
          <input type='checkbox' defaultChecked={false} />
          <span className='checkmark' />
        </label>
        <a className='fz14 ff-heading' href='#'>
          Lost your password?
        </a>
      </div>
      {/* End  Lost your password? */}

      <div className='d-grid mb20'>
        <button className='ud-btn btn-thm' type='submit'>
          Sign in <i className='fal fa-arrow-right-long' />
        </button>
      </div>
      {/* End submit */}

      <div className='hr_content mb20'>
        <hr />
        <span className='hr_top_text'>OR</span>
      </div>

      <div className='d-grid mb10'>
        <button className='ud-btn btn-white' type='button'>
          <i className='fab fa-google' /> Continue Google
        </button>
      </div>

      <p className='dark-color text-center mb0 mt10'>
        Not signed up?{' '}
        <Link className='dark-color fw600' href='/register'>
          Create an account.
        </Link>
      </p>
    </form>
  )
}

export default SignIn
