import React from 'react';
import ProductItemList from './ProductItemList';

const ProductResults = ({ resolvedData, postcode }) => {
  return (
    <div className='flex flex-col mb-5 pb-3'>
      <div className='flex items-center justify-between pb-3 border-gray-400 border-b tracking-wide'>
        <h1 className='text-md text-gray-700'>
          {resolvedData.total === 0 ? (
            <span>No results found</span>
          ) : (
            <>
              <span>
                Showing {resolvedData.firstItem}-{resolvedData.lastItem} of{' '}
                {resolvedData.total} results nearby to{' '}
              </span>
              <span className='italic'>{postcode}</span>
            </>
          )}
        </h1>
        <div className='flex items-center'>
          <a
            className='mx-4 hover:text-gray-500 transition ease-out duration-100'
            href='#'
          >
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              className='adjustments w-6 h-6'
            >
              <path d='M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z'></path>
            </svg>
          </a>
          <a
            className='hover:text-gray-500 transition ease-out duration-100'
            href='#'
          >
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              className='search w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div className='mt-5 pb-8 border-gray-400 border-b'>
        <ProductItemList products={resolvedData.results} />
      </div>
    </div>
  );
};

export default ProductResults;
