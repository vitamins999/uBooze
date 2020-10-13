import { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import { parseCookies } from '../utils/parseCookies';

import SupermarketBar from '../components/SupermarketBar';
import CategoryBar from '../components/CategoryBar';
import ProductResults from '../components/ProductResults';
import ProductPageChangeButtons from '../components/ProductPageChangeButtons';
import Loader from '../components/Loader';
import { fetchDrinks } from '../utils/supermarketListUtils';

const ProductsPage = ({ drinks }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');
  const [limit, setLimit] = useState(10);

  const queryString = Cookies.get('queryString');
  const postcode = Cookies.get('currentPostcode');

  const noPostcode = router.query.postcode;

  const title = 'Beer, Cider, Wine & Spirits';

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
    <Layout title={title}>
      {status === 'loading' && <Loader />}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <main className='flex flex-col mb-40'>
          <SupermarketBar />
          <div className='pb-10 px-5 container mx-auto'>
            <CategoryBar primary='allDrinks' title={title} />
            <div>
              <ProductResults
                resolvedData={resolvedData}
                postcode={postcode}
                order={order}
                setOrder={setOrder}
                limit={limit}
                setLimit={setLimit}
                setPage={setPage}
                noPostcode={noPostcode}
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
