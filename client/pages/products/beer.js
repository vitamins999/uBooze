import { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Layout from '../../components/Layout';
import { parseCookies } from '../../utils/parseCookies';

import ProductResults from '../../components/ProductResults';
import ProductPageChangeButtons from '../../components/ProductPageChangeButtons';
import { fetchDrinks } from '../../utils/supermarketListUtils';

const BeerPage = ({ drinks }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');
  const [limit, setLimit] = useState(10);

  const queryString = Cookies.get('queryString') + '&type=beer';
  const postcode = Cookies.get('currentPostcode');

  useEffect(() => {
    if (!queryString) {
      router.push('/');
    }
  }, []);

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['beer', page, queryString, order, limit],
    fetchDrinks,
    {
      initialData: drinks,
    }
  );

  return (
    <Layout title='Beer'>
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
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Beer
              </a>
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
              <h1>Beer</h1>
            </div>
            <div className='mb-10 w-full flex justify-center text-xs text-gray-700'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                All Beer
              </a>
              <Link href='/products/beer/ale'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Ale
                </a>
              </Link>
              <Link href='/products/beer/lager'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Lager
                </a>
              </Link>
              <Link href='/products/beer/cider'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Cider
                </a>
              </Link>
              <Link href='/products/beer/lowalcohol'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Low Alcohol
                </a>
              </Link>
            </div>
            <div>
              <ProductResults
                resolvedData={resolvedData}
                postcode={postcode}
                order={order}
                setOrder={setOrder}
                limit={limit}
                setLimit={setLimit}
              />
              <ProductPageChangeButtons
                page={page}
                setPage={setPage}
                resolvedData={resolvedData}
                latestData={latestData}
              />
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
    const queryStringData = cookies.queryString + '&type=beer';

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

export default BeerPage;
