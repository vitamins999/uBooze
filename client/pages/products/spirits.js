import { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Layout from '../../components/Layout';
import { parseCookies } from '../../utils/parseCookies';

import ProductResults from '../../components/ProductResults';

const fetchDrinks = async (key, page = 1, queryString) => {
  const res = await fetch(
    `http://localhost:3001/api/products/?page=${page}${queryString}`
  );
  return res.json();
};

const SpiritsPage = ({ drinks }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const queryString = Cookies.get('queryString') + '&type=spirits';
  const postcode = Cookies.get('currentPostcode');

  useEffect(() => {
    if (!queryString) {
      router.push('/');
    }
  }, []);

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['spirits', page, queryString],
    fetchDrinks,
    {
      initialData: drinks,
    }
  );

  return (
    <Layout title='Spirits'>
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
              <Link href='/products/wine'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Wine
                </a>
              </Link>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Spirits
              </a>
            </div>
            <div className='w-full mb-10 text-center text-5xl tracking-wider font-bold text-gray-800'>
              <h1>Spirits</h1>
            </div>
            <div className='mb-10 w-full flex justify-center text-xs text-gray-700'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                All Spirits
              </a>
              <Link href='/products/spirits/gin'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Gin
                </a>
              </Link>
              <Link href='/products/spirits/whisky'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Whisky
                </a>
              </Link>
              <Link href='/products/spirits/vodka'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Vodka
                </a>
              </Link>
              <Link href='/products/spirits/rum'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Rum
                </a>
              </Link>
              <Link href='/products/spirits/brandycognac'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Brandy & Cognac
                </a>
              </Link>
              <Link href='/products/spirits/liqueurs'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Tequila & Liqueurs
                </a>
              </Link>
              <Link href='/products/spirits/premixed'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Premixed
                </a>
              </Link>
              <Link href='/products/spirits/lowalcohol'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Low Alcohol
                </a>
              </Link>
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
    const queryStringData = cookies.queryString + '&type=spirits';

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

export default SpiritsPage;
