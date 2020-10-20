import React, { useState, useRef, useEffect } from 'react';
import ProductItemList from './ProductItemList';

const ProductResults = ({
  resolvedData,
  postcode,
  order,
  setOrder,
  limit,
  setLimit,
  setPage,
  searchText,
  noPostcode,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const dropdownRef = useRef(null);

  const [showLimit, setShowLimit] = useState(false);
  const limitRef = useRef(null);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowFilter(false);
      }
    };
    if (showFilter) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [showFilter]);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (limitRef.current !== null && !limitRef.current.contains(e.target)) {
        setShowLimit(false);
      }
    };
    if (showLimit) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [showLimit]);

  return (
    <div className='flex flex-col mb-5 pb-3'>
      <div className='flex items-center justify-between tracking-wide'>
        <h1 className='text-md text-gray-700'>
          {resolvedData.total === 0 ? (
            <>
              <span>No results found</span>
              {searchText && <span> for "{searchText}"</span>}
            </>
          ) : (
            <>
              <span>
                Showing {resolvedData.firstItem}-{resolvedData.lastItem} of{' '}
                {resolvedData.total}{' '}
              </span>
              {searchText && (
                <>
                  <span>results for </span>
                  <span className='italic'>"{searchText}"</span>
                </>
              )}
              {noPostcode && <span>results</span>}
              {!searchText && !noPostcode && (
                <>
                  <span>results for </span>
                  <span className='italic'>{postcode}</span>
                </>
              )}
            </>
          )}
        </h1>
        <div className='flex items-center'>
          <div className='relative mr-4'>
            <a
              className='cursor-pointer flex hover:text-gray-500 transition ease-out duration-100'
              onClick={() => setShowFilter(!showFilter)}
            >
              <p className='mr-2'>Order By</p>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                ></path>
              </svg>
            </a>
            {showFilter && (
              <div
                ref={dropdownRef}
                className='dropdown absolute left-0 h-auto shadow-lg z-10 w-20 mt-3 -ml-2'
              >
                <ul className='bg-gray-200 w-64 shadow-lg py-2 text-left text-sm tracking-wide rounded-lg text-gray-800'>
                  <div className='py-2'>
                    <li
                      onClick={() => {
                        setOrder('asc');
                        setShowFilter(false);
                      }}
                      className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
                    >
                      Product Name A-Z
                      {order === 'asc' && (
                        <svg
                          className='w-6 h-6'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M5 13l4 4L19 7'
                          ></path>
                        </svg>
                      )}
                    </li>
                  </div>
                  <li
                    onClick={() => {
                      setOrder('desc');
                      setShowFilter(false);
                    }}
                    className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
                  >
                    Product Name Z-A
                    {order === 'desc' && (
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className='relative'>
            <a
              className='ml-4 cursor-pointer flex hover:text-gray-500 transition ease-out duration-100'
              onClick={() => setShowLimit(!showLimit)}
            >
              <p className='mr-2'>Results Per Page</p>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                ></path>
              </svg>
            </a>
            {showLimit && (
              <div
                ref={limitRef}
                className='dropdown absolute left-0 h-auto shadow-lg z-10 w-20 mt-3 ml-10'
              >
                <ul className='bg-gray-200 w-32 shadow-lg py-2 text-left text-sm tracking-wide rounded-lg text-gray-800'>
                  <li
                    onClick={() => {
                      setLimit(10);
                      setPage(1);
                      setShowLimit(false);
                    }}
                    className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
                  >
                    10
                    {limit === 10 && (
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                    )}
                  </li>
                  <li
                    onClick={() => {
                      setLimit(20);
                      setPage(1);
                      setShowLimit(false);
                    }}
                    className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
                  >
                    20
                    {limit === 20 && (
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                    )}
                  </li>
                  <li
                    onClick={() => {
                      setLimit(30);
                      setPage(1);
                      setShowLimit(false);
                    }}
                    className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
                  >
                    30
                    {limit === 30 && (
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                    )}
                  </li>
                  <li
                    onClick={() => {
                      setLimit(40);
                      setPage(1);
                      setShowLimit(false);
                    }}
                    className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
                  >
                    40
                    {limit === 40 && (
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                    )}
                  </li>
                  <li
                    onClick={() => {
                      setLimit(50);
                      setPage(1);
                      setShowLimit(false);
                    }}
                    className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
                  >
                    50
                    {limit === 50 && (
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='mt-3 pt-5 pb-8 border-gray-400 border-b border-t'>
        <ProductItemList products={resolvedData.results} />
      </div>
    </div>
  );
};

export default ProductResults;