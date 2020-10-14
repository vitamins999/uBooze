import Link from 'next/link';
import Head from 'next/head';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../lib/slices/userInfoSlice';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const {
    register: login,
    handleSubmit: handleLoginSubmit,
    watch: loginWatch,
    errors: loginErrors,
  } = useForm();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userInfo);
  const { loading, error, userID } = userLogin;

  const router = useRouter();

  const onLoginSubmit = async ({ email, password }) => {
    try {
      dispatch(loginAsync(email, password));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userID) {
      router.push('/');
    }
  }, [userID]);

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
      <main className='grid grid-cols-3 font-body'>
        <div className='flex flex-col h-screen px-16 bg-gradient-to-r from-orange-300 to-orange-400 text-orange-900'>
          <div>
            <Link href='/'>
              <a>
                <h1 className='text-xl tracking-widest mt-16 mb-10 text-orange-700 hover:text-orange-900 transition duration-100'>
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
                <h3 className='text-4xl font-bold mb-5 tracking-wide'>
                  Log in to ubooze
                </h3>
                <div>
                  <h4 className='text-md tracking-wide'>
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
                    className='block text-gray-900 text-md font-bold'
                  >
                    Email Address
                  </label>
                  <input
                    className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-700 bg-orange-200 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                    type='email'
                    name='email'
                    id='email'
                    ref={login({ required: true })}
                  />
                </div>
                <div className='mb-6'>
                  <label
                    htmlFor='password'
                    className='block text-gray-900 text-md font-bold'
                  >
                    Password
                  </label>
                  <input
                    className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-700 bg-orange-200 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                    type='password'
                    name='password'
                    id='password'
                    ref={login({ required: true })}
                  />
                </div>
                <button
                  className='text-sm w-40 bg-blue-600 transition duration-100 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
