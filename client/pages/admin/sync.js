import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { restAPI } from '../../api/calls';
import Layout from '../../components/Layout';
import {
  capitaliseFirstLetter,
  supermarketLogo,
} from '../../utils/supermarketListUtils';
import { supermarketsArr } from '../../data/supermarketsArr';
import { notifyError, notifySuccess } from '../../utils/alerts';

const SyncPage = () => {
  const [inProgress, setInprogress] = useState('');

  const router = useRouter();

  const userInfo = useSelector((state) => state.userInfo);
  const { isAdmin } = userInfo;

  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin]);

  const handleSyncData = async (supermarket) => {
    try {
      setInprogress('Syncing... Please wait...');
      await restAPI.get(`/scraper/${supermarket}`);
      notifySuccess(
        `${capitaliseFirstLetter(supermarket)} updated successfully!`
      );
      setInprogress('Sync Complete!');
    } catch (error) {
      notifyError(`Oops! ${error.message}`);
    }
  };

  const title = 'Admin Panel - Sync Supermarket Data';

  return (
    <Layout title={title}>
      <main className='flex flex-col justify-center items-center mt-10 mb-40'>
        <h2 className='text-5xl font-heading font-bold my-10'>
          Sync Supermarket Data
        </h2>
        <ul className='mt-10'>
          {supermarketsArr.map((supermarket, index) => (
            <li
              key={index}
              className='grid grid-cols-3 items-center grid-gap-10 py-10'
            >
              <img
                className='h-10 mr-10'
                src={supermarketLogo(supermarket.name)}
                alt={supermarket.name}
              />
              <button
                onClick={() => handleSyncData(supermarket.routeName)}
                className='text-sm shadow-sm tracking-tight w-52 bg-green-500 transition duration-100 hover:bg-green-700 text-green-50 font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline'
              >
                Sync {capitaliseFirstLetter(supermarket.name)}
              </button>
              <p className='italic text-sm ml-16'>{inProgress}</p>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export default SyncPage;
