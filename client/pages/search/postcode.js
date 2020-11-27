import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookie from 'js-cookie';
import {
  fetchSupermarkets,
  createQueryString,
} from '../../utils/supermarketListUtils';

import Layout from '../../components/Layout';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const PostcodeSearch = () => {
  const {
    register: postcode,
    handleSubmit: handlePostcodeSubmit,
    watch: postcodeWatch,
    errors: postcodeErrors,
  } = useForm();

  const router = useRouter();

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleSubmitPostcode = async ({ unformattedPostcode, radius }) => {
    const postcode = unformattedPostcode.split(' ').join('').toUpperCase();
    const supermarketList = await fetchSupermarkets(postcode, radius);
    supermarketList.sort((a, b) => a.localeCompare(b));

    if (supermarketList.length > 0) {
      const supermarketListQueryString = createQueryString(supermarketList);

      Cookie.set('currentPostcode', postcode);
      Cookie.set('supermarketList', supermarketList);
      Cookie.set('queryString', supermarketListQueryString);

      router.push(`/products`);
    } else {
      notifyError(
        'No supermarkets found! Try increasing the search distance or try another postcode!'
      );
    }
  };

  useEffect(() => {
    if (postcodeErrors.unformattedPostcode?.type === 'required') {
      notifyError('Postcode is required!');
    }
  }, [postcodeErrors]);

  return (
    <Layout title='Search by Postcode'>
      <section className='text-gray-700 body-font bg-hero-blend'>
        <div className='bg-hero-image h-screen bg-contain bg-no-repeat bg-center'>
          <div className='bg-green-200 h-screen bg-opacity-50'>
            <div className='container mx-auto flex flex-col px-5 py-24 justify-center items-center'>
              <div className='w-full md:w-2/3 flex flex-col mb-16 items-center text-center'>
                <h1 className='font-heading sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
                  Search by Postcode
                </h1>
                <p className='mb-8 leading-relaxed text-gray-700'>
                  Looking for the cheapest alcohol prices near you? We've got
                  you covered. Just type your UK postcode in the box below and
                  we'll gather a list of all available alcohol at your nearest
                  supermarkets, along with all the prices.
                </p>
                <div className='w-full'>
                  <form
                    className='flex justify-center'
                    onSubmit={handlePostcodeSubmit(handleSubmitPostcode)}
                  >
                    <span className='self-center mr-4 font-medium'>
                      Search within
                    </span>
                    <select
                      className='shadow-inner rounded-md mr-4 px-4 transition duration-150 ease-in-out text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                      name='radius'
                      id='radius'
                      ref={postcode({ required: true })}
                    >
                      <option value='1609'>1 Mile</option>
                      <option value='3218'>2 Miles</option>
                      <option value='4828'>3 Miles</option>
                    </select>
                    <span className='self-center mr-4 font-medium'>of</span>
                    <input
                      className='shadow-inner rounded-md mr-4 transition duration-150 ease-in-out text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2 px-4 lg:w-full xl:w-1/2 w-2/4 md:w-full'
                      placeholder='My postcode is...'
                      type='text'
                      id='unformattedPostcode'
                      name='unformattedPostcode'
                      ref={postcode({ required: true })}
                    />
                    <button
                      className='inline-flex text-gray-700 border-0 py-2 px-2 -ml-16 hover:text-green-500 transition duration-150 ease-in-out'
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
