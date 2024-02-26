'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ZodError } from 'zod';

import {
  ForgotEmailValidator,
  TForgotEmailValidator,
} from '@/lib/validators/auth-router/forgot-email-validator';
import { trpc } from '@/trpc/client';

const Forgot = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotEmailValidator>({
    resolver: zodResolver(ForgotEmailValidator),
  });

  const { mutate: forgotPassword } = trpc.auth.forgotPassword.useMutation({
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

  const onSubmit = ({ email }: TForgotEmailValidator) => {
    //console.log('triggered onSubmit', email);
    forgotPassword({ email });
  };
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

      {/* End Password */}

      {/* End  Lost your password? */}

      <div className='d-grid mb20'>
        <button className='ud-btn btn-thm' type='submit'>
          Send mail <i className='fal fa-arrow-right-long' />
        </button>
      </div>
      {/* End submit */}
    </form>
  );
};

export default Forgot;
