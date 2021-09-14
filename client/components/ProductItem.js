import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  capitaliseFirstLetter,
  supermarketLogo,
  formatter,
  subtypeFormat,
} from '../utils/supermarketListUtils';
import { updateFavourites } from '../lib/slices/userInfoSlice';
import { restAPI } from '../api/calls';
import { notifyError } from '../utils/alerts';

const ProductItem = ({ product, publicProfilePage }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [statsY, setStatsY] = useState(0);
  const [moreThanThree, setMoreThanThree] = useState(false);
  const [extraSupermarkets, setExtraSupermarkets] = useState(0);

  const { favourites, token, userID } = useSelector((state) => state.userInfo);
  const [isFavourite, setIsFavourite] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (product.supermarketProducts.length > 3) {
      setMoreThanThree(true);
      setExtraSupermarkets(product.supermarketProducts.length - 3);
    }
  }, []);

  useEffect(() => {
    if (favourites) {
      const id = favourites.find(
        (productID) => productID === product.productID
      );
      if (id) {
        setIsFavourite(true);
      }
    }
  }, [favourites]);

  const onFavouriteClickHandler = async () => {
    if (userID) {
      setIsFavourite(!isFavourite);
      try {
        await restAPI.post('/favourites', { productID: product.productID });
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

  const productID = product.productID;
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => {
        setShowOverlay(true);
        setStatsY(-100);
      }}
      onTouchStart={() => {
        setShowOverlay(true);
        setStatsY(-100);
      }}
      onMouseLeave={() => {
        setShowOverlay(false);
        setStatsY(0);
      }}
      className='flex flex-col w-64 mx-auto h-108 shadow-md rounded-md overflow-hidden'
    >
      <div>
        <div className='relative'>
          {isFavourite ? (
            <motion.svg
              whileHover={{ scale: 1.2 }}
              onClick={onFavouriteClickHandler}
              className={`w-6 h-6 absolute top-0 right-0 mt-2 mr-4 z-30 text-gray-700 cursor-pointer ${
                publicProfilePage ? 'hidden' : null
              }`}
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
              className='w-6 h-6 absolute top-0 right-0 mt-2 mr-4 z-30 text-gray-700 cursor-pointer'
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

          <img
            src={product.supermarketProducts[0].image}
            alt={product.productName}
            className='w-full h-64 object-cover p-10'
          />
          {showOverlay && (
            <>
              <motion.div
                animate={{ y: statsY }}
                transition={{
                  duration: 0.3,
                  type: 'tween',
                  ease: 'easeInOut',
                }}
                className='absolute top-0 w-64 h-64 bg-green-700 opacity-75 rounded-md z-10'
              ></motion.div>
              <Link href='/products/[item]' as={`/products/${productID}`}>
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  className='absolute top-0 z-20 text-sm cursor-pointer tracking-wide font-medium mt-16 text-center w-1/2 mx-16 border-2 border-gray-100 bg-gray-100 text-green-900 py-1 px-2 rounded'
                >
                  More Info
                </motion.a>
              </Link>
            </>
          )}
        </div>
      </div>
      <div></div>
      <motion.div
        className='flex flex-col justify-between h-full'
        animate={{ y: statsY }}
        transition={{
          duration: 0.3,
          type: 'tween',
          ease: 'easeInOut',
        }}
      >
        <div className='bg-white px-6'>
          <h1 className='uppercase text-gray-900 text-xs font-semibold pt-4 w-4/5'>
            {product.displayName}
          </h1>
          <h2 className='text-gray-500 text-xs tracking-wider title-font mb-1'>
            {product.volume}
          </h2>
          <h2 className='text-gray-500 text-xs tracking-wider title-font pb-3'>
            {capitaliseFirstLetter(product.drinkType)} |{' '}
            {subtypeFormat(product.drinkSubtype)}
          </h2>
        </div>

        <div
          className={`bg-white px-6 ${
            product.supermarketProducts[0].price > 0 ? 'pb-3' : 'pb-5'
          }`}
        >
          {!showOverlay ? (
            <h3 className='text-gray-700 text-xs -mb-2'>Lowest Price:</h3>
          ) : (
            <h3 className='text-gray-700 text-xs'>All Prices:</h3>
          )}
          {product.supermarketProducts.map((productItem, index) => {
            return (
              index <= 2 && (
                <div
                  key={productItem.supermarket}
                  className={`${index > 0 && !showOverlay ? 'hidden' : 'null'}`}
                >
                  <div
                    className={`grid grid-cols-2 ${
                      showOverlay ? 'pt-2' : 'pt-4'
                    }`}
                  >
                    <img
                      src={supermarketLogo(productItem.supermarket)}
                      alt='logo'
                      className='h-4'
                    />
                    <span
                      className={`${
                        productItem.price ===
                        product.supermarketProducts[0].price
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      } ${productItem.price === 0 && 'text-xs'} text-right`}
                    >
                      {productItem.price > 0
                        ? formatter.format(productItem.price / 100)
                        : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              )
            );
          })}
          {moreThanThree && showOverlay && (
            <Link href='/products/[item]' as={`/products/${productID}`}>
              <a className='text-xs text-blue-600 underline hover:text-blue-700 mt-2'>
                And {extraSupermarkets} more
              </a>
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductItem;
