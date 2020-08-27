import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePaginatedQuery } from 'react-query';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

import ProductItemList from '../components/ProductItemList';

const fetchDrinks = async (key, page = 1, queryString) => {
  const res = await fetch(
    `http://localhost:3001/api/products/?page=${page}${queryString}`
  );
  return res.json();
};

const ProductsPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { queryString } = useSelector((state) => state.supermarketDetails);

  useEffect(() => {
    if (!queryString) {
      router.push('/');
    }
  }, []);

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['drinks', page, queryString],
    fetchDrinks
  );

  return (
    <Layout title='Products'>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <main className='flex flex-col items-start'>
          <div className='grid md:grid-cols-5 pb-10 px-40'>
            <div className='md:col-span-5'>
              <div className='flex items-center justify-between mb-5 pb-3 border-gray-400 border-b'>
                <h1 className='text-xl font-semibold'>Products</h1>
                <div className='flex items-center'>
                  <h2 className='text-xl'>{resolvedData.total} items found</h2>
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
          </div>
          <div className='flex w-full items-center justify-between px-40'>
            <button
              onClick={() => {
                setPage(page - 1);
                window.scrollTo(0, 0);
              }}
              disabled={page === 1}
              className={`text-red-700 font-bold px-4 rounded ${
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
                Page {page}
              </span>
              <div className='border-b border-gray-700 w-20'></div>
            </div>
            <button
              onClick={() => {
                setPage(page + 1);
                window.scrollTo(0, 0);
              }}
              disabled={!latestData || !latestData.next}
              className={`text-red-700 font-bold px-4 rounded ${
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
        </main>
      )}
    </Layout>
  );
};

export default ProductsPage;
