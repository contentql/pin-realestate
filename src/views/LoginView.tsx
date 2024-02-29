'use client';
import SignIn from '@/components/common/login-signup-modal/SignIn';
import { trpc } from '@/trpc/client';
import Loading from '@/utilis/loading';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

const LoginView = () => {
  const router = useRouter();
  const { mutate: loginUser, isPending: loadingForSignIn } =
    trpc.auth.signIn.useMutation({
      onError: (err) => {
        if (err.data?.code === 'NOT_FOUND') {
          toast.error('Account does not exist');

          return;
        }
        if (err.data?.code === 'UNAUTHORIZED') {
          // in toast
          toast.error('E-mail or Password incorrect');

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
        toast.success('Login succcessfully', {
          onClose: () => router.push('/'),
        });
      },
    });

  if (loadingForSignIn) {
    return <Loading />;
  }
  return (
    <>
      {/* Our Compare Area */}
      <section className='our-compare pt60 pb60'>
        <Image
          width={1012}
          height={519}
          src='/images/icon/login-page-icon.svg'
          alt='logo'
          className='login-bg-icon contain'
          data-aos='fade-right'
          data-aos-delay='300'
        />
        <div className='container'>
          <div className='row' data-aos='fade-left' data-aos-delay='300'>
            <div className='col-lg-6'>
              <div className='log-reg-form signup-modal form-style1 bgc-white p50 p30-sm default-box-shadow2 bdrs12'>
                <div className='text-center mb40'>
                  <Link href='/'>
                    <Image
                      width={138}
                      height={44}
                      className='mb25'
                      src='/images/header-logo2.svg'
                      alt='logo'
                    />
                  </Link>
                  <h2>Sign in</h2>
                  <p className='text'>
                    Sign in with this account across the following sites.
                  </p>
                </div>
                <SignIn loginUser={loginUser} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginView;
