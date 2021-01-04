import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { restAPI } from '../../api/calls';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import { notifyError, notifySuccess } from '../../utils/alerts';

const EditDrinksPage = () => {
  const router = useRouter();

  const userInfo = useSelector((state) => state.userInfo);
  const { isAdmin } = userInfo;

  const fetchDrinks = async () => {
    const { data } = await restAPI.get(`/admin/products`);

    return data;
  };

  const { isLoading, error, data, status } = useQuery('drinks', fetchDrinks);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin]);

  const deleteDrinkHandler = async (productID) => {
    if (window.confirm('Are you sure?')) {
      try {
        await restAPI.delete(`/admin/products/${productID}`);
        notifySuccess('Drink deleted successfully!');
      } catch (error) {
        notifyError(`Oops! ${error.message}`);
      }
    }
  };

  const title = 'Admin Panel - Drinks List';

  return (
    <Layout title={title}>
      <main className='flex flex-col w-full justify-center items-center mt-10 mb-40'>
        <h2 className='text-5xl font-heading font-bold my-10'>Drinks List</h2>
        {isLoading && <Loader />}
        {status === 'success' && (
          <table className='table-auto'>
            <thead>
              <tr>
                <th className='px-4 py-2'>PRODUCT ID</th>
                <th className='px-4 py-2'>PRODUCT NAME</th>
                <th className='px-4 py-2'>DISPLAY NAME</th>
                <th className='px-4 py-2'>VOLUME</th>
                <th className='px-4 py-2'>DRINK TYPE</th>
                <th className='px-4 py-2'>DRINK SUBTYPE</th>
                <th className='px-4 py-2'>EDIT</th>
                <th className='px-4 py-2'>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {data.map((drink, index) => (
                <tr
                  key={drink.productID}
                  className={`${index % 2 === 0 && 'bg-gray-200'}`}
                >
                  <td className='border px-4 py-2'>{drink.productID}</td>
                  <td className='border px-4 py-2'>
                    <Link href={`/products/${drink.productID}`}>
                      <a className='hover:text-orange-500'>
                        {drink.productName}
                      </a>
                    </Link>
                  </td>
                  <td className='border px-4 py-2'>{drink.displayName}</td>
                  <td className='border px-4 py-2'>{drink.volume}</td>
                  <td className='border px-4 py-2'>{drink.drinkType}</td>
                  <td className='border px-4 py-2'>{drink.drinkSubtype}</td>
                  <td className='border px-4 py-2'>
                    <Link href={`/admin/edit/drinks/${drink.productID}`}>
                      <a className='flex justify-center'>
                        <svg
                          className='w-6 h-6 hover:text-orange-500'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                          ></path>
                        </svg>
                      </a>
                    </Link>
                  </td>
                  <td className='border px-4 py-2 flex justify-center'>
                    <button onClick={() => deleteDrinkHandler(drink.productID)}>
                      <svg
                        className='w-6 h-6 hover:text-red-700 focus:outline-none'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </Layout>
  );
};

export default EditDrinksPage;
