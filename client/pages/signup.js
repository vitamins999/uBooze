import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, userLoginFail } from '../lib/slices/userInfoSlice';

import Axios from 'axios';
import { motion } from 'framer-motion';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const signupPage = () => {
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

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
      await Axios({
        method: 'POST',
        data: data,
        url: 'http://localhost:3001/api/auth/register',
      });

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
      <main className='grid grid-cols-3 font-body'>
        <div className='flex flex-col h-screen px-16 bg-gradient-to-r from-green-300 to-green-400 text-green-900'>
          <div>
            <Link href='/'>
              <a>
                <h1 className='text-xl tracking-widest mt-16 mb-10 text-green-800 hover:text-green-900 transition duration-100'>
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
                Already have an account?{' '}
                <Link href='/login'>
                  <a className='text-blue-600 hover:text-blue-800 transition duration-100'>
                    Log in now.
                  </a>
                </Link>
              </h4>
            </div>
            <div className='pt-12 pl-40 pr-56'>
              <form
                className='bg-white rounded px-8 pt-6 pb-8 w-full'
                onSubmit={handleRegisterSubmit(onRegisterSubmit)}
              >
                <h3 className='text-3xl font-bold mb-5 tracking-wide'>
                  Sign up to ubooze
                </h3>
                <div>
                  <h4 className='text-md tracking-wide'>
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
                  <div className='mb-4 w-48'>
                    <label
                      htmlFor='firstName'
                      className='block text-gray-700 text-sm font-medium'
                    >
                      First name
                    </label>
                    <input
                      className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                      type='text'
                      name='firstName'
                      id='firstName'
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className='mb-4 w-48'>
                    <label
                      htmlFor='lastName'
                      className='block text-gray-700 text-sm font-medium'
                    >
                      Last name
                    </label>
                    <input
                      className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='password'
                    name='password'
                    id='password'
                    ref={register({ required: true })}
                  />
                </div>
                <button
                  className='text-sm shadow-sm border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
                  type='submit'
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default signupPage;
