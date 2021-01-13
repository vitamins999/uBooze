import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { fadeOutPage } from '../../animations/navigation';
import { sendForgotPasswordRequest } from '../../api/public';
import { notifyError, notifySuccess } from '../../utils/alerts';

const ResetPasswordEmailPage = () => {
  const {
    register: passwordReset,
    handleSubmit: handlePasswordResetSubmit,
    watch: passwordResetWatch,
    errors: passwordResetErrors,
  } = useForm();

  const onPasswordResetSubmit = async (data, e) => {
    const response = await sendForgotPasswordRequest(data.email);
    if (response.error) {
      notifyError('There was a problem sending your request');
    } else {
      notifySuccess('Request sent!');
    }
    e.target.reset();
  };

  useEffect(() => {
    if (passwordResetErrors.email?.type === 'required') {
      notifyError('Email is required!');
    }
  }, [passwordResetErrors]);

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
        <title>uBooze | Forgot Password</title>
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
                onSubmit={handlePasswordResetSubmit(onPasswordResetSubmit)}
              >
                <h3 className='text-2xl font-bold font-heading mb-5 tracking-wide'>
                  Forgot your password?
                </h3>
                <p className='text-sm'>
                  Enter the email address you used to join the site, and we'll
                  send you a link to reset your password.
                </p>
                <div className='mb-4 pt-8'>
                  <label
                    htmlFor='email'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Email address
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='email'
                    name='email'
                    id='email'
                    ref={passwordReset({ required: true })}
                  />
                </div>
                <button
                  className='text-sm shadow-sm border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
                  type='submit'
                >
                  Send Reset Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default ResetPasswordEmailPage;
