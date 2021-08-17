import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

import { motion } from 'framer-motion';
import { fadeOutPage } from '../../animations/navigation';

import Layout from '../../components/Layout';
import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import { notifyError } from '../../utils/alerts';
import {
  capitaliseFirstLetter,
  formatter,
  supermarketLogo,
  subtypeFormat,
} from '../../utils/supermarketListUtils';
import { updateFavourites } from '../../lib/slices/userInfoSlice';
import { fetchDrinkInfo, fetchOverallProductRating } from '../../api/public';
import {
  fetchUserRatingPrivate,
  saveUserRatingPrivate,
  saveFavouriteStatusPrivate,
} from '../../api/private';

const ItemPage = ({ itemData }) => {
  const router = useRouter();
  const { item: itemID } = router.query;

  // This may look simple, but it's so specific I thought best to address it for clarity's sake.
  // It's a bit of a hack needed to get Framer Motion's animatePresence to
  // work properly with Nextjs and React Query. AnimatePresence needs to be wrapped around the components in _app.js
  // to work, but from what I can tell, it takes a second or so for the animation to run when it
  // unmounts the component when exiting, which has the side effect of setting the query parameter on this page to null
  // when navigating to a new page from this one. Normally, this wouldn't be a problem, but React Query automatically
  // retries to fetch the data.  Except now it has null as the productID it's checking on the API. It gets nothing back,
  // and all the functions that rely on that value crash because they have null to work with. I fixed it giving it a default
  // value of '1' if the value returned from the query string is null. We never see what it fetches, but it stops crashing. Phew!
  const item = itemID ? itemID : '1';

  const [productRating, setProductRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [numRating, setNumRating] = useState(0);

  const [isFavourite, setIsFavourite] = useState(false);
  const { favourites, token, userID } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  const { data, status } = useQuery(['drinkInfo', item], fetchDrinkInfo, {
    initialData: itemData,
  });

  const fetchProductRating = async () => {
    try {
      const data = await fetchOverallProductRating(item);
      setProductRating(data.rating);
      setNumRating(data.numRating);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserRating = async () => {
    try {
      const data = await fetchUserRatingPrivate(item);
      setUserRating(data.rating);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUserRatingClick = async (rating) => {
    if (userID) {
      try {
        const data = await saveUserRatingPrivate(item, rating);
        setUserRating(data.rating);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      notifyError(
        'Easy there! You need to be logged in before you can rate a drink!'
      );
    }
  };

  const handleFavouriteButtonClick = async () => {
    if (userID) {
      setIsFavourite(!isFavourite);
      try {
        await saveFavouriteStatusPrivate(item);
        dispatch(updateFavourites(token));
      } catch (error) {
        console.log(error.message);
      }
    } else {
      notifyError(
        'Easy there! You need to be logged in before you can favourite a drink!'
      );
    }
  };

  useEffect(() => {
    if (favourites) {
      const id = favourites.find((productID) => productID === Number(item));
      if (id) {
        setIsFavourite(true);
      }
    }
  }, [favourites]);

  useEffect(() => {
    if (userID) {
      fetchUserRating();
      fetchProductRating();
    }
  }, [userID, userRating, productRating]);

  useEffect(() => {
    fetchProductRating();
  }, []);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <div>Error fetching data</div>;
  }

  const title = `${data.productName} ${data.volume}`;

  const shareURL = `http://localhost:3000${router.asPath}`;
  const shareQuote = `uBooze - The cheapest deals on ${data.productName} ${data.volume}`;

  return (
    <Layout
      title={title}
      image={data.supermarketProducts[0].image}
      description={shareQuote}
      url={shareURL}
    >
      {status === 'success' && (
        <motion.main
          variants={fadeOutPage}
          exit='exit'
          initial='initial'
          animate='animate'
        >
          <section className='text-gray-700 body-font overflow-hidden'>
            <div className='container mx-auto px-2 pt-6 pb-4 font-heading'>
              <h2 className='inline-block text-gray-500'>
                <Link href='/'>
                  <a className='hover:text-green-500 transition duration-200 ease-in-out'>
                    Home
                  </a>
                </Link>
              </h2>
              <span className='text-gray-500'> / </span>
              <h2 className='inline-block text-gray-500'>
                {data.drinkType === 'beer' ? (
                  <Link href='/products/beer'>
                    <a className='hover:text-green-500 transition duration-200 ease-in-out'>
                      Beer & Cider
                    </a>
                  </Link>
                ) : (
                  <Link href={`/products/${data.drinkType}`}>
                    <a className='hover:text-green-500 transition duration-200 ease-in-out'>
                      {capitaliseFirstLetter(data.drinkType)}
                    </a>
                  </Link>
                )}
              </h2>
              <span className='text-gray-500'> / </span>
              <h2 className='inline-block text-gray-500'>
                <Link
                  href={`/products/${
                    data.drinkType === 'beer' ? 'beer' : data.drinkType
                  }/${data.drinkSubtype}`}
                >
                  <a className='hover:text-green-500 transition duration-200 ease-in-out'>
                    {subtypeFormat(data.drinkSubtype)}
                  </a>
                </Link>
              </h2>
              <span className='text-gray-500'> / </span>
              <h2 className='inline-block'>{data.productName}</h2>
            </div>
            <div className='container px-5 pt-20 pb-32 mx-auto'>
              <div className='lg:w-4/5 mx-auto flex justify-center items-center'>
                <img
                  alt='ecommerce'
                  className='w-64 object-cover object-center p-5'
                  src={data.supermarketProducts[0].image}
                />
                <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
                  <div className='flex justify-between'>
                    <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                      {capitaliseFirstLetter(data.drinkType)} |{' '}
                      {subtypeFormat(data.drinkSubtype)}
                    </h2>
                    {isFavourite ? (
                      <motion.svg
                        whileHover={{ scale: 1.2 }}
                        onClick={handleFavouriteButtonClick}
                        className={`w-6 h-6 z-30 text-gray-700 cursor-pointer`}
                        fill='#374151'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                        ></path>
                      </motion.svg>
                    ) : (
                      <motion.svg
                        whileHover={{ scale: 1.2 }}
                        onClick={handleFavouriteButtonClick}
                        className='w-6 h-6 z-30 text-gray-700 cursor-pointer'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                        ></path>
                      </motion.svg>
                    )}
                  </div>
                  <h1 className='text-gray-900 text-3xl font-heading font-medium mb-1'>
                    {data.productName}
                  </h1>
                  <h2 className='mb-4'>{data.volume}</h2>
                  <div className='flex mb-4 items-center'>
                    <Rating
                      value={productRating}
                      text={`${numRating} Rating${numRating === 1 ? '' : 's'}`}
                      user={userID ? 'true' : 'false'}
                      userRating={userRating}
                      userRatingHandler={handleUserRatingClick}
                    />
                    <span className='flex ml-3 pl-3 py-2 border-l-2 border-gray-200'>
                      <FacebookShareButton
                        url={shareURL}
                        quote={shareQuote}
                        hashtag='#ubooze'
                        className='focus:outline-none hover:opacity-80 transition duration-200 ease-in-out'
                      >
                        <FacebookIcon size={32} round className='mr-1' />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={shareURL}
                        title={shareQuote}
                        hashtags={['ubooze', 'cheapdrinks', 'deals']}
                        className='focus:outline-none hover:opacity-80 transition duration-200 ease-in-out'
                      >
                        <TwitterIcon size={32} round className='mr-1' />
                      </TwitterShareButton>
                      <RedditShareButton
                        url={shareURL}
                        title={shareQuote}
                        className='focus:outline-none hover:opacity-80 transition duration-200 ease-in-out'
                      >
                        <RedditIcon size={32} round className='mr-1' />
                      </RedditShareButton>
                      <EmailShareButton
                        url={shareURL}
                        subject={shareQuote}
                        className='focus:outline-none hover:opacity-80 transition duration-200 ease-in-out'
                      >
                        <EmailIcon size={32} round />
                      </EmailShareButton>
                    </span>
                  </div>
                  <p className='leading-relaxed'></p>
                  <div className='flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5'></div>
                  <div className='flex'>
                    <span className='title-font font-medium text-2xl '>
                      {data.supermarketProducts[0].price > 0
                        ? 'from '
                        : 'Out of Stock'}
                    </span>
                    <span
                      className={`title-font font-medium text-2xl text-gray-900 ml-2 ${
                        data.supermarketProducts[0].price === 0 && 'hidden'
                      }`}
                    >
                      {formatter.format(
                        data.supermarketProducts[0].price / 100
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='text-gray-700 body-font'>
            <div className='container px-5 pb-24 mx-auto'>
              <div className='flex flex-col text-center w-full mb-10'>
                <h1 className='sm:text-4xl text-3xl font-medium font-heading mb-2 text-gray-900'>
                  Compare Prices
                </h1>
              </div>
              <div className='lg:w-2/3 w-full mx-auto overflow-auto'>
                <table className='table-auto w-full text-left whitespace-no-wrap'>
                  <thead>
                    <tr>
                      <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tl rounded-bl'>
                        Supermarket
                      </th>
                      <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200'>
                        Offer
                      </th>

                      <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200'>
                        Price
                      </th>
                      <th className='w-48 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tr rounded-br'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.supermarketProducts.map((supermarket, index) => {
                      return (
                        <tr key={index}>
                          <td className='border-t-2 border-gray-200 px-4 py-3'>
                            <img
                              src={supermarketLogo(supermarket.supermarket)}
                              alt='logo'
                              className='h-8'
                            />
                          </td>
                          <td className='border-t-2 border-gray-200 px-4 py-3 text-xs'>
                            {supermarket.offer}
                          </td>
                          {supermarket.price ===
                          data.supermarketProducts[0].price ? (
                            <td
                              className={`border-t-2 border-gray-200 px-4 py-3 font-medium ${
                                supermarket.price === 0
                                  ? 'text-xs text-gray-600'
                                  : 'text-lg text-gray-900'
                              }`}
                            >
                              {supermarket.price > 0
                                ? formatter.format(supermarket.price / 100)
                                : 'Out of Stock'}
                            </td>
                          ) : (
                            <td
                              className={`border-t-2 border-gray-200 px-4 py-3 text-gray-600 ${
                                supermarket.price === 0 ? 'text-xs' : 'text-lg'
                              }`}
                            >
                              {supermarket.price > 0
                                ? formatter.format(supermarket.price / 100)
                                : 'Out of Stock'}
                            </td>
                          )}
                          <td className='border-t-2 border-gray-200 w-10'>
                            <a
                              href={supermarket.link}
                              target='_blank'
                              rel='noopener noreferrer'
                              className={`${
                                supermarket.price ===
                                data.supermarketProducts[0].price
                                  ? 'text-white bg-green-500  hover:bg-green-600 border-transparent'
                                  : 'text-gray-700 bg-white hover:text-gray-800 hover:bg-gray-100 border-gray-300'
                              } flex ml-auto w-auto mr-4 shadow-sm py-2 px-4 border rounded-lg justify-center text-sm font-medium transition duration-200 ease-in-out`}
                            >
                              Go to {supermarket.supermarket}
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </motion.main>
      )}
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  try {
    const itemID = query.item;
    const itemData = await fetchDrinkInfo((item = itemID));
    return {
      props: {
        itemData,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default ItemPage;
