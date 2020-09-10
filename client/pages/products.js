import { useState, useEffect, useRef } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import { parseCookies } from '../utils/parseCookies';

import ProductItemList from '../components/ProductItemList';

const fetchDrinks = async (
  key,
  page = 1,
  queryString,
  order = 'asc',
  limit = 10
) => {
  const res = await fetch(
    `http://localhost:3001/api/products/?page=${page}${queryString}&order=${order}&limit=${limit}`
  );
  return res.json();
};

const ProductsPage = ({ drinks }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const dropdownRef = useRef(null);

  const [showLimit, setShowLimit] = useState(false);
  const limitRef = useRef(null);

  const [order, setOrder] = useState('asc');
  const [limit, setLimit] = useState(10);

  const queryString = Cookies.get('queryString');
  const postcode = Cookies.get('currentPostcode');

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

  useEffect(() => {
    if (!queryString) {
      router.push('/');
    }
  }, []);

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['allDrinks', page, queryString, order, limit],
    fetchDrinks,
    {
      initialData: drinks,
    }
  );

  return (
    <Layout title='Beer, Wine & Spirits'>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <main className='flex flex-col mb-40'>
          <div className='pb-10 px-5 container mx-auto'>
            <div className='mb-10 mt-20 w-full flex justify-center text-sm text-gray-700'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                All Drinks
              </a>
              <Link href='/products/beer'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Beer
                </a>
              </Link>
              <Link href='/products/wine'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Wine
                </a>
              </Link>
              <Link href='/products/spirits'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Spirits
                </a>
              </Link>
            </div>
            <div className='w-full mb-10 text-center text-5xl tracking-wider font-bold text-gray-800'>
              <h1>Beer, Wine and Spirits</h1>
            </div>
            <div>
              <div className='flex flex-col mb-5 pb-3'>
                <div className='flex items-center justify-between tracking-wide'>
                  <h1 className='text-md text-gray-700'>
                    {resolvedData.total === 0 ? (
                      <span>No results found</span>
                    ) : (
                      <>
                        <span>
                          Showing {resolvedData.firstItem}-
                          {resolvedData.lastItem} of {resolvedData.total}{' '}
                          results nearby to{' '}
                        </span>
                        <span className='italic'>{postcode}</span>
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
                          class='w-6 h-6'
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
                          className='dropdown absolute right-0 h-auto shadow-lg z-10 w-56 mt-3'
                        >
                          <ul className='bg-gray-100 border-2 border-blue-700 rounded-md text-left text-sm tracking-tight'>
                            <li
                              onClick={() => {
                                setOrder('asc');
                                setShowFilter(false);
                              }}
                              className='flex justify-between items-center border-gray-700 border-b py-3 px-5 hover:text-white hover:bg-blue-700 cursor-pointer rounded-tr-md rounded-tl-md'
                            >
                              Product Name A-Z
                              {order === 'asc' && (
                                <svg
                                  class='w-6 h-6'
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
                                setOrder('desc');
                                setShowFilter(false);
                              }}
                              className='flex justify-between items-center border-gray-700 border-b py-3 px-5 hover:text-white hover:bg-blue-700 cursor-pointer rounded-bl-md rounded-br-md'
                            >
                              Product Name Z-A
                              {order === 'desc' && (
                                <svg
                                  class='w-6 h-6'
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
                          class='w-6 h-6'
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
                          className='dropdown absolute right-0 h-auto shadow-lg z-10 w-20 mt-3'
                        >
                          <ul className='bg-gray-100 border-2 border-blue-700 rounded-md text-left text-sm'>
                            <li
                              onClick={() => {
                                setLimit(10);
                                setShowLimit(false);
                              }}
                              className='flex justify-between items-center border-gray-700 border-b p-3 hover:text-white hover:bg-blue-700 cursor-pointer rounded-tr-md rounded-tl-md'
                            >
                              10
                              {limit === 10 && (
                                <svg
                                  class='w-6 h-6'
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
                                setShowLimit(false);
                              }}
                              className='flex justify-between items-center border-gray-700 border-b p-3 hover:text-white hover:bg-blue-700 cursor-pointer'
                            >
                              20
                              {limit === 20 && (
                                <svg
                                  class='w-6 h-6'
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
                                setShowLimit(false);
                              }}
                              className='flex justify-between items-center border-gray-700 border-b p-3 hover:text-white hover:bg-blue-700 cursor-pointer'
                            >
                              30
                              {limit === 30 && (
                                <svg
                                  class='w-6 h-6'
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
                                setShowLimit(false);
                              }}
                              className='flex justify-between items-center border-gray-700 border-b p-3 hover:text-white hover:bg-blue-700 cursor-pointer'
                            >
                              40
                              {limit === 40 && (
                                <svg
                                  class='w-6 h-6'
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
                                setShowLimit(false);
                              }}
                              className='flex justify-between items-center border-gray-700 border-b p-3 hover:text-white hover:bg-blue-700 cursor-pointer rounded-bl-md rounded-br-md'
                            >
                              50
                              {limit === 50 && (
                                <svg
                                  class='w-6 h-6'
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
                    !latestData ||
                    (!latestData.next && 'opacity-0 cursor-default')
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
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  try {
    const cookies = parseCookies(req);
    const queryStringData = cookies.queryString;

    const drinks = await fetchDrinks((queryString = queryStringData));

    return {
      props: {
        drinks,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default ProductsPage;
