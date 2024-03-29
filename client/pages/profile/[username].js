import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery, usePaginatedQuery } from 'react-query';
import { restAPI } from '../../api/calls';

import { motion } from 'framer-motion';
import { fadeOutPage } from '../../animations/navigation';

import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import CategoryBar from '../../components/CategoryBar';
import ProductResults from '../../components/ProductResults';
import { fetchDrinksFavouritesPublic } from '../../api/public';

const Profile = ({ drinks }) => {
  const [currentSection, setCurrentSection] = useState('about');
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');
  const [limit, setLimit] = useState(10);

  const router = useRouter();

  const { username } = router.query;

  const fetchProfileInfo = async () => {
    const { data } = await restAPI.get(`/profile/?username=${username}`);

    return data;
  };

  const { resolvedData, latestData, statusDrinks } = usePaginatedQuery(
    ['favouriteDrinks', page, username, order, limit],
    fetchDrinksFavouritesPublic,
    {
      initialData: drinks,
    }
  );

  const { isLoading, error, data, status } = useQuery(
    'profileInfo',
    fetchProfileInfo
  );

  const title = username;

  return (
    <Layout title={title}>
      <motion.main
        variants={fadeOutPage}
        exit='exit'
        initial='initial'
        animate='animate'
        className='flex flex-col'
      >
        {isLoading && <Loader />}
        {status === 'success' && (
          <>
            <section className='my-20 iPadPro:my-32'>
              <div className='flex justify-center'>
                <img
                  src={data.avatar}
                  alt='profile image'
                  className='rounded-full lg:w-32 lg:h-32 w-24 h-24 my-auto'
                />
                <div className='flex flex-col justify-center ml-8 h-32'>
                  <h2 className='lg:text-2xl text-xl font-bold text-gray-900'>
                    {data.displayName}
                  </h2>
                  <h3 className='lg:text-lg text-base'>{data.username}</h3>
                  {data.isUser && (
                    <Link href='/profile/edit'>
                      <a className='mt-2 px-4 py-2 w-32 text-sm font-medium text-gray-700 border-gray-300 border text-center rounded-lg shadow-sm hover:bg-gray-50 transition ease-in-out duration-200'>
                        Edit Profile
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </section>
            <section className='lg:px-32 px-8 pb-32 iPadPro:pb-80 iPadWidescreen:px-16 iPadPro:px-16'>
              <div className='flex w-full border-b border-gray-200'>
                <button
                  onClick={() => setCurrentSection('about')}
                  className={`pr-5 py-5 focus:outline-none ${
                    currentSection === 'about'
                      ? 'text-gray-900 font-medium'
                      : 'hover:text-green-500 transition ease-in-out duration-200 tracking-wide'
                  }`}
                >
                  About Me
                </button>
                <button
                  onClick={() => setCurrentSection('drinks')}
                  className={`px-5 py-2 focus:outline-none ${
                    currentSection === 'drinks'
                      ? 'text-gray-900 font-medium'
                      : 'hover:text-green-500 transition ease-in-out duration-200 tracking-wide'
                  }`}
                >
                  Favourite Drinks
                </button>
              </div>
              {currentSection === 'about' && (
                <div className='flex w-full justify-between lg:flex-row flex-col'>
                  <div className='mt-10'>
                    <div className='bg-gray-100 w-full px-8 py-5 rounded-lg text-sm shadow-sm text-gray-700'>
                      <div className='flex align-middle'>
                        <svg
                          className='w-6 h-6 mr-3 text-green-700'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                          ></path>
                        </svg>
                        <p className='mb-4 py-1'>
                          Member since{' '}
                          <span className='font-medium'>{data.createdAt}</span>
                        </p>
                      </div>
                      <div className='flex'>
                        <svg
                          className='w-6 h-6 text-green-700 mr-3'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          ></path>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          ></path>
                        </svg>
                        <span className='italic font-medium py-1'>
                          {data.location ? data.location : 'No location set'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='mt-10 lg:text-md text-sm lg:pb-4 pb-10 py-5 lg:w-3/5 w-auto border-b'>
                    <h3 className='font-semibold'>Bio</h3>
                    <p className='py-3 text-gray-500'>
                      {data.bio
                        ? data.bio
                        : `${data.displayName} hasn't written a bio.  That's a shame.`}
                    </p>
                  </div>
                </div>
              )}
              {currentSection === 'drinks' && (
                <div>
                  <CategoryBar
                    primary='favourites'
                    title={`${username}'s Favourite Drinks`}
                    resolvedData={resolvedData}
                  />
                  <div className='-mt-20'>
                    <ProductResults
                      resolvedData={resolvedData}
                      order={order}
                      setOrder={setOrder}
                      limit={limit}
                      setLimit={setLimit}
                      setPage={setPage}
                      page={page}
                      publicProfilePage={true}
                    />
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </motion.main>
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const drinks = await fetchDrinksFavouritesPublic(
      (username = params.username)
    );

    return {
      props: {
        drinks,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default Profile;
