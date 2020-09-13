import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import Cookie from 'js-cookie';

import { createQueryString } from '../../utils/supermarketListUtils';

const SupermarketSearch = () => {
  const supermarkets = [
    {
      id: 1,
      name: "Sainsbury's",
      svgPath: '/sainsburys_logo.svg',
    },
    {
      id: 2,
      name: 'Tesco',
      svgPath: '/tesco_logo.svg',
    },
    {
      id: 3,
      name: 'Waitrose',
      svgPath: '/waitrose_logo.svg',
    },
  ];

  const selectedSupermarkets = [];

  const [supermarketList, setSupermarketList] = useState(supermarkets);
  const [supermarketSelectedList, setSupermarketSelectedList] = useState(
    selectedSupermarkets
  );
  const router = useRouter();

  const selectSupermarket = (id, index) => {
    const filteredSupermarket = supermarketList.filter((supermarket) => {
      return supermarket.id === id;
    });

    const newSupermarketList = supermarketList.filter((supermarket) => {
      return supermarket.id !== id;
    });

    let sortedSupermarketSelectedList = [
      ...supermarketSelectedList,
      ...filteredSupermarket,
    ];
    sortedSupermarketSelectedList.sort((a, b) => a.name.localeCompare(b.name));

    setSupermarketList([...newSupermarketList]);
    setSupermarketSelectedList([...sortedSupermarketSelectedList]);
  };

  const deSelectSupermarket = (id, index) => {
    const filteredSupermarket = supermarketSelectedList.filter(
      (supermarket) => {
        return supermarket.id === id;
      }
    );

    const newSupermarketList = supermarketSelectedList.filter((supermarket) => {
      return supermarket.id !== id;
    });

    let sortedSupermarketSelectedList = [
      ...supermarketList,
      ...filteredSupermarket,
    ];
    sortedSupermarketSelectedList.sort((a, b) => a.name.localeCompare(b.name));

    setSupermarketSelectedList([...newSupermarketList]);
    setSupermarketList([...sortedSupermarketSelectedList]);
  };

  const handleOnClick = () => {
    if (supermarketSelectedList.length > 0) {
      const supermarketListNameOnly = supermarketSelectedList.map(
        (supermarket) => {
          return supermarket.name;
        }
      );

      const supermarketListQueryString = createQueryString(
        supermarketListNameOnly
      );

      Cookie.set('supermarketList', supermarketListNameOnly);
      Cookie.set('queryString', supermarketListQueryString);

      router.push(`/products?&postcode=false`);
    } else {
      console.log('No supermarkets selected');
    }
  };

  return (
    <Layout title='Search by Supermarket'>
      <section className='text-gray-700 body-font bg-hero-blend'>
        <div className='bg-hero-image h-screen bg-contain bg-no-repeat bg-center'>
          <div className='bg-white h-screen bg-opacity-50'>
            <div className='container mx-auto flex flex-col px-5 py-24 justify-center items-center'>
              <div className='w-full md:w-2/3 flex flex-col mb-16 items-center text-center'>
                <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
                  Search by Supermarket
                </h1>
                <p className='mb-8 leading-relaxed'>
                  Don't want to give us your postcode? No problem. Just select
                  which supermarkets you want to compare using the tags down
                  below and click search. We'll gather a list of all available
                  alcohol, along with all the prices.
                </p>
              </div>
              <div className='flex w-auto px-10 py-5 rounded-md items-center align-middle justify-center bg-hero-blend'>
                {supermarketList.length === 0 && <h2>No supermarkets left</h2>}
                {supermarketList.map((supermarket, index) => {
                  return (
                    <>
                      {index === 0 ? (
                        <li key={supermarket.id} className='list-none'>
                          <motion.img
                            className='h-auto w-32 cursor-pointer'
                            whileHover={{ scale: 1.3 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => {
                              selectSupermarket(supermarket.id, index);
                            }}
                            src={supermarket.svgPath}
                            alt={supermarket.name}
                          />
                        </li>
                      ) : (
                        <li key={supermarket.id} className='list-none'>
                          <motion.img
                            className='h-auto w-32 ml-10 cursor-pointer'
                            whileHover={{ scale: 1.3 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => {
                              selectSupermarket(supermarket.id, index);
                            }}
                            src={supermarket.svgPath}
                            alt={supermarket.name}
                          />
                        </li>
                      )}
                    </>
                  );
                })}
              </div>
              <div className='flex w-full items-center justify-center mt-6 mb-6'>
                <div className='border-b border-gray-600 w-48'></div>
                <h2 className='text-md text-center text-gray-900 tracking-wider mx-2'>
                  Selected Supermarkets
                </h2>
                <div className='border-b border-gray-600 w-48'></div>
              </div>
              <div className='flex w-auto px-10 py-5 rounded-md items-center align-middle justify-center bg-hero-blend'>
                {supermarketSelectedList.length === 0 && (
                  <h2>Selected Supermarkets go here!</h2>
                )}
                {supermarketSelectedList.map((supermarket, index) => {
                  return (
                    <>
                      {index === 0 ? (
                        <li key={supermarket.id} className='list-none'>
                          <motion.img
                            className='h-auto w-32 cursor-pointer'
                            whileHover={{ scale: 1.3 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => {
                              deSelectSupermarket(supermarket.id, index);
                            }}
                            src={supermarket.svgPath}
                            alt={supermarket.name}
                          />
                        </li>
                      ) : (
                        <li key={supermarket.id} className='list-none'>
                          <motion.img
                            className='h-auto w-32 ml-10 cursor-pointer'
                            whileHover={{ scale: 1.3 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => {
                              deSelectSupermarket(supermarket.id, index);
                            }}
                            src={supermarket.svgPath}
                            alt={supermarket.name}
                          />
                        </li>
                      )}
                    </>
                  );
                })}
              </div>
              <button
                onClick={() => handleOnClick()}
                className='text-sm mt-10 w-40 bg-blue-600 transition duration-100 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline'
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SupermarketSearch;
