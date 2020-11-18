import Link from 'next/link';
import { motion } from 'framer-motion';

import CategoryBarSecondary from './CategoryBarSecondary';
import { capitaliseFirstLetter } from '../utils/supermarketListUtils';

const CategoryBar = ({ primary, secondary, title, resolvedData }) => {
  return (
    <>
      <div className='mt-10'>
        <h2 className='inline-block text-gray-500'>
          <Link href='/'>
            <a className='hover:text-green-500'>Home</a>
          </Link>
        </h2>
        <span className='text-gray-500'> / </span>
        <h2
          className={`${
            primary === 'allDrinks' ? 'text-gray-700' : 'text-gray-500 '
          } inline-block`}
        >
          {primary === 'allDrinks' ? (
            'All Drinks'
          ) : (
            <>
              {primary === 'beer' ? (
                <Link href='/products/beer'>
                  <a className='hover:text-green-500'>Beer & Cider</a>
                </Link>
              ) : (
                <Link href={`/products/${primary}`}>
                  <a className='hover:text-green-500'>
                    {capitaliseFirstLetter(primary)}
                  </a>
                </Link>
              )}{' '}
              / <span className='text-gray-700'>{title}</span>
            </>
          )}
        </h2>
        <h3>
          {resolvedData && resolvedData.total === 0 ? (
            <span className='text-gray-700 italic text-sm'>
              {' '}
              (No results found)
            </span>
          ) : (
            <>
              <span className='text-gray-700 italic text-sm'>
                {' '}
                (Showing {resolvedData.firstItem}-{resolvedData.lastItem} of{' '}
                {resolvedData.total} results)
              </span>
            </>
          )}
        </h3>
      </div>
      <div className='mb-10 mt-10 w-full flex justify-center text-sm text-gray-700'>
        {primary === 'favourites' ? null : (
          <>
            {primary === 'allDrinks' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                All Drinks
              </a>
            ) : (
              <Link href='/products'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  All Drinks
                </a>
              </Link>
            )}
            {primary === 'beer' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Beer & Cider
              </a>
            ) : (
              <Link href='/products/beer'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Beer & Cider
                </a>
              </Link>
            )}
            {primary === 'wine' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Wine
              </a>
            ) : (
              <Link href='/products/wine'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Wine
                </a>
              </Link>
            )}
            {primary === 'spirits' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Spirits
              </a>
            ) : (
              <Link href='/products/spirits'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Spirits
                </a>
              </Link>
            )}{' '}
          </>
        )}
      </div>
      <div className='w-full mb-10 text-center text-5xl tracking-wider font-bold text-gray-800'>
        <motion.h1
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.h1>
      </div>
      <CategoryBarSecondary primary={primary} secondary={secondary} />
    </>
  );
};

export default CategoryBar;
