import React from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

import ProductItemList from '../components/ProductItemList';

const ProductsPage = ({ products }) => {
  return (
    <Layout title='Home'>
      <main>
        <div className='grid md:grid-cols-5 py-5'>
          <div className='md:col-span-1 bg-white ml-10'></div>
          <div className='md:col-span-4 bg-gray-100 mx-10'>
            <h1 className='text-xl mb-5 pb-3 border-gray-400 border-b'>
              Products Page
            </h1>
            <div>
              <ProductItemList products={products} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/products/');
    const data = res.data;
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
