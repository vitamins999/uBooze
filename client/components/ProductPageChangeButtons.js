import React from 'react';

const ProductPageChangeButtons = ({
  page,
  setPage,
  resolvedData,
  latestData,
}) => {
  return (
    <div className='flex w-full items-center justify-between px-40'>
      <button
        onClick={() => {
          setPage(page - 1);
          window.scrollTo(0, 0);
        }}
        disabled={page === 1}
        className={`text-orange-500 hover:text-orange-700 font-bold px-4 rounded ${
          page === 1 && 'opacity-0 cursor-default'
        }`}
      >
        <svg
          viewBox='0 0 20 20'
          fill='currentColor'
          className='arrow-narrow-left w-8 h-8'
        >
          <path
            fillRule='evenodd'
            d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
            clipRule='evenodd'
          ></path>
        </svg>
        Prev
      </button>
      <div className='flex w-full items-center justify-center'>
        <div className='border-b border-gray-700 w-20'></div>
        <span className='text-xl font-semibold tracking-wide text-grey-700 px-5'>
          Page {page} of {resolvedData.totalPages}
        </span>
        <div className='border-b border-gray-700 w-20'></div>
      </div>
      <button
        onClick={() => {
          setPage(page + 1);
          window.scrollTo(0, 0);
        }}
        disabled={!latestData || !latestData.next}
        className={`text-orange-500 hover:text-orange-700 font-bold px-4 rounded ${
          !latestData || (!latestData.next && 'opacity-0 cursor-default')
        }`}
      >
        <svg
          viewBox='0 0 20 20'
          fill='currentColor'
          className='arrow-narrow-right w-8 h-8'
        >
          <path
            fillRule='evenodd'
            d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
            clipRule='evenodd'
          ></path>
        </svg>
        Next
      </button>
    </div>
  );
};

export default ProductPageChangeButtons;
