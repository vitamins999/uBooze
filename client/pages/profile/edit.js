import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import Link from 'next/link';

const EditProfile = () => {
  const [currentSection, setCurrentSection] = useState('public');
  const [hoverOnName, setHoverOnName] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${userInfo.token}`,
    },
  };

  const fetchCurrentProfile = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/profile/currentUser`,
      config
    );

    return data;
  };

  const { isLoading, error, data, status } = useQuery(
    'currentProfile',
    fetchCurrentProfile
  );

  const title = 'Edit Profile';

  return (
    <Layout title={title}>
      <main className='grid grid-cols-10 grid-rows-3'>
        {isLoading && <Loader />}
        {status === 'success' && (
          <section className='row-span-1 col-start-3 col-end-9 my-16'>
            <div className='flex'>
              <img
                src={data.gravatar}
                alt='profile image'
                className={`rounded-full w-20 h-20 ${
                  hoverOnName &&
                  'opacity-75 transition ease-in-out duration-100'
                }`}
              />
              <div className='flex flex-col justify-center ml-8'>
                <h2 className='text-lg font-bold text-gray-900 tracking-tighter'>
                  <Link href={`/profile/${data.username}`}>
                    <a
                      onMouseEnter={() => setHoverOnName(true)}
                      onMouseLeave={() => setHoverOnName(false)}
                      className='hover:text-orange-500 transition ease-in-out duration-100'
                    >
                      {data.displayName}
                    </a>
                  </Link>
                  <span>
                    {' '}
                    / {currentSection === 'public' && 'Edit Public Profile'}
                  </span>
                </h2>
                <h3 className='text-md'>Edit your public profile details.</h3>
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
};

export default EditProfile;
