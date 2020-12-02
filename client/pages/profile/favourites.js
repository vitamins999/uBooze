import { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';
import { fadeOutPage } from '../../animations/navigation';

import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import CategoryBar from '../../components/CategoryBar';
import ProductResults from '../../components/ProductResults';
import { fetchDrinksFavourites } from '../../utils/supermarketListUtils';

const FavouritesPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');
  const [limit, setLimit] = useState(10);

  const { favourites, userID } = useSelector((state) => state.userInfo);

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['allDrinks', page, favourites, order, limit],
    fetchDrinksFavourites
  );

  useEffect(() => {
    if (!userID) {
      router.push('/');
    }
  }, [userID]);

  const title = 'My Favourite Drinks';
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
              primary='favourites'
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

export default FavouritesPage;
