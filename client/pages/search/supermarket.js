import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import Cookie from 'js-cookie';

import { fadeOutPage } from '../../animations/navigation';

import { createQueryString } from '../../utils/supermarketListUtils';
import { supermarketsArr } from '../../data/supermarketsArr';
import { notifyError } from '../../utils/alerts';

const SupermarketSearch = () => {
  const router = useRouter();

  const {
    register: registerSupermarketSearch,
    handleSubmit: handleSupermarketSearchSubmit,
    watch: watchSupermarketSearch,
    errors: errorsSupermarketSearch,
  } = useForm();

  const onSupermarketSearchClick = (data) => {
    if (data.supermarket.length > 0) {
      const supermarketListQueryString = createQueryString(data.supermarket);
      Cookie.set('supermarketList', data.supermarket);
      Cookie.set('queryString', supermarketListQueryString);

      router.push(`/products`);
    } else {
      notifyError(
        'You need to select at least 1 supermarket before trying to search!'
      );
    }
  };

  return (
    <Layout title='Search by Supermarket'>
      <motion.section
        data-testid='section-main'
        variants={fadeOutPage}
        exit='exit'
        initial='initial'
        animate='animate'
        className='text-gray-700'
      >
        <div className=''>
          <div className=''>
            <div className='container mx-auto iPad:px-32 flex flex-col px-5 lg:py-24 pt-16 pb-48 justify-center items-center'>
              <div className='w-full md:w-2/3 iPad:w-full flex flex-col mb-0 lg:mb-16 iPad:py-4 items-center text-center'>
                <h1 className='font-heading sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
                  Search by Supermarket
                </h1>
                <p className='mb-8 leading-relaxed lg:text-base text-sm'>
                  Don't want to give us your postcode? No problem. Just select
                  which supermarkets you want to compare below and click search.
                  We'll gather a list of all available alcohol, along with all
                  the prices.
                </p>
              </div>
              <form
                className='z-10 bg-gray-50 shadow-md rounded-lg flex flex-col md:ml-auto w-full mt-10 md:mt-0'
                onSubmit={handleSupermarketSearchSubmit(
                  onSupermarketSearchClick
                )}
              >
                <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-5 p-5'>
                  {supermarketsArr.map((supermarket) => {
                    return (
                      <motion.label
                        data-testid='label-supermarket'
                        whileHover={{ scale: 1.1 }}
                        className='flex items-center bg-white p-5 rounded-lg shadow-md'
                        key={supermarket.name}
                      >
                        <input
                          data-testid='checkbox-supermarket'
                          className='text-green-500 h-5 w-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 rounded-md border-green-700'
                          type='checkbox'
                          name='supermarket'
                          value={supermarket.name}
                          ref={registerSupermarketSearch}
                        />
                        <img
                          data-testid='image-supermarket'
                          className='ml-10 lg:h-10 h-6 iPadWidescreen:h-6 iPadPro:h-7 inline-block'
                          src={supermarket.svgPath}
                        ></img>
                      </motion.label>
                    );
                  })}
                </div>
                <div className='bg-gray-100 rounded-b-lg flex lg:justify-end justify-center px-5'>
                  <button
                    type='submit'
                    className='my-5 font-medium shadow-sm text-green-50 bg-green-500 border-0 py-2 px-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 hover:bg-green-600 rounded-lg text-lg transition duration-200 ease-in-out'
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <svg
          className='-mt-48 z-0'
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

export default SupermarketSearch;
