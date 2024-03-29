import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { restAPI } from '../../../../api/calls';
import Layout from '../../../../components/Layout';
import Loader from '../../../../components/Loader';
import { notifyError, notifySuccess } from '../../../../utils/alerts';

const EditDrinkPageAdmin = () => {
  const [productName, setProductName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [volume, setVolume] = useState('');
  const [drinkType, setDrinkType] = useState('');
  const [drinkSubtype, setDrinkSubtype] = useState('');

  const router = useRouter();

  const { productID } = router.query;
  const userInfo = useSelector((state) => state.userInfo);
  const { isAdmin } = userInfo;

  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin]);

  const fetchProductProfile = async () => {
    const { data } = await restAPI.get(`/admin/products/${productID}`);

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
      await restAPI.put(`/admin/products/${productID}`, {
        productName,
        displayName,
        volume,
        drinkType,
        drinkSubtype,
      });
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
            <h2 className='text-5xl font-heading font-bold my-10'>
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
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Product Name <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Display Name <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Volume <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Drink Type <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                  className='block text-gray-700 text-sm font-medium'
                >
                  Drink Subtype <span className='text-red-700'>*</span>
                </label>
                <input
                  className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                className='text-sm shadow-sm border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
                type='submit'
              >
                Save
              </button>
            </form>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default EditDrinkPageAdmin;
