import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Cookie from 'js-cookie';

import {
  fetchSupermarkets,
  createQueryString,
} from '../utils/supermarketListUtils';
import {
  setSupermarkets,
  setQueryString,
  setUserPostcode,
} from '../features/supermarketDetails/supermarketDetailsSlice';

import Layout from '../components/Layout';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible1: {
    opacity: 1,
    transition: { duration: 1 },
  },
  visible2: {
    opacity: 1,
    transition: { delay: 0.5, duration: 1 },
  },
};

export default function Home() {
  const [postcode, setPostcode] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const supermarketList = await fetchSupermarkets(postcode);

    if (supermarketList.length > 0) {
      dispatch(setSupermarkets(supermarketList));

      const supermarketListQueryString = createQueryString(supermarketList);
      dispatch(setQueryString(supermarketListQueryString));

      dispatch(setUserPostcode(postcode));
      Cookie.set('currentPostcode', postcode);
      Cookie.set('supermarketList', supermarketList);
      Cookie.set('queryString', supermarketListQueryString);

      router.push(`/products`);
    } else {
      console.log('No supermarkets found');
    }
  };

  return (
    <Layout title='Home'>
      <main>
        <div className='flex w-full mx-auto items-center bg-black text-gray-300 pt-20 px-32'>
          <motion.div
            className='w-1/3 z-10'
            variants={containerVariants}
            initial='hidden'
            animate='visible1'
          >
            <img src='hero-small.webp' alt='wineglass' />
          </motion.div>
          <motion.div
            className='flex flex-col w-full text-right'
            variants={containerVariants}
            initial='hidden'
            animate='visible2'
          >
            <h1 className='text-6xl tracking-widest font-bold'>ubooze</h1>
            <h1 className='text-4xl'>
              Helping you <span className='text-blue-500'>save money</span>
            </h1>
            <h1 className='text-4xl'>
              on the <span className='text-blue-500'>drinks you love</span>
            </h1>
            <h3 className='text-xs pt-2'>*UK only</h3>
            <form className='mt-4' onSubmit={onSubmit}>
              <div className='container py-4 text-white'>
                <input
                  className='w-1/3 bg-transparent text-white italic transition focus:outline-none focus:border-orange-500 py-2 appearance-none leading-normal border-b border-orange-700 text-xl'
                  type='text'
                  onChange={(e) =>
                    setPostcode(
                      e.target.value.split(' ').join('').toUpperCase()
                    )
                  }
                  placeholder='My postcode is...'
                />
                <button
                  className='bg-transparent text-orange-700 px-2 -ml-10 hover:text-orange-500'
                  type='submit'
                >
                  <svg
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='search w-6 h-6'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
        <svg
          className='-mt-10'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
        >
          <path
            fill='#000000'
            fillOpacity='1'
            d='M0,224L48,229.3C96,235,192,245,288,229.3C384,213,480,171,576,144C672,117,768,107,864,101.3C960,96,1056,96,1152,117.3C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
          ></path>
        </svg>
        <div className='flex w-full items-center justify-center mt-40'>
          <div className='border-b border-gray-600 w-64'></div>
          <h2 className='text-md text-gray-600 tracking-wider mx-2'>
            including support for
          </h2>
          <div className='border-b border-gray-600 w-64'></div>
        </div>
        <div className='flex w-full items-center justify-center'>
          <img
            className='h-5 m-2 mx-4'
            src='waitrose_logo.svg'
            alt='waitrose logo'
          />
          <img
            className='h-5 m-2 mt-4 mx-4'
            src='sainsburys_logo.svg'
            alt='sainsburys logo'
          />
          <img
            className='h-5 m-2 mt-4 mx-4'
            src='tesco_logo.svg'
            alt='tesco logo'
          />
        </div>
        <div className='w-full my-64 px-40'>
          <h2 className='text-center text-lg font-semibold tracking-widest'>
            The cheapest prices at your fingertips
          </h2>
          <div className='flex justify-between leading-7'>
            <div className='p-8'>
              <img className='w-64' src='typing.svg' alt='typing' />
              <h2 className='text-lg font-semibold my-5'>
                Easy powerful searching
              </h2>
              <p className='w-64'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam saepe veniam quod porro excepturi modi a delectus
                aliquam aperiam magni!
              </p>
            </div>
            <div className='p-8 mt-12'>
              <img
                className='w-64 mb-10'
                src='nearby_places.svg'
                alt='nearby places'
              />
              <h2 className='text-lg font-semibold my-5'>
                Find the best value near you
              </h2>
              <p className='w-64'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam saepe veniam quod porro excepturi modi a delectus
                aliquam aperiam magni!
              </p>
            </div>
            <div className='p-8'>
              <img
                className='w-64'
                src='drinking_wine.svg'
                alt='drinking wine'
              />
              <h2 className='text-lg font-semibold my-5'>
                Enjoy the finest products
              </h2>
              <p className='w-64'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam saepe veniam quod porro excepturi modi a delectus
                aliquam aperiam magni!
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
