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
            <img src='drinking_wine.svg' alt='drinking wine' />
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
                className='bg-white rounded px-8 pt-6 pb-8 mb-4 w-full'
                onSubmit={handleLoginSubmit(onLoginSubmit)}
              >
                <h3 className='text-3xl font-heading font-bold mb-5 tracking-wide'>
                  Log in to ubooze
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
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='password'
                    name='password'
                    id='password'
                    ref={login({ required: true })}
                  />
                </div>
                <button
                  className='text-sm shadow-sm border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
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
