import { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Layout from '../../components/Layout';
import { parseCookies } from '../../utils/parseCookies';

import { motion } from 'framer-motion';
import { fadeOutPage } from '../../animations/navigation';

import SupermarketBar from '../../components/SupermarketBar';
import CategoryBar from '../../components/CategoryBar';
import ProductResults from '../../components/ProductResults';
import Loader from '../../components/Loader';
import { fetchDrinks } from '../../api/public';

const WinePage = ({ drinks }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');
  const [limit, setLimit] = useState(25);

  const queryString = Cookies.get('queryString') + '&type=wine';
  const postcode = Cookies.get('currentPostcode');

  const title = 'All Wine';

  useEffect(() => {
    if (!queryString) {
      router.push('/');
    }
  }, []);

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['wine', page, queryString, order, limit],
    fetchDrinks,
    {
      initialData: drinks,
    }
  );

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
          <SupermarketBar />
          <div className='pb-10 px-5 container mx-auto'>
            <CategoryBar
              primary='wine'
              secondary='allWine'
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

export const getServerSideProps = async ({ req }) => {
  try {
    const cookies = parseCookies(req);
    const queryStringData = cookies.queryString + '&type=wine';

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

export default WinePage;
