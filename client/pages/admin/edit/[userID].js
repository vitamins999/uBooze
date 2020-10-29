import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import axios from 'axios';
import Layout from '../../../components/Layout';
import Loader from '../../../components/Loader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const EditUserPageAdmin = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [admin, setAdmin] = useState(false);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const router = useRouter();

  const { userID } = router.query;
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

  const fetchUserProfile = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/admin/users/${userID}`,
      config
    );

    setUsername(data.username);
    setEmail(data.email);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAdmin(data.isAdmin);
    setBio(data.bio);
    setLocation(data.location);

    return data;
  };

  const { isLoading, error, data, status } = useQuery(
    'userProfile',
    fetchUserProfile
  );

  const {
    register: updateAccount,
    handleSubmit: handleUpdateAccountSubmit,
    watch: updateAccountWatch,
    errors: updateAccountErrors,
  } = useForm();

  const onUpdateAccountSubmit = async ({
    username,
    email,
    firstName,
    lastName,
    location,
    bio,
    admin,
  }) => {
    try {
      await axios.put(
        `http://localhost:3001/api/admin/users/${userID}`,
        { username, email, firstName, lastName, location, bio, isAdmin: admin },
        config
      );
      notifySuccess('Changes saved successfully!');
    } catch (error) {
      notifyError(`Oops! ${error.message}`);
    }
  };

  const title = 'Admin Panel - Edit User';

  return (
    <Layout title={title}>
      <main className='flex flex-col w-full justify-center items-center mt-10 mb-20'>
        {isLoading && <Loader />}
        {status === 'success' && (
          <div className='container px-64 flex flex-col justify-center items-center'>
            <h2 className='text-5xl font-bold my-10'>
              Edit User - {data.username}
            </h2>
            <form
              className='bg-white rounded pb-8 w-full'
              onSubmit={handleUpdateAccountSubmit(onUpdateAccountSubmit)}
            >
              <div>
                <div className='mb-6'>
                  <label
                    htmlFor='username'
                    className='block text-gray-900 text-sm font-semibold'
                  >
                    Username <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                    type='username'
                    name='username'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    ref={updateAccount({ required: true })}
                    required
                  />
                  <p className='text-sm text-gray-500 pt-1'>
                    ubooze Profile URL: https://www.ubooze.com/profile/
                    <span className='font-semibold'>{username}</span>
                  </p>
                </div>
                <div className='mb-10'>
                  <label
                    htmlFor='email'
                    className='block text-gray-900 text-sm font-semibold'
                  >
                    Email Address <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={updateAccount({ required: true })}
                    required
                  />
                </div>
                <div className='border-b border-gray-400 w-full my-6'></div>
                <div className='mb-6 w-full'>
                  <label
                    htmlFor='firstName'
                    className='block text-gray-900 text-sm font-semibold'
                  >
                    First Name <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name='firstName'
                    id='firstName'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    ref={updateAccount({ required: true })}
                    required
                  />
                </div>
                <div className='mb-6 w-full'>
                  <label
                    htmlFor='lastName'
                    className='block text-gray-900 text-sm font-semibold'
                  >
                    Last Name <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name='lastName'
                    id='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    ref={updateAccount({ required: true })}
                    required
                  />
                </div>
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='location'
                  className='block text-gray-900 text-sm font-semibold'
                >
                  Location
                </label>
                <input
                  className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                  type='location'
                  name='location'
                  id='location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  ref={updateAccount()}
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='bio'
                  className='block text-gray-900 text-sm font-semibold'
                >
                  Bio
                </label>
                <textarea
                  className='w-full h-32 shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  name='bio'
                  id='bio'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  ref={updateAccount()}
                />
              </div>
              <div className='border-b border-gray-400 w-full my-6'></div>
              <input
                type='checkbox'
                id='admin'
                name='admin'
                checked={admin}
                onChange={(e) => setAdmin(e.target.checked)}
                ref={updateAccount()}
              />
              <label className='text-lg ml-5'>Is Admin?</label>
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

export default EditUserPageAdmin;
