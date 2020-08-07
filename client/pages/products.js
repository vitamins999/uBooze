import React from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

import ProductItemList from '../components/ProductItemList';

const ProductsPage = ({ products }) => {
  return (
    <Layout title='Home'>
      <main>
        <h1 className='text-xl'>Products Page</h1>
        <div>
          <ProductItemList products={products} />
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
