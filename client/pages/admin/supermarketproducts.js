import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import axios from 'axios';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';

const EditSupermarketProductsPage = () => {
  const router = useRouter();

  const userInfo = useSelector((state) => state.userInfo);
  const { isAdmin } = userInfo;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${userInfo.token}`,
    },
  };

  const fetchDrinks = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/admin/supermarketproducts`,
      config
    );

    return data;
  };

  const { isLoading, error, data, status } = useQuery(
    'supermarketProducts',
    fetchDrinks
  );

  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin]);

  const deleteDrinkHandler = (supermarketProductID) => {
    if (window.confirm('Are you sure?')) {
      console.log(supermarketProductID);
    }
  };

  const title = 'Admin Panel - Supermarket Products List';

  return (
    <Layout title={title}>
      <main className='flex flex-col w-full justify-center items-center mt-10 mb-40'>
        <h2 className='text-5xl font-bold my-10'>Supermarket Products List</h2>
        {isLoading && <Loader />}
        {status === 'success' && (
          <table className='table-auto text-xs'>
            <thead>
              <tr>
                <th className='px-4 py-2'>ID</th>
                <th className='px-4 py-2'>PRODUCT NAME</th>
                <th className='px-4 py-2'>SUPERMARKET</th>
                <th className='px-4 py-2'>PRICE</th>
                <th className='px-4 py-2'>OFFER</th>
                <th className='px-4 py-2'>LINK</th>
                <th className='px-4 py-2'>IMG</th>
                <th className='px-4 py-2'>TYPE</th>
                <th className='px-4 py-2'>SUBTYPE</th>
                <th className='px-4 py-2'>PID</th>
                <th className='px-4 py-2'>EDIT</th>
                <th className='px-4 py-2'>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr
                  key={product.supermarketProductID}
                  className={`${index % 2 === 0 && 'bg-gray-200'}`}
                >
                  <td className='border px-4 py-2'>
                    {product.supermarketProductID}
                  </td>
                  <td className='border px-4 py-2'>{product.productName}</td>
                  <td className='border px-4 py-2'>{product.supermarket}</td>
                  <td className='border px-4 py-2'>{product.price}</td>
                  <td className='border px-4 py-2'>{product.offer}</td>
                  <td className='border px-4 py-2'>
                    <Link href={product.link}>
                      <a className='hover:text-orange-500'>Go</a>
                    </Link>
                  </td>
                  <td className='border px-4 py-2'>
                    <Link href={product.image}>
                      <a className='hover:text-orange-500'>Go</a>
                    </Link>
                  </td>
                  <td className='border px-4 py-2'>{product.drinkType}</td>
                  <td className='border px-4 py-2'>{product.drinkSubtype}</td>
                  <td className='border px-4 py-2'>{product.productID}</td>
                  <td className='border px-4 py-2'>
                    <Link
                      href={`/admin/edit/supermarketproducts/${product.supermarketProductID}`}
                    >
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
                    <button
                      onClick={() =>
                        deleteDrinkHandler(product.supermarketProductID)
                      }
                    >
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

export default EditSupermarketProductsPage;
