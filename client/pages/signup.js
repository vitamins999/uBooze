import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, userLoginFail } from '../lib/slices/userInfoSlice';

import { registerUserAccountAPI } from '../api/public';
import { motion } from 'framer-motion';

import { fadeOutPage } from '../animations/navigation';

import { notifyError } from '../utils/alerts';

const signupPage = () => {
  const {
    register,
    handleSubmit: handleRegisterSubmit,
    watch: registerWatch,
    errors: registerErrors,
  } = useForm();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userInfo);
  const { loading, error: userLoginError, userID } = userLogin;

  const router = useRouter();

  const onRegisterSubmit = async (data) => {
    try {
      await registerUserAccountAPI(data);

      dispatch(loginAsync(data.email, data.password));
      router.push('/');
    } catch (error) {
      dispatch(userLoginFail(error.response.data));
    }
  };

  useEffect(() => {
    if (userLoginError) {
      notifyError(userLoginError);
    }
  }, [userLoginError]);

  useEffect(() => {
    if (registerErrors.password?.type === 'minLength') {
      notifyError('Password must be at least 6 characters');
    }
    if (registerErrors.password?.type === 'maxLength') {
      notifyError('Password cannot exceed 20 characters');
    }
    if (registerErrors.firstName?.type === 'required') {
      notifyError('First name is required');
    }
    if (registerErrors.lastName?.type === 'required') {
      notifyError('Last name is required');
    }
    if (registerErrors.email?.type === 'required') {
      notifyError('Email address is required');
    }
    if (registerErrors.username?.type === 'required') {
      notifyError('Username is required');
    }
    if (registerErrors.password?.type === 'required') {
      notifyError('Password is required');
    }
  }, [registerErrors]);

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
        <title>uBooze | Sign Up</title>
      </Head>
      <motion.main
        variants={fadeOutPage}
        exit='exit'
        initial='initial'
        animate='animate'
        className='lg:grid lg:grid-cols-3 font-body'
      >
        <div className='lg:flex hidden flex-col h-screen px-16 bg-gradient-to-r from-green-300 to-green-400 text-green-900'>
          <div>
            <Link href='/'>
              <a>
                <h1 className='text-xl font-heading tracking-widest iPadWidescreen:mt-12 lg:mt-8 2xl:mt-36 xl:mt-20 iPadPro:mt-60 iPadProWidescreen:mt-44 mb-10 text-green-800 hover:text-green-900 transition duration-100'>
                  ubooze
                </h1>
              </a>
            </Link>
            <h2 className='text-3xl leading-snug mb-32 font-semibold'>
              Helping you save money on the drinks you love.
            </h2>
          </div>
          <div>
            <img src='drinking_wine.svg' alt='drinking wine' />
          </div>
        </div>
        <div className='lg:col-span-2 lg:pl-20 lg:pr-5 py-5'>
          <div>
            <div className='text-right text-xs font-medium pr-7 lg:pr-0'>
              <h4>
                Already have an account?{' '}
                <Link href='/login'>
                  <a className='text-blue-600 hover:text-blue-800 transition duration-100'>
                    Log in now.
                  </a>
                </Link>
              </h4>
            </div>
            <div className='lg:pt-10 2xl:pt-40 xl:pt-24 xl:pl-40 xl:pr-40 pt-20 iPad:pt-44 iPadWidescreen:pt-16 iPadProWidescreen:pt-48 iPadPro:pt-64 lg:pl-20 lg:pr-20 2xl:pl-72 2xl:pr-72 iPadWidescreen:pl-20 iPadWidescreen:pr-20 iPadProWidescreen:pl-20 iPadProWidescreen:pr-20 iPadPro:pl-10 iPadPro:pr-10 iPad:pl-32 iPad:pr-32'>
              <form
                className='bg-white rounded px-8 pt-6 pb-8 w-full'
                onSubmit={handleRegisterSubmit(onRegisterSubmit)}
              >
                <h3 className='text-3xl font-heading font-bold mb-5 tracking-wide'>
                  Sign up to ubooze
                </h3>
                <div>
                  <h4 className='text-sm tracking-wide'>
                    Have a social media account? Sign up with:
                  </h4>
                  <ul className='py-4 flex items-center'>
                    <motion.li
                      className='mr-5'
                      whileHover={{ scale: 1.3 }}
                      transition={{ duration: 0.1 }}
                    >
                      <a
                        href='http://localhost:3001/api/auth/google'
                        className='cursor-pointer'
                      >
                        <img
                          src='/google.svg'
                          alt='google icon'
                          className='w-10'
                        />
                      </a>
                    </motion.li>
                    <motion.li
                      whileHover={{ scale: 1.3 }}
                      transition={{ duration: 0.1 }}
                    >
                      <a
                        href='http://localhost:3001/api/auth/facebook'
                        className='cursor-pointer'
                      >
                        <img
                          src='/facebook.svg'
                          alt='facebook icon'
                          className='w-10'
                        />
                      </a>
                    </motion.li>
                  </ul>
                </div>
                <div className='flex w-full items-center justify-center mt-2'>
                  <div className='border-b border-gray-600 w-full'></div>
                  <h2 className='text-md text-gray-600 tracking-wider mx-2'>
                    Or
                  </h2>
                  <div className='border-b border-gray-600 w-full'></div>
                </div>
                <div className='flex justify-between pt-6'>
                  <div className='mb-4 w-full mr-2 iPadWidescreen:mr-2 iPadProWidescreen:mr-2 iPadProWidescreen:w-full lg:mr-0 2xl:w-64 lg:w-52'>
                    <label
                      htmlFor='firstName'
                      className='block text-gray-700 text-sm font-medium'
                    >
                      First name
                    </label>
                    <input
                      className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                      type='text'
                      name='firstName'
                      id='firstName'
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className='mb-4 w-full ml-2 iPadWidescreen:ml-2 iPadProWidescreen:ml-2 iPadProWidescreen:w-full lg:ml-0 2xl:w-64 lg:w-52'>
                    <label
                      htmlFor='lastName'
                      className='block text-gray-700 text-sm font-medium'
                    >
                      Last name
                    </label>
                    <input
                      className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                      type='text'
                      name='lastName'
                      id='lastName'
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='email'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Email address
                  </label>
                  <input
                    className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='email'
                    name='email'
                    id='email'
                    ref={register({ required: true })}
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='username'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Username
                  </label>
                  <input
                    className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='text'
                    name='username'
                    id='username'
                    ref={register({ required: true })}
                  />
                </div>
                <div className='mb-6'>
                  <label
                    htmlFor='password'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Password
                  </label>
                  <input
                    className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='password'
                    name='password'
                    id='password'
                    ref={register({
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                </div>
                <button
                  className='text-sm lg:w-auto w-full shadow-sm border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
                  type='submit'
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default signupPage;
