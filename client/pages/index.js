import { useState } from 'react';

import Layout from '../components/Layout';

export default function Home() {
  const [postcode, setPostcode] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(postcode);
  };

  return (
    <Layout title='Home'>
      <main className='mx-10 my-5'>
        <h1 className='text-2xl'>
          Enter your postcode and find the cheapest supermarket alcohol prices
          near you
        </h1>
        <form onSubmit={onSubmit}>
          <input
            className='text-sm'
            type='text'
            onChange={(e) => setPostcode(e.target.value)}
            placeholder='Please enter postcode...'
          />
          <button className='bg-gray-300 px-2 ml-2 rounded' type='submit'>
            Go
          </button>
        </form>
        <h1 className='text-lg'>Or</h1>
        <h1 className='text-2xl'>
          Select the available supermarkets below to manually compare prices
        </h1>
        <button className='bg-gray-300 px-2 ml-2 rounded'>Go</button>
      </main>
    </Layout>
  );
}
