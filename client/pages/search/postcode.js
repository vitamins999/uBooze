import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Cookie from 'js-cookie';
import { createQueryString } from '../../utils/supermarketListUtils';
import { fetchSupermarkets } from '../../api/public';

import Layout from '../../components/Layout';

import { fadeOutPage } from '../../animations/navigation';
import { notifyError } from '../../utils/alerts';

const PostcodeSearch = () => {
  const {
    register: postcode,
    handleSubmit: handlePostcodeSubmit,
    watch: postcodeWatch,
    errors: postcodeErrors,
  } = useForm();

  const router = useRouter();

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
      <motion.section
        variants={fadeOutPage}
        exit='exit'
        initial='initial'
        animate='animate'
        className='text-gray-700 body-font bg-hero-blend'
      >
        <div className=''>
          <div className=''>
            <div className='container mx-auto flex flex-col px-5 lg:py-24 pt-16 pb-10 2xl:pt-40 2xl:pb-16 iPadPro:py-56 iPadProWidescreen:pt-32 justify-center items-center'>
              <div className='w-full md:w-2/3 flex flex-col mb-16 items-center text-center'>
                <h1 className='font-heading sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
                  Search by Postcode
                </h1>
                <p className='mb-8 leading-relaxed text-gray-700 text-sm lg:text-base'>
                  Looking for the cheapest alcohol prices near you? We've got
                  you covered. Just type your UK postcode in the box below and
                  we'll gather a list of all available alcohol at your nearest
                  supermarkets, along with all the prices.
                </p>
                <div className='w-full'>
                  <form
                    className='flex justify-center flex-col lg:flex-row items-center'
                    onSubmit={handlePostcodeSubmit(handleSubmitPostcode)}
                  >
                    <span className='self-center lg:mr-4 mr-0 pb-2 lg:pb-0 font-medium'>
                      Search within
                    </span>
                    <select
                      className='shadow-inner text-sm w-full lg:w-auto rounded-md lg:mr-4 mr-0 px-4 transition duration-150 ease-in-out text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                      name='radius'
                      id='radius'
                      ref={postcode({ required: true })}
                    >
                      <option value='1609'>1 Mile</option>
                      <option value='3218'>2 Miles</option>
                      <option value='4828'>3 Miles</option>
                    </select>
                    <span className='self-center lg:mr-4 mr-0 py-2 lg:py-0 font-medium'>
                      of
                    </span>
                    <input
                      className='shadow-inner text-sm rounded-md lg:mr-4 mr-0 transition duration-150 ease-in-out text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2 px-4 lg:w-full xl:w-1/2 2xl:w-1/3 w-full md:w-full iPadWidescreen:w-1/2 iPadPro:w-1/3'
                      placeholder='My postcode is...'
                      type='text'
                      id='unformattedPostcode'
                      name='unformattedPostcode'
                      ref={postcode({ required: true })}
                    />
                    <button
                      className='inline-flex lg:mt-0 mt-5 shadow-md lg:shadow-none lg:text-gray-700 text-green-50 border-0 py-2 px-2 lg:-ml-16 hover:text-green-500 bg-green-500 lg:bg-transparent rounded-lg transition duration-150 ease-in-out'
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
        <svg
          className='-mt-10 z-0'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
        >
          <path
            fill='#55BA82'
            fillOpacity='1'
            d='M0,192L48,186.7C96,181,192,171,288,149.3C384,128,480,96,576,122.7C672,149,768,235,864,240C960,245,1056,171,1152,122.7C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          ></path>
        </svg>
      </motion.section>
    </Layout>
  );
};

export default PostcodeSearch;
