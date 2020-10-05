import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import {
  capitaliseFirstLetter,
  formatter,
  supermarketLogo,
} from '../../utils/supermarketListUtils';

const fetchDrinkInfo = async (key, item) => {
  const res = await fetch(
    `http://localhost:3001/api/products/details?item=${item}`
  );
  return res.json();
};

const ItemPage = ({ itemData }) => {
  const router = useRouter();
  const { item, postcode } = router.query;

  const { data, status } = useQuery(['drinkInfo', item], fetchDrinkInfo, {
    initialData: itemData,
  });

  if (status == 'loading')
    return (
      <Layout title='Loading...'>
        <div>Loading data...</div>
      </Layout>
    );

  if (status == 'error')
    return (
      <Layout title='Error'>
        <div>Error fetching data.</div>
      </Layout>
    );

  const title = `${data.productName} ${data.volume}`;

  return (
    <Layout title={title}>
      <section className='text-gray-700 body-font overflow-hidden'>
        <div className='container px-5 pt-20 pb-32 mx-auto'>
          <div className='lg:w-4/5 mx-auto flex justify-center items-center'>
            <img
              alt='ecommerce'
              className='w-64 object-cover object-center p-5'
              src={data.supermarketProducts[0].image}
            />
            <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
              <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                {capitaliseFirstLetter(data.drinkType)} |{' '}
                {capitaliseFirstLetter(data.drinkSubtype)}
              </h2>
              <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
                {data.productName}
              </h1>
              <h2>{data.volume}</h2>
              <div className='flex mb-4'>
                <span className='flex items-center'>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-4 h-4 text-orange-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-4 h-4 text-orange-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-4 h-4 text-orange-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='currentColor'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-4 h-4 text-orange-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-4 h-4 text-orange-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <span className='text-gray-600 ml-3'>4 Reviews</span>
                </span>
                <span className='flex ml-3 pl-3 py-2 border-l-2 border-gray-200'>
                  <a className='text-gray-500'>
                    <svg
                      fill='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      className='w-5 h-5'
                      viewBox='0 0 24 24'
                    >
                      <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
                    </svg>
                  </a>
                  <a className='ml-2 text-gray-500'>
                    <svg
                      fill='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      className='w-5 h-5'
                      viewBox='0 0 24 24'
                    >
                      <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
                    </svg>
                  </a>
                  <a className='ml-2 text-gray-500'>
                    <svg
                      fill='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      className='w-5 h-5'
                      viewBox='0 0 24 24'
                    >
                      <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className='leading-relaxed'></p>
              <div className='flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5'></div>
              <div className='flex'>
                <span className='title-font font-medium text-2xl '>from </span>
                <span className='title-font font-medium text-2xl text-gray-900 ml-2'>
                  {formatter.format(data.supermarketProducts[0].price / 100)}
                </span>
                <a
                  href={data.supermarketProducts[0].link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded'
                >
                  Go To {data.supermarketProducts[0].supermarket}
                </a>
                <button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                  <svg
                    fill='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='text-gray-700 body-font'>
        <div className='container px-5 pb-24 mx-auto'>
          <div className='flex flex-col text-center w-full mb-10'>
            <h1 className='sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900'>
              Compare Prices
            </h1>
          </div>
          <div className='lg:w-2/3 w-full mx-auto overflow-auto'>
            <table className='table-auto w-full text-left whitespace-no-wrap'>
              <thead>
                <tr>
                  <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tl rounded-bl'>
                    Supermarket
                  </th>
                  <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200'>
                    Offer
                  </th>

                  <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200'>
                    Price
                  </th>
                  <th className='w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tr rounded-br'></th>
                </tr>
              </thead>
              <tbody>
                {data.supermarketProducts.map((supermarket, index) => {
                  return (
                    <tr>
                      <td className='border-t-2 border-gray-200 px-4 py-3'>
                        <img
                          src={supermarketLogo(supermarket.supermarket)}
                          alt='logo'
                          className='h-8'
                        />
                      </td>
                      <td className='border-t-2 border-gray-200 px-4 py-3'>
                        {supermarket.offer}
                      </td>
                      {index === 0 ? (
                        <td className='border-t-2 border-gray-200 px-4 py-3 text-lg font-medium text-orange-600'>
                          {formatter.format(supermarket.price / 100)}
                        </td>
                      ) : (
                        <td className='border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900'>
                          {formatter.format(supermarket.price / 100)}
                        </td>
                      )}
                      <td className='border-t-2 border-gray-200 w-10'>
                        <a
                          href={supermarket.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex ml-auto text-white bg-orange-500 border-0 py-2 px-5 mr-4 focus:outline-none hover:bg-orange-600 rounded justify-center'
                        >
                          Go to {supermarket.supermarket}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  try {
    const itemID = query.item;
    const itemData = await fetchDrinks((item = itemID));
    return {
      props: {
        itemData,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default ItemPage;
