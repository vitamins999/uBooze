import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import allDrinksData from '../../data/allDrinks';

const DrinkSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredDrinksData, setFilteredDrinksData] = useState([]);
  const [drinksData, setDrinksData] = useState(allDrinksData);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/search/results?search=${searchText}`);
  };

  useEffect(() => {
    let matches = drinksData.filter((drink) => {
      const regex = new RegExp(`${searchText}`, 'gi');
      return drink.productName.match(regex);
    });

    if (searchText.length < 2) {
      matches = [];
    }

    setFilteredDrinksData(matches);
  }, [searchText]);

  return (
    <Layout title='Search by Drink'>
      <section className='text-gray-700 body-font bg-hero-blend'>
        <div className='bg-hero-image h-screen bg-contain bg-no-repeat bg-center'>
          <div className='bg-white h-screen bg-opacity-50'>
            <div className='container mx-auto flex flex-col px-5 py-24 justify-center items-center'>
              <div className='w-full md:w-2/3 flex flex-col mb-16 items-center text-center'>
                <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
                  Search by Drink
                </h1>
                <p className='mb-8 leading-relaxed'>
                  Have a specific drink in mind? Want to compare UK supermarket
                  prices on it? No trouble at all. Just type it in the box below
                  and click search.
                </p>
                <div className='w-full'>
                  <form
                    onSubmit={handleSubmit}
                    className='flex w-full justify-center'
                  >
                    <input
                      className='border-2 bg-orange-200 rounded mr-4 border-gray-700 focus:outline-none focus:border-gray-900 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 text-base px-4 lg:w-full xl:w-1/2 w-2/4 md:w-full'
                      placeholder='The drink I want is...'
                      type='text'
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                      type='submit'
                      className='inline-flex text-gray-700 border-0 py-2 px-2 -ml-16 hover:text-gray-900'
                    >
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
                <div className='z-10'>
                  {filteredDrinksData.map((drink) => {
                    return (
                      <Link
                        href='/products/[item]'
                        as={`/products/${drink.productID}`}
                      >
                        <a>
                          <li
                            key={drink.productID}
                            className='px-5 py-10 cursor-pointer list-none w-96 h-16 flex flex-col justify-center text-left bg-white border-b border-gray-500 hover:bg-gray-200 hover:text-gray-800'
                          >
                            <h2 className='text-sm font-semibold tracking-wider'>
                              {drink.productName}
                            </h2>
                            <h2 className='text-xs'>{drink.volume}</h2>
                            <h2 className='text-xs'>
                              {drink.drinkType} || {drink.drinkSubtype}
                            </h2>
                          </li>
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DrinkSearch;
