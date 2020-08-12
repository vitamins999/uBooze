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
        <div className='flex w-full mx-auto items-center bg-black text-gray-300 pt-32 px-40'>
          <div className='w-1/3 z-10'>
            <img src='hero-small.webp' alt='wineglass' />
          </div>
          <div className='flex flex-col w-full text-right'>
            <h1 className='text-5xl uppercase tracking-widest font-bold'>
              uBooze
            </h1>
            <h1 className='text-4xl'>The cheapest supermarket</h1>
            <h1 className='text-4xl'>alcohol prices near you</h1>
            <h3 className='text-xs pt-2'>*UK only</h3>
            <form className='mt-4' onSubmit={onSubmit}>
              <div className='container py-4 text-white'>
                <input
                  className='w-1/3 bg-transparent text-white transition focus:outline-none focus:border-orange-500 py-2 appearance-none leading-normal border-b border-orange-700 text-xl'
                  type='search'
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder='Enter postcode...'
                />
                <button
                  className='bg-transparent text-orange-700 px-2 -ml-10 hover:text-orange-500'
                  type='submit'
                >
                  <svg
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='search w-6 h-6'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <svg
          className='-mt-4'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
        >
          <path
            fill='#000000'
            fill-opacity='1'
            d='M0,224L48,229.3C96,235,192,245,288,229.3C384,213,480,171,576,144C672,117,768,107,864,101.3C960,96,1056,96,1152,117.3C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
          ></path>
        </svg>
        <div className='flex w-full items-center justify-center -mt-6'>
          <div className='border-b border-gray-600 w-64'></div>
          <h2 className='text-md text-gray-600 tracking-wider mx-2'>
            including support for
          </h2>
          <div className='border-b border-gray-600 w-64'></div>
        </div>
        <div className='flex w-full items-center justify-center'>
          <img
            className='h-5 m-2 mx-4'
            src='waitrose_logo.svg'
            alt='waitrose logo'
          />
          <img
            className='h-5 m-2 mt-4 mx-4'
            src='sainsburys_logo.svg'
            alt='sainsburys logo'
          />
          <img
            className='h-5 m-2 mt-4 mx-4'
            src='tesco_logo.svg'
            alt='tesco logo'
          />
        </div>
      </main>
    </Layout>
  );
}
