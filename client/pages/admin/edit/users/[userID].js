import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { restAPI } from '../../../../api/calls';
import Layout from '../../../../components/Layout';
import Loader from '../../../../components/Loader';
import { notifyError, notifySuccess } from '../../../../utils/alerts';

const EditUserPageAdmin = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [admin, setAdmin] = useState(false);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  const router = useRouter();

  const { userID } = router.query;
  const userInfo = useSelector((state) => state.userInfo);
  const { isAdmin } = userInfo;

  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin]);

  const fetchUserProfile = async () => {
    const { data } = await restAPI.get(`/admin/users/${userID}`);

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
    if (Number(userID) === userInfo.userID) {
      notifyError(
        'Editing your own user info in this panel is restricted, to prevent admin accounts from locking themselves out!'
      );
    } else {
      try {
        await restAPI.put(`/admin/users/${userID}`, {
          username,
          email,
          firstName,
          lastName,
          location,
          bio,
          isAdmin: admin,
        });
        notifySuccess('Changes saved successfully!');
      } catch (error) {
        notifyError(`Oops! ${error.message}`);
      }
    }
  };

  const title = 'Admin Panel - Edit User';

  return (
    <Layout title={title}>
      <main className='flex flex-col w-full justify-center items-center mt-10 mb-20'>
        {isLoading && <Loader />}
        {status === 'success' && (
          <div className='container px-64 flex flex-col justify-center items-center'>
            <h2 className='text-5xl font-bold font-heading my-10'>
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
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Username <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Email Address <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={updateAccount({ required: true })}
                    required
                  />
                </div>
                <div className='border-b border-gray-200 w-full my-6'></div>
                <div className='mb-6 w-full'>
                  <label
                    htmlFor='firstName'
                    className='block text-gray-700 text-sm font-medium'
                  >
                    First Name <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                    className='block text-gray-700 text-sm font-medium'
                  >
                    Last Name <span className='text-red-700'>*</span>
                  </label>
                  <input
                    className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                  className='block text-gray-700 text-sm font-medium'
                >
                  Location
                </label>
                <input
                  className='mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
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
                  className='block text-gray-700 text-sm font-medium'
                >
                  Bio
                </label>
                <textarea
                  className='h-32 mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                  type='text'
                  name='bio'
                  id='bio'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  ref={updateAccount()}
                />
              </div>
              <div className='border-b border-gray-200 w-full my-6'></div>
              <input
                type='checkbox'
                id='admin'
                name='admin'
                checked={admin}
                onChange={(e) => setAdmin(e.target.checked)}
                ref={updateAccount()}
              />
              <label className='ml-5 text-gray-700 text-sm font-medium'>
                Is Admin?
              </label>
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

export default EditUserPageAdmin;
