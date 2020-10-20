import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  capitaliseFirstLetter,
  supermarketLogo,
  formatter,
} from '../utils/supermarketListUtils';
import Cookies from 'js-cookie';

const ProductItem = ({ product }) => {
  const currentPostcode = Cookies.get('currentPostcode');
  const [showOverlay, setShowOverlay] = useState(false);
  const [statsY, setStatsY] = useState(0);
  const [moreThanThree, setMoreThanThree] = useState(false);
  const [extraSupermarkets, setExtraSupermarkets] = useState(0);

  useEffect(() => {
    if (product.supermarketProducts.length > 3) {
      setMoreThanThree(true);
      setExtraSupermarkets(product.supermarketProducts.length - 3);
    }
  }, []);

  const productID = product.productID;
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => {
        setShowOverlay(true);
        setStatsY(-100);
      }}
      onMouseLeave={() => {
        setShowOverlay(false);
        setStatsY(0);
      }}
      className='flex flex-col w-64 h-108 shadow-md rounded-md overflow-hidden'
    >
      <div>
        <div className='relative'>
          <img
            src={product.supermarketProducts[0].image}
            alt={product.productName}
            className='w-full h-64 object-cover'
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
                className='absolute top-0 w-64 h-64 bg-blue-700 opacity-75 rounded-md'
              ></motion.div>
              <Link href='/products/[item]' as={`/products/${productID}`}>
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  className='absolute top-0 z-10 text-sm cursor-pointer tracking-wide font-medium mt-16 text-center w-1/2 mx-16 border-2 border-orange-500 bg-orange-500 text-white py-1 px-2 rounded hover:bg-orange-600 hover:border-orange-600'
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
        animate={{ y: statsY }}
        transition={{
          duration: 0.3,
          type: 'tween',
          ease: 'easeInOut',
        }}
      >
        <div className='bg-white px-6'>
          <h1 className='uppercase text-gray-900 title-font text-sm font-semibold pt-4'>
            {product.displayName}
          </h1>
          <h2 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
            {product.volume}
          </h2>
          <h2 className='text-gray-500 text-xs tracking-widest title-font pb-3'>
            {capitaliseFirstLetter(product.drinkType)} |{' '}
            {capitaliseFirstLetter(product.drinkSubtype)}
          </h2>
        </div>

        <div className='bg-white pt-5 px-6'>
          {!showOverlay ? (
            <h3 className='text-gray-700 text-sm -mb-2'>Lowest Price:</h3>
          ) : (
            <h3 className='text-gray-700 text-sm'>All Prices:</h3>
          )}
          {product.supermarketProducts.map((product, index) => {
            return (
              index <= 2 && (
                <div key={product.supermarket}>
                  <div
                    className={`grid grid-cols-2 ${
                      showOverlay ? 'pt-2' : 'pt-4'
                    }`}
                  >
                    <img
                      src={supermarketLogo(product.supermarket)}
                      alt='logo'
                      className='h-4'
                    />
                    <span
                      className={`${
                        index === 0 ? 'text-orange-500' : null
                      } text-right`}
                    >
                      {formatter.format(product.price / 100)}
                    </span>
                  </div>
                </div>
              )
            );
          })}
          {moreThanThree && (
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