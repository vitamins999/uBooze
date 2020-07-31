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
      <main>
        <h1 className='text-xl'>Home Page</h1>
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
      </main>
    </Layout>
  );
}
