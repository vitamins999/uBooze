import Link from 'next/link';
import Head from 'next/head';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  loginAsync,
  userLoginFail,
  userLogout,
} from '../lib/slices/userInfoSlice';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { fadeOutPage } from '../animations/navigation';

import { notifyError } from '../utils/alerts';

const LoginPage = () => {
  const {
    register: login,
    handleSubmit: handleLoginSubmit,
    watch: loginWatch,
    errors: loginErrors,
  } = useForm();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userInfo);
  const { loading, error: userLoginError, userID } = userLogin;

  const router = useRouter();
  const queryStringError = router.query.error;
  const logoutTrue = router.query.logout === 'true' ? true : false;

  const onLoginSubmit = async ({ email, password }) => {
    dispatch(loginAsync(email, password));
  };

  useEffect(() => {
    if (userID) {
      router.push('/');
    }
  }, [userID]);

  useEffect(() => {
    if (userLoginError) {
      notifyError(userLoginError);
      dispatch(userLoginFail(null));
    }
  }, [userLoginError]);

  useEffect(() => {
    if (queryStringError) {
      if (queryStringError === 'alreadyregisteredgoogle') {
        notifyError(
          "Oops. Google log in doesn't seem to be working.  Have you already registered with the same email address using Facebook or the regular register form?"
        );
      } else if (queryStringError === 'alreadyregisteredfacebook') {
        notifyError(
          "Oops. Facebook log in doesn't seem to be working.  Have you already registered with the same email address using Google or the regular register form?"
        );
      }
    }
  }, [queryStringError]);

  useEffect(() => {
    if (loginErrors.email?.type === 'required') {
      notifyError('Email is required');
    }
    if (loginErrors.password?.type === 'required') {
      notifyError('Password is required');
    }
  }, [loginErrors]);

  // Logs out if logout query string is found
  // (used to force logout on a 403 error from axios intercepter that occurs when refresh token has expired)
  useEffect(() => {
    if (logoutTrue) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
      dispatch(userLogout());
    }
  }, [logoutTrue]);

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
        <title>uBooze | Log In</title>
      </Head>
      <motion.main
        data-testid='section-main'
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
                <h1 className='text-xl font-heading tracking-widest lg:mt-16 2xl:mt-36 xl:mt-32 iPadPro:mt-60 iPadProWidescreen:mt-44 mb-10 text-green-800 hover:text-green-900 transition duration-100'>
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
                Don't have an account?{' '}
                <Link href='/signup'>
                  <a className='text-blue-600 hover:text-blue-800 transition duration-100'>
                    Sign up now.
                  </a>
                </Link>
              </h4>
            </div>
            <div className='lg:pt-20 2xl:pt-40 xl:pt-36 pt-20 iPad:pt-44 iPadProWidescreen:pt-48 iPadPro:pt-64 lg:pl-40 lg:pr-56 iPadWidescreen:pl-20 iPadWidescreen:pr-20 iPadProWidescreen:pl-20 iPadProWidescreen:pr-20 iPadPro:pl-10 iPadPro:pr-10 iPad:pl-32 iPad:pr-32'>
              <form
                className='bg-white rounded px-8 pt-6 pb-8 mb-4 w-full'
                onSubmit={handleLoginSubmit(onLoginSubmit)}
              >
                <h3 className='text-3xl font-heading font-bold mb-5 tracking-wide'>
                  Log in to uBooze
                </h3>
                <div>
                  <h4 className='text-sm tracking-wide'>
                    Have a social media account? Log in with:
                  </h4>
                  <ul className='py-4 flex items-center'>
                    <motion.li
                      className='mr-5'
                      whileHover={{ scale: 1.3 }}
                      transition={{ duration: 0.1 }}
                    >
                      <a
                        href={`${process.env.NEXT_PUBLIC_SERVER}/api/auth/google`}
                        className='cursor-pointer'
                      >
                        <img
                          src='/google.svg'
                          alt='google icon'
                          className='w-10'
                        />
                      </a>
                    </motion.li>
                    <li>
                      <a
                        title='Facebook login is currently disabled. Sorry!'
                        className='cursor-not-allowed'
                      >
                        <img
                          src='/facebook.svg'
                          alt='facebook icon'
                          className='w-10'
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='flex w-full items-center justify-center mt-4'>
                  <div className='border-b border-gray-600 w-full'></div>
                  <h2 className='text-md text-gray-600 tracking-wider mx-2'>
                    Or
                  </h2>
                  <div className='border-b border-gray-600 w-full'></div>
                </div>
                <div className='mb-4 pt-8'>
                  <label
                    htmlFor='email'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Email address
                  </label>
                  <input
                    data-testid='input-email'
                    className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='email'
                    name='email'
                    id='email'
                    ref={login({ required: true })}
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
                    data-testid='input-password'
                    className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='password'
                    name='password'
                    id='password'
                    ref={login({ required: true })}
                  />
                  <Link href='/resetpassword/email'>
                    <a className='text-xs font-medium text-blue-600 hover:text-blue-800 transition duration-100'>
                      Forgot password?
                    </a>
                  </Link>
                </div>
                <button
                  className='text-sm lg:w-auto w-full shadow-sm border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
                  type='submit'
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default LoginPage;
