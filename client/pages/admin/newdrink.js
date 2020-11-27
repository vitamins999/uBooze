import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Layout from '../../components/Layout';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const AddNewDrinkPageAdmin = () => {
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const router = useRouter();

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

  const {
    register: addProduct,
    handleSubmit: handleAddProductSubmit,
    watch: addProductWatch,
    errors: addProductErrors,
  } = useForm();

  const onAddProductSubmit = async ({
    productID,
    productName,
    displayName,
    volume,
    drinkType,
    drinkSubtype,
  }) => {
    try {
      await axios.post(
        `http://localhost:3001/api/admin/products`,
        {
          productID,
          productName,
          displayName,
          volume,
          drinkType,
          drinkSubtype,
        },
        config
      );
      notifySuccess('New drink added successfully!');
    } catch (error) {
      notifyError(`Oops! ${error.message}`);
    }
  };

  const title = 'Admin Panel - Add New Product';

  return (
    <Layout title={title}>
      <main className='flex flex-col w-full justify-center items-center mt-10 mb-20'>
        <div className='container px-64 flex flex-col justify-center items-center'>
          <h2 className='text-5xl font-heading font-bold my-10'>
            Add New Product
          </h2>
          <form
            className='bg-white rounded pb-8 w-full'
            onSubmit={handleAddProductSubmit(onAddProductSubmit)}
          >
            <div>
              <div className='mb-6'>
                <label
                  htmlFor='productID'
                  className='block text-gray-700 text-sm font-medium'
                >
                  Product ID <span className='text-red-700'>*</span>
                </label>
                <input
                  className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                  type='number'
                  name='productID'
                  id='productID'
                  ref={addProduct({ required: true })}
                  required
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='productName'
                  className='block text-gray-700 text-sm font-medium'
                >
                  Product Name <span className='text-red-700'>*</span>
                </label>
                <input
                  className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                  type='text'
                  name='productName'
                  id='productName'
                  ref={addProduct({ required: true })}
                  required
                />
              </div>
              <div className='mb-10'>
                <label
                  htmlFor='displayName'
                  className='block text-gray-700 text-sm font-medium'
                >
                  Display Name <span className='text-red-700'>*</span>
                </label>
                <input
                  className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                  type='text'
                  name='displayName'
                  id='displayName'
                  ref={addProduct({ required: true })}
                  required
                />
              </div>
              <div className='border-b border-gray-200 w-full my-6'></div>
              <div className='mb-6 w-full'>
                <label
                  htmlFor='volume'
                  className='block text-gray-700 text-sm font-medium'
                >
                  Volume <span className='text-red-700'>*</span>
                </label>
                <input
                  className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                  type='text'
                  name='volume'
                  id='volume'
                  ref={addProduct({ required: true })}
                  required
                />
              </div>
              <div className='mb-6 w-full'>
                <label
                  htmlFor='drinkType'
                  className='block text-gray-700 text-sm font-medium'
                >
                  Drink Type <span className='text-red-700'>*</span>
                </label>
                <input
                  className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                  type='text'
                  name='drinkType'
                  id='drinkType'
                  ref={addProduct({ required: true })}
                  required
                />
              </div>
            </div>
            <div className='mb-6'>
              <label
                htmlFor='drinkSubtype'
                className='block text-gray-700 text-sm font-medium'
              >
                Drink Subtype <span className='text-red-700'>*</span>
              </label>
              <input
                className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                type='text'
                name='drinkSubtype'
                id='drinkSubtype'
                ref={addProduct()}
              />
            </div>
            <div className='border-b border-gray-200 w-full my-6'></div>
            <button
              className='text-sm shadow-sm border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
              type='submit'
            >
              Save
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default AddNewDrinkPageAdmin;
