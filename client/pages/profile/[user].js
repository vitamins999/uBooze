import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';

const Profile = () => {
  const [currentSection, setCurrentSection] = useState('about');

  const router = useRouter();

  const { user } = router.query;

  const userInfo = useSelector((state) => state.userInfo);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${userInfo.token}`,
    },
  };

  const fetchProfileInfo = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/profile/?username=${user}`,
      config
    );

    return data;
  };

  const { isLoading, error, data, status } = useQuery(
    'profileInfo',
    fetchProfileInfo
  );

  const title = user;

  return (
    <Layout title={title}>
      <main className='grid grid-cols-3 grid-rows-4'>
        {isLoading && <Loader />}
        {status === 'success' && (
          <>
            <section className='row-span-1 col-start-2 my-20'>
              <div className='flex justify-center'>
                <img
                  src={data.avatar}
                  alt='profile image'
                  className='rounded-full w-32 h-32'
                />
                <div className='flex flex-col justify-center ml-8 h-32'>
                  <h2 className='text-2xl font-bold text-gray-900'>
                    {userInfo.displayName}
                  </h2>
                  <h3 className='text-lg'>{userInfo.username}</h3>
                  {data.isUser && (
                    <Link href='/profile/edit'>
                      <a className='mt-2 px-2 py-1 w-32 text-sm font-semibold tracking-tighter text-gray-900 border-gray-400 border text-center rounded-md hover:bg-orange-500 hover:text-white transition ease-in-out duration-100 cursor-pointer'>
                        Edit Profile
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </section>
            <section className='px-32 row-start-2 row-end-5 col-span-3'>
              <div className='flex w-full border-b border-gray-400'>
                <button
                  onClick={() => setCurrentSection('about')}
                  className={`pr-5 py-5 focus:outline-none ${
                    currentSection === 'about'
                      ? 'text-gray-900 font-medium'
                      : 'hover:text-orange-500 transition ease-in-out duration-200'
                  }`}
                >
                  About Me
                </button>
                <button
                  onClick={() => setCurrentSection('drinks')}
                  className={`px-5 py-2 focus:outline-none ${
                    currentSection === 'drinks'
                      ? 'text-gray-900 font-medium'
                      : 'hover:text-orange-500 transition ease-in-out duration-200'
                  }`}
                >
                  Favourite Drinks
                </button>
              </div>
              {currentSection === 'about' && (
                <div className='px-5 mt-10'>
                  <div>
                    <p className='py-5'>
                      Member since{' '}
                      <span className='font-medium'>{data.createdAt}</span>
                    </p>
                    <div className='flex py-5'>
                      <svg
                        className='w-6 h-6 text-gray-900 mr-2'
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
                      <span className='italic font-medium'>
                        {data.location ? data.location : 'No location set'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </Layout>
  );
};

export default Profile;
