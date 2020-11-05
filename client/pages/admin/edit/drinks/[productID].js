import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import axios from 'axios';
import Layout from '../../../../components/Layout';
import Loader from '../../../../components/Loader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const EditDrinkPageAdmin = () => {
  const [productName, setProductName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [volume, setVolume] = useState('');
  const [drinkType, setDrinkType] = useState('');
  const [drinkSubtype, setDrinkSubtype] = useState('');

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const router = useRouter();

  const { productID } = router.query;
  const userInfo = useSelector((state) => state.userInfo);
  const { isAdmin } = userInfo;

  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin]);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${userInfo.token}`,
    },
  };

  const fetchProductProfile = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/admin/products/${productID}`,
      config
    );

    setProductName(data.productName);
    setDisplayName(data.displayName);
    setVolume(data.volume);
    setDrinkType(data.drinkType);
    setDrinkSubtype(data.drinkSubtype);

    return data;
  };

  const { isLoading, error, data, status } = useQuery(
    'editProductProfile',
    fetchProductProfile
  );

  const {
    register: updateProduct,
    handleSubmit: handleUpdateProductSubmit,
    watch: updateProductWatch,
    errors: updateProductErrors,
  } = useForm();

  const onUpdateProductSubmit = async ({
    productName,
    displayName,
    volume,
    drinkType,
    drinkSubtype,
  }) => {
    try {
      await axios.put(
        `http://localhost:3001/api/admin/products/${productID}`,
        {
          productName,
          displayName,
          volume,
          drinkType,
          drinkSubtype,
        },
        config
      );
      notifySuccess('Changes saved successfully!');
    } catch (error) {
      notifyError(`Oops! ${error.message}`);
    }
  };

  const title = 'Admin Panel - Edit Product';

  return (
    <Layout title={title}>
      <main className='flex flex-col w-full justify-center items-center mt-10 mb-20'>
        {isLoading && <Loader />}
        {status === 'success' && (
          <div className='container px-64 flex flex-col justify-center items-center'>
            <h2 className='text-5xl font-bold my-10'>
              Edit Product - <span className='italic'>{data.productName}</span>
            </h2>
            <form
              className='bg-white rounded pb-8 w-full'
              onSubmit={handleUpdateProductSubmit(onUpdateProductSubmit)}
            >
              <div>
                <div className='mb-6'>
                  <label
                    htmlFor='productName'
                    className='block text-gray-900 text-sm font-semibold'
                  >
                    Product Name <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name='productName'
                    id='productName'
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    ref={updateProduct({ required: true })}
                    required
                  />
                </div>
                <div className='mb-10'>
                  <label
                    htmlFor='displayName'
                    className='block text-gray-900 text-sm font-semibold'
                  >
                    Display Name <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name='displayName'
                    id='displayName'
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    ref={updateProduct({ required: true })}
                    required
                  />
                </div>
                <div className='border-b border-gray-400 w-full my-6'></div>
                <div className='mb-6 w-full'>
                  <label
                    htmlFor='volume'
                    className='block text-gray-900 text-sm font-semibold'
                  >
                    Volume <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name='volume'
                    id='volume'
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    ref={updateProduct({ required: true })}
                    required
                  />
                </div>
                <div className='mb-6 w-full'>
                  <label
                    htmlFor='drinkType'
                    className='block text-gray-900 text-sm font-semibold'
                  >
                    Drink Type <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name='drinkType'
                    id='drinkType'
                    value={drinkType}
                    onChange={(e) => setDrinkType(e.target.value)}
                    ref={updateProduct({ required: true })}
                    required
                  />
                </div>
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='drinkSubtype'
                  className='block text-gray-900 text-sm font-semibold'
                >
                  Drink Subtype <span className='text-red-700'>*</span>
                </label>
                <input
                  className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  name='drinkSubtype'
                  id='drinkSubtype'
                  value={drinkSubtype}
                  onChange={(e) => setDrinkSubtype(e.target.value)}
                  ref={updateProduct()}
                />
              </div>
              <div className='border-b border-gray-400 w-full my-6'></div>
              <button
                className='text-sm tracking-tight w-52 bg-orange-500 transition duration-100 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default EditDrinkPageAdmin;