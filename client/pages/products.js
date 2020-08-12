import { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import Layout from '../components/Layout';

import ProductItemList from '../components/ProductItemList';

const fetchDrinks = async (key, page = 1) => {
  const res = await fetch(`http://localhost:3001/api/products/?page=${page}`);
  return res.json();
};

const ProductsPage = ({ products }) => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['drinks', page],
    fetchDrinks,
    {
      initialData: products,
    }
  );

  return (
    <Layout title='Products'>
      <main>
        <div className='grid md:grid-cols-5 pt-32 px-40'>
          <div className='md:col-span-5 bg-gray-100'>
            <h1 className='text-xl mb-5 pb-3 border-gray-400 border-b'>
              Products Page
            </h1>
            {status === 'loading' && <div>Loading data...</div>}
            {status === 'error' && <div>Error fetching data</div>}
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                page === 1 && 'opacity-50 cursor-not-allowed'
              }`}
            >
              Previous Page
            </button>
            <span className='text-xl p-2'>{page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={!latestData || !latestData.next}
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                !latestData ||
                (!latestData.next && 'opacity-50 cursor-not-allowed')
              }`}
            >
              Next Page
            </button>
            <div className='mt-5'>
              <ProductItemList products={resolvedData.results} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  try {
    const drinks = await fetchDrinks();
    return {
      props: {
        products: drinks,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

export default ProductsPage;
