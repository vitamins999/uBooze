import { useState, useRef, useEffect } from 'react';
import Pagination from '../components/Pagination';
import ProductItemList from './ProductItemList';

const ProductResults = ({
  resolvedData,
  order,
  setOrder,
  limit,
  setLimit,
  setPage,
  page,
  publicProfilePage,
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

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
    scroll({
      top: 300,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='flex flex-col mb-5 pb-3'>
      <div className='-mb-2 sticky top-0 flex items-center justify-between tracking-wide py-5 z-50 bg-blur'>
        <div className='flex items-center'>
          <div className='relative mr-4'>
            <a
              className='cursor-pointer flex hover:text-green-500 transition ease-out duration-200 text-gray-900'
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
                className='dropdown absolute left-0 h-auto shadow-lg z-40 w-20 mt-3 -ml-2'
              >
                <ul className='bg-gray-200 w-64 shadow-lg py-2 text-left text-sm tracking-wide rounded-lg text-gray-900'>
                  <div className='py-2'>
                    <li
                      onClick={() => {
                        setOrder('asc');
                        setShowFilter(false);
                      }}
                      className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
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
                    className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
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
              className='ml-4 cursor-pointer flex hover:text-green-500 transition ease-out duration-200 text-gray-900'
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
                className='dropdown absolute left-0 h-auto shadow-lg z-40 w-20 mt-3 ml-10'
              >
                <ul className='bg-gray-200 w-32 shadow-lg py-2 text-left text-sm tracking-wide rounded-lg text-gray-900'>
                  <li
                    onClick={() => {
                      setLimit(10);
                      setPage(1);
                      setShowLimit(false);
                    }}
                    className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
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
                    className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
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
                    className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
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
                    className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
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
                    className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
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
        <Pagination
          itemsPerPage={limit}
          totalItems={resolvedData.total}
          paginate={handlePageClick}
          currentPage={page}
          totalPages={resolvedData.totalPages}
        />
      </div>
      <div className='mt-3 pt-5 pb-8 border-gray-200 border-b border-t'>
        <ProductItemList
          products={resolvedData.results}
          publicProfilePage={publicProfilePage}
        />
      </div>
    </div>
  );
};

export default ProductResults;
