'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

import {
  ResetPasswordValidator,
  TResetPasswordValidator,
} from '@/lib/validators/auth-router/reset-password-validator';
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';

interface searchParamsProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Reset = ({ searchParams }: searchParamsProps) => {
  const router = useRouter();
  const token = searchParams?.token as string;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordValidator>({
    defaultValues: {
      token: token,
    },
    resolver: zodResolver(ResetPasswordValidator),
  });

  const { mutate: resetPassword } = trpc.auth.resetPassword.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        toast.error('Failed to reset password');

        return;
      }

      if (err instanceof ZodError) {
        // in toast
        console.error(err.issues[0].message);

        return;
      }

      console.error('Something went wrong. Please try again.');
    },
    onSuccess: () => {
      toast.success('Reset Password successfully', {
        onClose: () => {
          router.push('/');
        },
      });
    },
  });

  const onSubmit = ({
    password,
    confirmPassword,
    token,
  }: TResetPasswordValidator) => {
    //console.log('triggered onSubmit', password, token);
    resetPassword({ password, confirmPassword, token });
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
          id='password'
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
          id='confirmPassword'
          required
        />
        {errors?.confirmPassword && <p>{errors?.confirmPassword.message}</p>}
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
