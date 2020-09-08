import { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Layout from '../../../components/Layout';
import { parseCookies } from '../../../utils/parseCookies';

import ProductResults from '../../../components/ProductResults';

const fetchDrinks = async (key, page = 1, queryString) => {
  const res = await fetch(
    `http://localhost:3001/api/products/subtypes/?page=${page}${queryString}`
  );
  return res.json();
};

const LowAlcoholWinePage = ({ drinks }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const queryString = Cookies.get('queryString') + '&subtype=lowwine';
  const postcode = Cookies.get('currentPostcode');

  useEffect(() => {
    if (!queryString) {
      router.push('/');
    }
  }, []);

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['small', page, queryString],
    fetchDrinks,
    {
      initialData: drinks,
    }
  );

  return (
    <Layout title='Low Alcohol Wine'>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <main className='flex flex-col mb-40'>
          <div className='pb-10 px-5 container mx-auto'>
            <div className='mb-10 mt-20 w-full flex justify-center text-sm text-gray-700'>
              <Link href='/products'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  All Drinks
                </a>
              </Link>
              <Link href='/products/beer'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Beer
                </a>
              </Link>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Wine
              </a>
              <Link href='/products/spirits'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Spirits
                </a>
              </Link>
            </div>
            <div className='w-full mb-10 text-center text-5xl tracking-wider font-bold text-gray-800'>
              <h1>Low Alcohol</h1>
            </div>
            <div className='mb-10 w-full flex justify-center text-xs text-gray-700'>
              <Link href='/products/wine'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  All Wine
                </a>
              </Link>
              <Link href='/products/wine/red'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Red
                </a>
              </Link>
              <Link href='/products/wine/white'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  White
                </a>
              </Link>
              <Link href='/products/wine/rose'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Rosé
                </a>
              </Link>
              <Link href='/products/wine/sparkling'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Sparkling
                </a>
              </Link>
              <Link href='/products/wine/boxes'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Wine Boxes
                </a>
              </Link>
              <Link href='/products/wine/dessert'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Dessert
                </a>
              </Link>
              <Link href='/products/wine/fortified'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Fortified
                </a>
              </Link>
              <Link href='/products/wine/small'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Small Bottles
                </a>
              </Link>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Low Alcohol
              </a>
            </div>
            <div>
              <ProductResults resolvedData={resolvedData} postcode={postcode} />
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
    const queryStringData = cookies.queryString + '&subtype=lowwine';

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

export default LowAlcoholWinePage;
