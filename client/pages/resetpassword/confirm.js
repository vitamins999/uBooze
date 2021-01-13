import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';

import { fadeOutPage } from '../../animations/navigation';

const ConfirmPasswordChangePage = () => {
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
        <title>uBooze | Password Changed</title>
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
                Already have an account?{' '}
                <Link href='/login'>
                  <a className='text-blue-600 hover:text-blue-800 transition duration-100'>
                    Log in now.
                  </a>
                </Link>
              </h4>
            </div>
            <div className='pt-72 pl-40 pr-56'>
              <p className='text-sm'>
                Your password has been successfully changed.
              </p>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default ConfirmPasswordChangePage;
