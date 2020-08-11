import { useState } from 'react';
import useSWR from 'swr';
import Layout from '../components/Layout';

import ProductItemList from '../components/ProductItemList';

const fetcher = (url) => {
  return fetch(url).then((res) => {
    return res.json();
  });
};

const Page = ({ index, products }) => {
  const { data } = useSWR(
    `http://localhost:3001/api/products/?page=${index}`,
    fetcher,
    {
      initialData: products,
    }
  );

  return <ProductItemList products={data.results} />;
};

const ProductsPage = ({ products }) => {
  const [pageIndex, setPageIndex] = useState(1);

  return (
    <Layout title='Products'>
      <main>
        <div className='grid md:grid-cols-5 py-5'>
          <div className='md:col-span-1 bg-white ml-10'></div>
          <div className='md:col-span-4 bg-gray-100 mx-10'>
            <h1 className='text-xl mb-5 pb-3 border-gray-400 border-b'>
              Products Page
            </h1>
            <Page index={pageIndex} products={products} />
            <div style={{ display: 'none' }}>
              <Page index={pageIndex + 1} products={products} />
            </div>
            <button onClick={() => setPageIndex(pageIndex - 1)}>
              Previous
            </button>
            <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  try {
    const data = await fetcher('http://localhost:3001/api/products/?page=1');

    return {
      props: {
        products: data,
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
