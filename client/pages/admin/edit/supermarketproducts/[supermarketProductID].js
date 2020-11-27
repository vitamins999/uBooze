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
  const [productID, setProductID] = useState(null);
  const [productName, setProductName] = useState('');
  const [supermarket, setSupermarket] = useState('');
  const [price, setPrice] = useState(0);
  const [offer, setOffer] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [drinkType, setDrinkType] = useState('');
  const [drinkSubtype, setDrinkSubtype] = useState('');

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const router = useRouter();

  const { supermarketProductID } = router.query;
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

  const fetchSupermarketProductProfile = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/admin/supermarketproducts/${supermarketProductID}`,
      config
    );

    setProductID(data.productID);
    setProductName(data.productName);
    setSupermarket(data.supermarket);
    setPrice(data.price);
    setOffer(data.offer);
    setLink(data.link);
    setImage(data.image);
    setDrinkType(data.drinkType);
    setDrinkSubtype(data.drinkSubtype);

    return data;
  };

  const { isLoading, error, data, status } = useQuery(
    'editSupermarketProductProfile',
    fetchSupermarketProductProfile
  );

  const {
    register: updateSupermarketProduct,
    handleSubmit: handleUpdateSupermarketProductSubmit,
    watch: updateSupermarketProductWatch,
    errors: updateSupermarketProductErrors,
  } = useForm();

  const onUpdateSupermarketProductSubmit = async ({
    productName,
    productID,
    supermarket,
    price,
    offer,
    link,
    image,
    drinkType,
    drinkSubtype,
  }) => {
    try {
      await axios.put(
        `http://localhost:3001/api/admin/supermarketproducts/${supermarketProductID}`,
        {
          productName,
          productID,
          supermarket,
          price,
          offer,
          link,
          image,
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

  const title = 'Admin Panel - Edit Supermarket Product';

  return (
    <Layout title={title}>
      <main className='flex flex-col w-full justify-center items-center mt-10 mb-20'>
        {isLoading && <Loader />}
        {status === 'success' && (
          <div className='container px-64 flex flex-col justify-center items-center'>
            <h2 className='text-5xl font-heading font-bold my-10'>
              Edit Supermarket Product -{' '}
              <span className='italic'>{data.productName}</span>
            </h2>
            <form
              className='bg-white rounded pb-8 w-full'
              onSubmit={handleUpdateSupermarketProductSubmit(
                onUpdateSupermarketProductSubmit
              )}
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
                    ref={updateSupermarketProduct({ required: true })}
                    required
                  />
                </div>
                <div className='mb-10'>
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
                    value={productID}
                    onChange={(e) => setProductID(e.target.value)}
                    ref={updateSupermarketProduct({ required: true })}
                    required
                  />
                </div>
                <div className='border-b border-gray-200 w-full my-6'></div>
                <div className='mb-6 w-full'>
                  <label
                    htmlFor='supermarket'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Supermarket <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='text'
                    name='supermarket'
                    id='supermarket'
                    value={supermarket}
                    onChange={(e) => setSupermarket(e.target.value)}
                    ref={updateSupermarketProduct({ required: true })}
                    required
                  />
                </div>
                <div className='mb-6 w-full'>
                  <label
                    htmlFor='price'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Price (p) <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='number'
                    name='price'
                    id='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    ref={updateSupermarketProduct({ required: true })}
                    required
                  />
                </div>
                <div className='mb-6 w-full'>
                  <label
                    htmlFor='offer'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Offer <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='text'
                    name='offer'
                    id='offer'
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    ref={updateSupermarketProduct({ required: true })}
                    required
                  />
                </div>
                <div className='mb-6 w-full'>
                  <label
                    htmlFor='link'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Link <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='text'
                    name='link'
                    id='link'
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    ref={updateSupermarketProduct({ required: true })}
                    required
                  />
                </div>
                <div className='mb-6 w-full'>
                  <label
                    htmlFor='image'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Image <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='text'
                    name='image'
                    id='image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    ref={updateSupermarketProduct({ required: true })}
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
                    ref={updateSupermarketProduct({ required: true })}
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
                  ref={updateSupermarketProduct()}
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
        )}
      </main>
    </Layout>
  );
};

export default EditDrinkPageAdmin;
