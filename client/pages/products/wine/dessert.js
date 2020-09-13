import { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Layout from '../../../components/Layout';
import { parseCookies } from '../../../utils/parseCookies';

import ProductResults from '../../../components/ProductResults';
import ProductPageChangeButtons from '../../../components/ProductPageChangeButtons';
import { fetchDrinksSub } from '../../../utils/supermarketListUtils';

const DessertWinePage = ({ drinks }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');
  const [limit, setLimit] = useState(10);

  const queryString = Cookies.get('queryString') + '&subtype=dessert';
  const postcode = Cookies.get('currentPostcode');

  useEffect(() => {
    if (!queryString) {
      router.push('/');
    }
  }, []);

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['dessert', page, queryString, order, limit],
    fetchDrinksSub,
    {
      initialData: drinks,
    }
  );

  return (
    <Layout title='Dessert Wine'>
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
              <h1>Dessert Wine</h1>
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
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Dessert
              </a>
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
              <Link href='/products/wine/lowalcohol'>
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
                setPage={setPage}
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
    const queryStringData = cookies.queryString + '&subtype=dessert';

    const drinks = await fetchDrinksSub((queryString = queryStringData));

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

export default DessertWinePage;
