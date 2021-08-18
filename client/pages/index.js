import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { useInView } from 'react-intersection-observer';
import Cookie from 'js-cookie';

import Layout from '../components/Layout';

import { createQueryString } from '../utils/supermarketListUtils';
import { fetchSupermarkets } from '../api/public';
import { notifyError } from '../utils/alerts';

const Home = () => {
  const {
    register: postcode,
    handleSubmit: handlePostcodeSubmit,
    watch: postcodeWatch,
    errors: postcodeErrors,
  } = useForm();

  const router = useRouter();

  const useInViewOptions = {
    triggerOnce: true,
    rootMargin: '-75px 0px',
  };

  const useInViewOptionsMemberItems = {
    triggerOnce: true,
    rootMargin: '-100px 0px',
  };

  const [refSearchOptionsTitle, inViewSearchOptionsTitle] =
    useInView(useInViewOptions);
  const [refSearchOptionsBody, inViewSearchOptionsBody] =
    useInView(useInViewOptions);
  const [refMemberBenefitsTitle, inViewMemberBenefitsTitle] =
    useInView(useInViewOptions);
  const [refMemberBenefitsBody, inViewMemberBenefitsBody] = useInView(
    useInViewOptionsMemberItems
  );

  const onPostcodeSearchSubmit = async ({ unformattedPostcode, radius }) => {
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

  const heroVariants = {
    start: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const optionsVariants = {
    start: {
      opacity: 0,
      y: 200,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const memberVariants = {
    start: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const memberItemVariantsLeft = {
    start: {
      opacity: 0,
      x: -200,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const memberItemVariantsRight = {
    start: {
      opacity: 0,
      x: 200,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const title = 'Home';

  return (
    <Layout title={title} landingPage={true}>
      <motion.div exit={{ opacity: 0 }}>
        <section className='text-gray-700 body-font'>
          <motion.div
            variants={heroVariants}
            initial='start'
            animate='animate'
            className='container pl-5 pr-3 pb-24 pt-32 mx-auto flex flex-wrap items-center'
          >
            <div className='lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0'>
              <div className='uppercase flex justify-between w-3/5 text-gray-400 mb-4 tracking-widest'>
                <p>We</p>
                <p>Are</p>
                <p>ubooze</p>
                <p>and</p>
                <p>we</p>
                <p>specialise</p>
                <p>in</p>
              </div>
              <h1 className='font-heading font-medium text-5xl text-gray-900'>
                Cheap drinks. In your area.
              </h1>
              <p className='leading-relaxed mt-4'>
                Alcohol is expensive. Supermarkets are everywhere. That's why we
                created{' '}
                <span className='font-heading text-green-700 font-semibold'>
                  ubooze
                </span>{' '}
                -- a price comparison website specifically for supermarket
                alcohol prices, engineered to find the cheapest deals closest to
                you.
              </p>
            </div>
            <form
              onSubmit={handlePostcodeSubmit(onPostcodeSearchSubmit)}
              className='z-10 lg:w-2/6 md:w-1/2 bg-gray-200 shadow-sm rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0'
            >
              <div className='relative mb-4'>
                <h2 className='text-gray-900 text-lg font-medium font-heading mb-5'>
                  Search supermarket prices near you
                </h2>
                <label className='leading-7 text-sm text-gray-600'>
                  I want to search within
                </label>
                <select
                  name='radius'
                  id='radius'
                  ref={postcode({ required: true })}
                  className='w-40 ml-7 shadow-inner rounded-md py-2 px-4 transition duration-150 ease-in-out text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                >
                  <option value='1609'>1 Mile</option>
                  <option value='3218'>2 Miles</option>
                  <option value='4828'>3 Miles</option>
                </select>
              </div>
              <div className='relative mb-4'>
                <label className='leading-7 text-sm text-gray-600'>
                  of the postcode{' '}
                </label>
                <input
                  type='text'
                  id='unformattedPostcode'
                  name='unformattedPostcode'
                  ref={postcode({ required: true })}
                  placeholder='Enter postcode...'
                  className='mt-1 ml-6 shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                />
              </div>
              <button
                type='submit'
                className='text-lg shadow-sm border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-green-50 font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
              >
                Find cheap drinks
              </button>
              <p className='text-xs text-gray-500 mt-3'>UK postcodes only.</p>
            </form>
          </motion.div>
          <svg
            className='-mt-48 z-0'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1440 320'
          >
            <path
              fill='#10B981'
              fillOpacity='1'
              d='M0,192L48,186.7C96,181,192,171,288,149.3C384,128,480,96,576,122.7C672,149,768,235,864,240C960,245,1056,171,1152,122.7C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
            ></path>
          </svg>
        </section>

        <section className='text-gray-800 body-font bg-green-500'>
          <div className='container px-5 py-24 mx-auto'>
            <motion.div
              ref={refSearchOptionsTitle}
              variants={optionsVariants}
              initial='start'
              animate={inViewSearchOptionsTitle && 'animate'}
              className='text-center mb-20'
            >
              <motion.h1
                variants={optionsVariants}
                className='sm:text-3xl text-2xl font-medium font-heading text-gray-900 mb-4'
              >
                Easy Search Options
              </motion.h1>
              <motion.p
                variants={optionsVariants}
                className='text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto'
              >
                We want to make it as easy as possible for you to find the
                cheapest alcohol deals. That's why we've provided the following
                different search options, so you can search for the drinks you
                want, the way you want.
              </motion.p>
              <div className='flex mt-6 justify-center'>
                <div className='w-16 h-1 rounded-full bg-gray-500 inline-flex'></div>
              </div>
            </motion.div>

            <motion.div
              ref={refSearchOptionsBody}
              variants={optionsVariants}
              initial='start'
              animate={inViewSearchOptionsBody && 'animate'}
              className='flex flex-wrap -m-4'
            >
              <motion.div variants={optionsVariants} className='p-4 md:w-1/3'>
                <div className='flex rounded-lg h-full bg-gray-100 p-8 flex-col shadow-md'>
                  <div className='flex items-center mb-3'>
                    <div className='w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='w-5 h-5'
                      >
                        <circle cx='12' cy='12' r='10'></circle>
                        <line x1='2' y1='12' x2='22' y2='12'></line>
                        <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'></path>
                      </svg>
                    </div>
                    <h2 className='text-gray-900 text-lg title-font font-medium'>
                      Search by postcode
                    </h2>
                  </div>
                  <div className='flex-grow'>
                    <p className='leading-relaxed text-base text-gray-700'>
                      Simply type your postcode in and select the mile radius,
                      and we'll find the supermarkets near you and their prices.
                    </p>
                    <Link href='/search/postcode'>
                      <a className='mt-3 text-green-500 inline-flex items-center hover:text-green-600 transition duration-200 ease-in-out'>
                        Learn More
                        <svg
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          className='w-4 h-4 ml-2'
                          viewBox='0 0 24 24'
                        >
                          <path d='M5 12h14M12 5l7 7-7 7'></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={optionsVariants} className='p-4 md:w-1/3'>
                <div className='flex rounded-lg h-full bg-gray-100 p-8 flex-col shadow-md'>
                  <div className='flex items-center mb-3'>
                    <div className='w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='w-4 h-4'
                      >
                        <circle cx='9' cy='21' r='1'></circle>
                        <circle cx='20' cy='21' r='1'></circle>
                        <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
                      </svg>
                    </div>
                    <h2 className='text-gray-900 text-lg title-font font-medium'>
                      Search by supermarket
                    </h2>
                  </div>
                  <div className='flex-grow'>
                    <p className='leading-relaxed text-base text-gray-700'>
                      Don't want to give us your postcode? No problem. Just
                      select manually what supermarkets you want to compare.
                    </p>
                    <Link href='/search/supermarket'>
                      <a className='mt-3 text-green-500 inline-flex items-center hover:text-green-600 transition duration-200 ease-in-out'>
                        Learn More
                        <svg
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          className='w-4 h-4 ml-2'
                          viewBox='0 0 24 24'
                        >
                          <path d='M5 12h14M12 5l7 7-7 7'></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={optionsVariants}
                className='p-4 md:w-1/3 z-10'
              >
                <div className='flex rounded-lg h-full bg-gray-100 p-8 flex-col shadow-md'>
                  <div className='flex items-center mb-3'>
                    <div className='w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0'>
                      <svg
                        className='w-5 h-5'
                        viewBox='0 0 512 512'
                        fill='white'
                        stroke='currentColor'
                      >
                        <path
                          d='M266.667,448.213V276.779c71.488-5.483,128-65.259,128-138.133c0-30.144-16.107-80.213-27.883-116.779l-4.608-14.4
    C360.768,3.029,356.672,0,352,0H161.579c-4.437,0-8.427,2.752-9.984,6.891c-10.304,27.307-34.261,94.763-34.261,131.776
    c0,72.853,56.512,132.651,128,138.133v171.435c-53.525,2.176-106.667,20.629-106.667,53.12c0,5.867,4.779,10.645,10.667,10.645
    h213.333c5.888,0,10.667-4.779,10.667-10.667C373.333,468.843,320.171,450.389,266.667,448.213z M139.2,149.333
    c-0.32-3.52-0.533-7.061-0.533-10.667c0-25.899,15.211-76.309,30.315-117.333h175.232l2.261,7.104
    c10.688,33.216,26.859,83.435,26.859,110.229c0,3.605-0.213,7.147-0.533,10.667H139.2z'
                        />
                      </svg>
                    </div>
                    <h2 className='text-gray-900 text-lg title-font font-medium'>
                      Search by drink
                    </h2>
                  </div>
                  <div className='flex-grow'>
                    <p className='leading-relaxed text-base text-gray-700'>
                      Have a specific drink in mind? Search for it here and see
                      all prices for it across all supermarkets.
                    </p>
                    <Link href='/search/drink'>
                      <a className='mt-3 text-green-500 inline-flex items-center hover:text-green-600 transition duration-200 ease-in-out'>
                        Learn More
                        <svg
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          className='w-4 h-4 ml-2'
                          viewBox='0 0 24 24'
                        >
                          <path d='M5 12h14M12 5l7 7-7 7'></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          <svg
            className='-mt-44 z-0'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1440 320'
          >
            <path
              fill='white'
              fillOpacity='1'
              d='M0,192L48,186.7C96,181,192,171,288,149.3C384,128,480,96,576,122.7C672,149,768,235,864,240C960,245,1056,171,1152,122.7C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
            ></path>
          </svg>
        </section>

        <section className='text-gray-700 body-font'>
          <div className='container px-5 py-24 mx-auto'>
            <motion.div
              ref={refMemberBenefitsTitle}
              variants={optionsVariants}
              initial='start'
              animate={inViewMemberBenefitsTitle && 'animate'}
              className='text-center'
            >
              <h1 className='sm:text-3xl text-2xl font-medium text-center font-heading text-gray-900 mb-4'>
                Member Benefits
              </h1>
              <p className='text-gray-700 leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto'>
                Sign up for a free account right now, and gain all the following
                extra benefits and more, as they're added.
              </p>
              <div className='flex mb-20 mt-6 justify-center'>
                <div className='w-16 h-1 rounded-full bg-green-500 inline-flex'></div>
              </div>
            </motion.div>

            <motion.div
              ref={refMemberBenefitsBody}
              variants={memberVariants}
              initial='start'
              animate={inViewMemberBenefitsBody && 'animate'}
              className='flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2'
            >
              <motion.div
                variants={memberItemVariantsLeft}
                className='p-2 sm:w-1/2 w-full'
              >
                <div className='bg-gray-200 rounded flex p-4 h-full items-center'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='text-green-500 w-6 h-6 flex-shrink-0 mr-4'
                    viewBox='0 0 24 24'
                  >
                    <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                    <path d='M22 4L12 14.01l-3-3'></path>
                  </svg>
                  <span className='title-font font-medium'>
                    Public profile page
                  </span>
                </div>
              </motion.div>
              <motion.div
                variants={memberItemVariantsRight}
                className='p-2 sm:w-1/2 w-full'
              >
                <div className='bg-gray-200 rounded flex p-4 h-full items-center'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='text-green-500 w-6 h-6 flex-shrink-0 mr-4'
                    viewBox='0 0 24 24'
                  >
                    <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                    <path d='M22 4L12 14.01l-3-3'></path>
                  </svg>
                  <span className='title-font font-medium'>
                    Save your favourite drinks
                  </span>
                </div>
              </motion.div>
              <motion.div
                variants={memberItemVariantsLeft}
                className='p-2 sm:w-1/2 w-full'
              >
                <div className='bg-gray-200 rounded flex p-4 h-full items-center'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='text-green-500 w-6 h-6 flex-shrink-0 mr-4'
                    viewBox='0 0 24 24'
                  >
                    <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                    <path d='M22 4L12 14.01l-3-3'></path>
                  </svg>
                  <span className='title-font font-medium'>Rate products</span>
                </div>
              </motion.div>
              <motion.div
                variants={memberItemVariantsRight}
                className='p-2 sm:w-1/2 w-full'
              >
                <div className='bg-gray-200 rounded flex p-4 h-full items-center'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='text-green-500 w-6 h-6 flex-shrink-0 mr-4'
                    viewBox='0 0 24 24'
                  >
                    <path d='M22 11.08V12a10 10 0 11-5.93-9.14'></path>
                    <path d='M22 4L12 14.01l-3-3'></path>
                  </svg>
                  <span className='title-font font-medium'>
                    Google and Facebook login compatible
                  </span>
                </div>
              </motion.div>
            </motion.div>
            <a>
              <motion.button
                initial={{ opacity: 0, y: 200 }}
                animate={inViewMemberBenefitsBody && { opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                onClick={() => router.push('/signup')}
                className='flex mx-auto mt-16 font-medium shadow-sm text-green-50 bg-green-500 border-0 py-2 px-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 hover:bg-green-600 rounded-lg text-lg transition duration-200 ease-in-out'
              >
                Sign up now
              </motion.button>
            </a>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
};

export default Home;
