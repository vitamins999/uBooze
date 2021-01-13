import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { fadeOutPage } from '../../animations/navigation';
import { resetPassword } from '../../api/public';
import { notifyError } from '../../utils/alerts';

const ResetPasswordTokenPage = () => {
  const {
    register: newPassword,
    handleSubmit: handleNewPasswordSubmit,
    watch: newPasswordWatch,
    errors: newPasswordErrors,
  } = useForm();

  const router = useRouter();

  const { token } = router.query;

  const onNewPasswordSubmit = async (data, e) => {
    if (data.newPassword !== data.confirmNewPassword) {
      notifyError('Your new password and confirm new password DO NOT MATCH!');
    } else {
      const response = await resetPassword(token, data.newPassword);
      if (response.error) {
        notifyError('There was a problem sending your request');
      } else {
        router.push('/resetpassword/confirm');
      }
    }
    e.target.reset();
  };

  useEffect(() => {
    if (newPasswordErrors.newPassword?.type === 'required') {
      notifyError('New password is required!');
    }
    if (newPasswordErrors.confirmNewPassword?.type === 'required') {
      notifyError('Confirm password is required!');
    }
    if (newPasswordErrors.newPassword?.type === 'minLength') {
      notifyError('New password must be at least 6 characters');
    }
    if (newPasswordErrors.newPassword?.type === 'maxLength') {
      notifyError('New password cannot exceed 20 characters');
    }
    if (newPasswordErrors.confirmNewPassword?.type === 'minLength') {
      notifyError('Confirm password must be at least 6 characters');
    }
    if (newPasswordErrors.confirmNewPassword?.type === 'maxLength') {
      notifyError('Confirm password cannot exceed 20 characters');
    }
  }, [newPasswordErrors]);

  return (
    <>
      <Head>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='favicon-16x16.png'
        />
        <title>uBooze | Reset Password</title>
      </Head>
      <motion.main
        variants={fadeOutPage}
        exit='exit'
        initial='initial'
        animate='animate'
        className='grid grid-cols-3 font-body'
      >
        <div className='flex flex-col h-screen px-16 bg-gradient-to-r from-green-300 to-green-400 text-green-900'>
          <div>
            <Link href='/'>
              <a>
                <h1 className='text-xl font-heading tracking-widest mt-16 mb-10 text-green-800 hover:text-green-900 transition duration-100'>
                  ubooze
                </h1>
              </a>
            </Link>
            <h2 className='text-3xl leading-snug mb-32 font-semibold'>
              Helping you save money on the drinks you love.
            </h2>
          </div>
          <div>
            <img src='/drinking_wine.svg' alt='drinking wine' />
          </div>
        </div>
        <div className='col-span-2 pl-20 pr-5 py-5'>
          <div>
            <div className='text-right text-xs font-medium'>
              <h4>
                Don't have an account?{' '}
                <Link href='/signup'>
                  <a className='text-blue-600 hover:text-blue-800 transition duration-100'>
                    Sign up now.
                  </a>
                </Link>
              </h4>
            </div>
            <div className='pt-20 pl-40 pr-56'>
              <form
                className='bg-white rounded px-8 pt-32 pb-8 mb-4 w-full'
                onSubmit={handleNewPasswordSubmit(onNewPasswordSubmit)}
              >
                <h3 className='text-2xl font-bold font-heading mb-5 tracking-wide'>
                  Reset Password
                </h3>
                <p className='text-sm'>Please enter your new password below.</p>
                <div className='mb-4 pt-8'>
                  <label
                    htmlFor='newPassword'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    New Password
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='password'
                    name='newPassword'
                    id='newPassword'
                    ref={newPassword({
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                </div>
                <div className='mb-6'>
                  <label
                    htmlFor='confirmNewPassword'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Confirm New Password
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='password'
                    name='confirmNewPassword'
                    id='confirmNewPassword'
                    ref={newPassword({
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                </div>
                <button
                  className='text-sm shadow-sm border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
                  type='submit'
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default ResetPasswordTokenPage;
