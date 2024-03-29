import Link from 'next/link';
import { motion } from 'framer-motion';

import CategoryBarSecondary from './CategoryBarSecondary';
import { capitaliseFirstLetter } from '../utils/supermarketListUtils';

const CategoryBar = ({ primary, secondary, title, resolvedData }) => {
  return (
    <>
      <div data-testid='section-main' className='mt-10 iPad:px-4'>
        <h2 className='inline-block font-heading text-gray-500 lg:text-base text-sm'>
          <Link href='/'>
            <a className='hover:text-green-500'>Home</a>
          </Link>
        </h2>
        <span className='text-gray-500'> / </span>
        <h2
          data-testid='heading-main'
          className={`${
            primary === 'allDrinks' ? 'text-gray-700' : 'text-gray-500 '
          } inline-block font-heading lg:text-base text-sm`}
        >
          {primary === 'allDrinks' ? (
            'All Drinks'
          ) : primary === 'search' ? (
            'Search Results'
          ) : (
            <>
              {primary === 'beer' ? (
                <Link href='/products/beer'>
                  <a className='hover:text-green-500'>Beer & Cider</a>
                </Link>
              ) : (
                <Link
                  href={
                    primary === 'favourites'
                      ? '/profile/favourites'
                      : `/products/${primary}`
                  }
                >
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
            <span
              data-testid='span-results-false'
              className='text-gray-700 italic lg:text-sm text-xs'
            >
              {' '}
              (No results found)
            </span>
          ) : (
            <>
              <span
                data-testid='span-results-true'
                className='text-gray-700 italic lg:text-sm text-xs'
              >
                {' '}
                (Showing {resolvedData.firstItem}-{resolvedData.lastItem} of{' '}
                {resolvedData.total} results)
              </span>
            </>
          )}
        </h3>
      </div>
      <div className='mb-10 mt-10 w-full flex justify-center items-center text-center lg:text-sm text-xs text-gray-700'>
        {primary === 'favourites' || primary === 'search' ? null : (
          <>
            {primary === 'allDrinks' ? (
              <a
                data-testid='link-alldrinks-false'
                className='lg:mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                All Drinks
              </a>
            ) : (
              <Link href='/products'>
                <a
                  data-testid='link-alldrinks-true'
                  className='lg:mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  All Drinks
                </a>
              </Link>
            )}
            {primary === 'beer' ? (
              <a
                data-testid='link-beer-false'
                className='lg:mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Beer & Cider
              </a>
            ) : (
              <Link href='/products/beer'>
                <a
                  data-testid='link-beer-true'
                  className='lg:mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Beer & Cider
                </a>
              </Link>
            )}
            {primary === 'wine' ? (
              <a
                data-testid='link-wine-false'
                className='lg:mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Wine
              </a>
            ) : (
              <Link href='/products/wine'>
                <a
                  data-testid='link-wine-true'
                  className='lg:mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Wine
                </a>
              </Link>
            )}
            {primary === 'spirits' ? (
              <a
                data-testid='link-spirits-false'
                className='lg:mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Spirits
              </a>
            ) : (
              <Link href='/products/spirits'>
                <a
                  data-testid='link-spirits-true'
                  className='lg:mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
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
