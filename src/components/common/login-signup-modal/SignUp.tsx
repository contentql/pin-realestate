'use client';
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/auth-router/account-credentials-validator';
import { trpc } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: registerUser } = trpc.auth.createUser.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        toast.error('user already exist');

        return;
      }
    },
    onSuccess: () => {
      toast.success('verification link sent to your mail. Please verify it!', {
        onClose: () => {
          router.push('/login');
        },
      });
    },
  });

  const onSubmit = ({
    email,
    password,
    username,
  }: TAuthCredentialsValidator) => {
    registerUser({ email, password, username });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form-style1'>
      <div className='mb25'>
        <label className='form-label fw600 dark-color'>Username</label>
        <input
          type='text'
          {...register('username')}
          className='form-control'
          placeholder='Enter Username'
          required
        />
        {errors?.email && <p>{errors?.email.message}</p>}
      </div>
      <div className='mb25'>
        <label className='form-label fw600 dark-color'>Email</label>
        <input
          type='email'
          {...register('email')}
          className='form-control'
          placeholder='Enter Email'
          required
        />
        {errors?.email && <p>{errors?.email.message}</p>}
      </div>
      {/* End Email */}

      <div className='mb20'>
        <label className='form-label fw600 dark-color'>Password</label>
        <input
          type='password'
          {...register('password')}
          className='form-control'
          placeholder='Enter Password'
          required
        />
        {errors?.password && <p>{errors?.password.message}</p>}
      </div>
      {/* End Password */}

      <div className='d-grid mb20'>
        <button className='ud-btn btn-thm' type='submit'>
          Create account <i className='fal fa-arrow-right-long' />
        </button>
      </div>
      <div className='hr_content mb20'>
        <hr />
        <span className='hr_top_text'>OR</span>
      </div>

      <div className='d-grid mb10'>
        <button className='ud-btn btn-white' type='button'>
          <i className='fab fa-google' /> Continue Google
        </button>
      </div>
      <div className='d-grid mb10'>
        <button className='ud-btn btn-fb' type='button'>
          <i className='fab fa-facebook-f' /> Continue Facebook
        </button>
      </div>
      <div className='d-grid mb20'>
        <button className='ud-btn btn-apple' type='button'>
          <i className='fab fa-apple' /> Continue Apple
        </button>
      </div>
      <p className='dark-color text-center mb0 mt10'>
        Already Have an Account?{' '}
        <Link className='dark-color fw600' href='/login'>
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
