import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import {
  fetchSupermarkets,
  createQueryString,
} from '../../utils/supermarketListUtils';

import Layout from '../../components/Layout';

const PostcodeSearch = () => {
  const [postcode, setPostcode] = useState('');
  const router = useRouter();

  const handleSubmitPostcode = async (e) => {
    e.preventDefault();
    const supermarketList = await fetchSupermarkets(postcode);
    supermarketList.sort((a, b) => a.localeCompare(b));

    if (supermarketList.length > 0) {
      const supermarketListQueryString = createQueryString(supermarketList);

      Cookie.set('currentPostcode', postcode);
      Cookie.set('supermarketList', supermarketList);
      Cookie.set('queryString', supermarketListQueryString);

      router.push(`/products`);
    } else {
      console.log('No supermarkets found');
    }
  };

  return (
    <Layout title='Search by Postcode'>
      <section className='text-gray-700 body-font bg-hero-blend'>
        <div className='bg-hero-image h-screen bg-contain bg-no-repeat bg-center'>
          <div className='bg-white h-screen bg-opacity-50'>
            <div className='container mx-auto flex flex-col px-5 py-24 justify-center items-center'>
              <div className='w-full md:w-2/3 flex flex-col mb-16 items-center text-center'>
                <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
                  Search by Postcode
                </h1>
                <p className='mb-8 leading-relaxed'>
                  Looking for the cheapest alcohol prices near you? We've got
                  you covered. Just type your UK postcode in the box below and
                  we'll gather a list of all available alcohol at your nearest
                  supermarkets, along with all the prices.
                </p>
                <div className='w-full'>
                  <form
                    className='flex justify-center'
                    onSubmit={handleSubmitPostcode}
                  >
                    <input
                      className='border-2 bg-orange-200 rounded mr-4 border-gray-700 focus:outline-none focus:border-gray-900 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 text-base px-4 lg:w-full xl:w-1/2 w-2/4 md:w-full'
                      placeholder='My postcode is...'
                      type='text'
                      onChange={(e) =>
                        setPostcode(
                          e.target.value.split(' ').join('').toUpperCase()
                        )
                      }
                    />
                    <button
                      className='inline-flex text-gray-700 border-0 py-2 px-2 -ml-16 hover:text-gray-900'
                      type='submit'
                    >
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PostcodeSearch;
