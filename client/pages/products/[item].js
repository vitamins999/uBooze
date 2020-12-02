import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { motion } from 'framer-motion';
import { fadeOutPage } from '../../animations/navigation';

import Layout from '../../components/Layout';
import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  capitaliseFirstLetter,
  formatter,
  supermarketLogo,
} from '../../utils/supermarketListUtils';
import { updateFavourites } from '../../lib/slices/userInfoSlice';

const fetchDrinkInfo = async (key, item) => {
  const res = await fetch(
    `http://localhost:3001/api/products/details?item=${item}`
  );
  return res.json();
};

const ItemPage = ({ itemData }) => {
  const notifyError = (message) => toast.error(message);

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

  // const [item, setItem] = useState('1');
  const [productRating, setProductRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [numRating, setNumRating] = useState(0);

  const [isFavourite, setIsFavourite] = useState(false);
  const { favourites, token, userID } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  const { data, status } = useQuery(['drinkInfo', item], fetchDrinkInfo, {
    initialData: itemData,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
      withCredentials: true,
    },
  };

  const fetchProductRating = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/ratings/${item}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setProductRating(data.rating);
      setNumRating(data.numRating);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserRating = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/ratings?productid=${item}`,
        config
      );
      setUserRating(data.rating);
    } catch (error) {
      console.log(error.message);
    }
  };

  const userRatingHandler = async (rating) => {
    if (userID) {
      try {
        const { data } = await axios.post(
          `http://localhost:3001/api/ratings`,
          { productID: Number(item), rating },
          config
        );
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

  const onFavouriteClickHandler = async () => {
    if (userID) {
      setIsFavourite(!isFavourite);
      try {
        await axios.post(
          'http://localhost:3001/api/favourites',
          { productID: Number(item) },
          config
        );
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
    const id = favourites.find((productID) => productID === Number(item));
    if (id) {
      setIsFavourite(true);
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

  return (
    <Layout title={title}>
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
                    {capitaliseFirstLetter(data.drinkSubtype)}
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
                      {capitaliseFirstLetter(data.drinkSubtype)}
                    </h2>
                    {isFavourite ? (
                      <motion.svg
                        whileHover={{ scale: 1.2 }}
                        onClick={onFavouriteClickHandler}
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
                        onClick={onFavouriteClickHandler}
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
                      userRatingHandler={userRatingHandler}
                    />
                    <span className='flex ml-3 pl-3 py-2 border-l-2 border-gray-200'>
                      <a className='text-gray-500'>
                        <svg
                          fill='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          className='w-5 h-5'
                          viewBox='0 0 24 24'
                        >
                          <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
                        </svg>
                      </a>
                      <a className='ml-2 text-gray-500'>
                        <svg
                          fill='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          className='w-5 h-5'
                          viewBox='0 0 24 24'
                        >
                          <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
                        </svg>
                      </a>
                      <a className='ml-2 text-gray-500'>
                        <svg
                          fill='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          className='w-5 h-5'
                          viewBox='0 0 24 24'
                        >
                          <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
                        </svg>
                      </a>
                    </span>
                  </div>
                  <p className='leading-relaxed'></p>
                  <div className='flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5'></div>
                  <div className='flex'>
                    <span className='title-font font-medium text-2xl '>
                      from{' '}
                    </span>
                    <span className='title-font font-medium text-2xl text-gray-900 ml-2'>
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
                            <td className='border-t-2 border-gray-200 px-4 py-3 text-lg font-medium text-gray-900'>
                              {formatter.format(supermarket.price / 100)}
                            </td>
                          ) : (
                            <td className='border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-600'>
                              {formatter.format(supermarket.price / 100)}
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
    const itemData = await fetchDrinks((item = itemID));
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
