'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ZodError } from 'zod';

import { trpc } from '@/trpc/client';

const Reset = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: resetPassword } = trpc.auth.resetPassword.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        // in toast
        console.error('');

        return;
      }
      if (err.data?.code === 'UNAUTHORIZED') {
        // in toast
        console.error('email or password incorrect');

        return;
      }

      if (err instanceof ZodError) {
        // in toast
        console.error(err.issues[0].message);

        return;
      }

      console.error('Something went wrong. Please try again.');
    },
  });

  const onSubmit = ({ password }: any) => {
    console.log('triggered onSubmit', password, token);
    resetPassword({ password, token });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className='form-style1'>
      <div className='mb25'>
        <label className='form-label fw600 dark-color'>New Password</label>
        <input
          {...register('password')}
          type='password'
          className='form-control'
          placeholder='Enter new Password'
          required
        />
        {errors?.password && <p>{errors?.password.message}</p>}
      </div>
      <div className='mb25'>
        <label className='form-label fw600 dark-color'>Confirm password</label>
        <input
          {...register('confirmPassword')}
          type='password'
          className='form-control'
          placeholder='confirm password'
          required
        />
        {errors?.password && <p>{errors?.password.message}</p>}
      </div>
      {/* End email */}

      {/* End Password */}

      {/* End  Lost your password? */}

      <div className='d-grid mb20'>
        <button className='ud-btn btn-thm' type='submit'>
          Reset password <i className='fal fa-arrow-right-long' />
        </button>
      </div>
      {/* End submit */}
    </form>
  );
};

export default Reset;
