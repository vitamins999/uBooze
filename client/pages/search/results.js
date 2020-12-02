import { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { motion } from 'framer-motion';
import { fadeOutPage } from '../../animations/navigation';

import Layout from '../../components/Layout';
import CategoryBar from '../../components/CategoryBar';
import ProductResults from '../../components/ProductResults';
import Loader from '../../components/Loader';

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

  const title = 'Search Results';

  return (
    <Layout title={title}>
      {status === 'loading' && <Loader />}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <motion.main
          variants={fadeOutPage}
          exit='exit'
          initial='initial'
          animate='animate'
          className='flex flex-col mb-40'
        >
          <div className='pb-10 px-5 container mx-auto'>
            <CategoryBar
              primary='search'
              title={title}
              resolvedData={resolvedData}
            />
            <div>
              <ProductResults
                resolvedData={resolvedData}
                order={order}
                setOrder={setOrder}
                limit={limit}
                setLimit={setLimit}
                setPage={setPage}
                page={page}
              />
            </div>
          </div>
        </motion.main>
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
