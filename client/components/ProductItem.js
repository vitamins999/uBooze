import React, { useState } from 'react';
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

  const productID = product.productID;
  return (
    <div
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
      <motion.div animate={{ y: statsY }} className=''>
        <div className='bg-white px-6'>
          <h1 className='uppercase text-gray-900 title-font text-sm font-semibold pt-4'>
            {product.productName}
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
            <h3 className='text-gray-700 text-sm'>Lowest Price:</h3>
          ) : (
            <h3 className='text-gray-700 text-sm'>All Prices:</h3>
          )}
          {product.supermarketProducts.map((product, index) => {
            return (
              <div>
                {index === 0 ? (
                  <div className='flex justify-between pt-2'>
                    <img
                      src={supermarketLogo(product.supermarket)}
                      alt='logo'
                      className='h-5'
                    />
                    <span className='text-orange-500'>
                      {formatter.format(product.price / 100)}
                    </span>
                  </div>
                ) : (
                  <div className='flex justify-between pt-4'>
                    <img
                      src={supermarketLogo(product.supermarket)}
                      alt='logo'
                      className='h-5'
                    />
                    <span>{formatter.format(product.price / 100)}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductItem;
