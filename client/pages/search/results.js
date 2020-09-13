import { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Layout from '../../components/Layout';

import ProductResults from '../../components/ProductResults';
import ProductPageChangeButtons from '../../components/ProductPageChangeButtons';

const fetchDrinks = async (
  key,
  page = 1,
  queryString,
  order = 'asc',
  limit = 10
) => {
  const res = await fetch(
    `http://localhost:3001/api/search/?page=${page}&search=${queryString}&order=${order}&limit=${limit}`
  );
  return res.json();
};

const SearchResultsPage = ({ drinks }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');
  const [limit, setLimit] = useState(10);

  const queryString = router.query.search;
  const postcode = Cookies.get('currentPostcode');

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
    <Layout title='Search Results'>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <main className='flex flex-col mb-40'>
          <div className='pb-10 px-5 container mx-auto'>
            <div className='w-full mb-10 mt-20 text-center text-5xl tracking-wider font-bold text-gray-800'>
              <h1>Search Results</h1>
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
                searchText={queryString}
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

export const getServerSideProps = async ({ req, query }) => {
  try {
    const queryStringData = query.search;

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

export default SearchResultsPage;
