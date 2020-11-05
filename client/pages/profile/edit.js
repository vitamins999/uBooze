import { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserProfile,
  updateUserAccount,
} from '../../lib/slices/userInfoSlice';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import Link from 'next/link';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const EditProfile = () => {
  const [currentSection, setCurrentSection] = useState('profile');
  const [hoverOnName, setHoverOnName] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [location, setLocation] = useState(
    userInfo.location ? userInfo.location : "Let us know where you're from... "
  );
  const [bio, setBio] = useState(
    userInfo.bio
      ? userInfo.bio
      : 'Share something about yourself with the rest of the community...'
  );
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const {
    register: updateProfile,
    handleSubmit: handleUpdateProfileSubmit,
    watch: updateProfileWatch,
    errors: updateProfileErrors,
  } = useForm();

  const {
    register: updateAccount,
    handleSubmit: handleUpdateAccountSubmit,
    watch: updateAccountWatch,
    errors: updateAccountErrors,
  } = useForm();

  const {
    register: updatePassword,
    handleSubmit: handleUpdatePasswordSubmit,
    watch: updatePasswordWatch,
    errors: updatePasswordErrors,
  } = useForm();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${userInfo.token}`,
    },
  };

  const fetchCurrentProfile = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/profile/currentUser`,
      config
    );

    return data;
  };

  const onUpdateProfileSubmit = async ({
    firstName,
    lastName,
    location,
    bio,
  }) => {
    try {
      dispatch(
        updateUserProfile(firstName, lastName, location, bio, userInfo.token)
      );
      notifySuccess('Profile updated successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateAccountSubmit = async ({ username, email }) => {
    try {
      dispatch(updateUserAccount(username, email, userInfo.token));
      notifySuccess('Account settings updated successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdatePasswordSubmit = async ({
    oldPassword,
    newPassword,
    confirmNewPassword,
  }) => {
    if (newPassword !== confirmNewPassword) {
      notifyError('Your new password and confirm new password DO NOT MATCH!');
    }

    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/profile/currentUser/password`,
        { oldPassword, newPassword },
        config
      );

      if (data.error) {
        notifyError(data.msg);
      } else {
        notifySuccess(data.msg);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const { isLoading, error, data, status } = useQuery(
    'currentProfile',
    fetchCurrentProfile
  );

  const title = 'Edit Profile';

  return (
    <Layout title={title}>
      <main className='grid grid-cols-10 grid-rows-4'>
        {isLoading && <Loader />}
        {status === 'success' && (
          <>
            <section className='row-span-1 col-start-3 col-end-9 mt-16 h-32'>
              <div className='flex'>
                <img
                  src={userInfo.gravatar}
                  alt='profile image'
                  className={`rounded-full w-20 h-20 ${
                    hoverOnName &&
                    'opacity-75 transition ease-in-out duration-100'
                  }`}
                />
                <div className='flex flex-col justify-center ml-8'>
                  <h2 className='text-lg font-bold text-gray-900 tracking-wide'>
                    <Link href={`/profile/${userInfo.username}`}>
                      <a
                        onMouseEnter={() => setHoverOnName(true)}
                        onMouseLeave={() => setHoverOnName(false)}
                        className='text-orange-500 hover:text-orange-700 transition ease-in-out duration-100'
                      >
                        {userInfo.username}
                      </a>
                    </Link>
                    <span>
                      {' '}
                      / {currentSection === 'profile' && 'Edit Profile'}
                      {currentSection === 'account' && 'Account Settings'}
                      {currentSection === 'password' && 'Change Password'}
                    </span>
                  </h2>
                  {currentSection === 'profile' && (
                    <h3 className='text-sm'>
                      Edit your public profile details.
                    </h3>
                  )}
                  {currentSection === 'account' && (
                    <h3 className='text-sm'>Change your account settings.</h3>
                  )}
                  {currentSection === 'password' && (
                    <h3 className='text-sm'>Update your password.</h3>
                  )}
                </div>
              </div>
            </section>
            <section className='row-span-2 col-start-3 col-end-4 my-12 text-sm'>
              <ul>
                <li className='pb-1'>
                  <button
                    onClick={() => setCurrentSection('profile')}
                    className={`py-2 focus:outline-none ${
                      currentSection === 'profile'
                        ? 'text-gray-900 font-bold'
                        : 'hover:text-orange-500 transition ease-in-out duration-200 font-medium'
                    }`}
                  >
                    Edit Profile
                  </button>
                </li>
                <li className='py-1'>
                  <button
                    onClick={() => setCurrentSection('account')}
                    className={`py-2 focus:outline-none ${
                      currentSection === 'account'
                        ? 'text-gray-900 font-bold'
                        : 'hover:text-orange-500 transition ease-in-out duration-200 font-medium'
                    }`}
                  >
                    Account Settings
                  </button>
                </li>
                <li className='py-1'>
                  <button
                    onClick={() => setCurrentSection('password')}
                    className={`py-2 focus:outline-none ${
                      currentSection === 'password'
                        ? 'text-gray-900 font-bold'
                        : 'hover:text-orange-500 transition ease-in-out duration-200 font-medium'
                    }`}
                  >
                    Change Password
                  </button>
                </li>
              </ul>
            </section>
            <section className='row-start-2 row-end-5 col-start-4 col-end-9 my-12 ml-24'>
              {currentSection === 'profile' && (
                <form
                  className='bg-white rounded pb-8 mb-4 w-full'
                  onSubmit={handleUpdateProfileSubmit(onUpdateProfileSubmit)}
                >
                  <div className='flex justify-between'>
                    <div className='mb-6 w-full pr-2'>
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
                        ref={updateProfile({ required: true })}
                        required
                      />
                    </div>
                    <div className='mb-6 w-full pl-2'>
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
                        ref={updateProfile({ required: true })}
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
                      ref={updateProfile()}
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
                      ref={updateProfile()}
                    />
                  </div>
                  <div className='border-b border-gray-400 w-full my-8'></div>
                  <button
                    className='text-sm tracking-tight w-52 bg-orange-500 transition duration-100 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline'
                    type='submit'
                  >
                    Save Profile
                  </button>
                </form>
              )}
              {currentSection === 'account' && (
                <form
                  className='bg-white rounded pb-8 mb-4 w-full'
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
                        Your ubooze Profile URL: https://www.ubooze.com/profile/
                        <span className='font-semibold'>
                          {userInfo.username}
                        </span>
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
                    <div className='flex justify-between py-5'>
                      <div>
                        <p className='text-gray-900 text-xl font-semibold'>
                          Close Account
                        </p>
                        <p className='text-sm text-gray-500 py-2'>
                          Delete my account and all account data
                        </p>
                      </div>
                      <a
                        onClick={() => notify('Account deleted!')}
                        className='px-7 py-5 text-md w-48 font-semibold tracking-tighter text-white bg-red-600 border-gray-400 border text-center rounded-md hover:bg-red-800 hover:text-white transition ease-in-out duration-100 cursor-pointer'
                      >
                        Close Account
                      </a>
                    </div>
                    <div className='border-b border-gray-400 w-full my-6'></div>
                    <button
                      className='text-sm tracking-tight w-52 bg-orange-500 transition duration-100 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline'
                      type='submit'
                    >
                      Save Account Settings
                    </button>
                  </div>
                </form>
              )}
              {currentSection === 'password' && (
                <form
                  className='bg-white rounded pb-8 mb-4 w-full'
                  onSubmit={handleUpdatePasswordSubmit(onUpdatePasswordSubmit)}
                >
                  <div className='mb-6'>
                    <label
                      htmlFor='oldPassword'
                      className='block text-gray-900 text-sm font-semibold'
                    >
                      Old Password <span className='text-red-700'>*</span>
                    </label>
                    <input
                      className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                      type='password'
                      name='oldPassword'
                      id='oldPassword'
                      ref={updatePassword({ required: true })}
                      required
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      htmlFor='newPassword'
                      className='block text-gray-900 text-sm font-semibold'
                    >
                      New Password <span className='text-red-700'>*</span>
                    </label>
                    <input
                      className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                      type='password'
                      name='newPassword'
                      id='newPassword'
                      ref={updatePassword({ required: true })}
                      required
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      htmlFor='confirmNewPassword'
                      className='block text-gray-900 text-sm font-semibold'
                    >
                      Confirm New Password{' '}
                      <span className='text-red-700'>*</span>
                    </label>
                    <input
                      className='w-full shadow appearance-none border transition duration-150 hover:border-orange-500 focus:border-orange-500 rounded py-2 px-3 text-gray-800 bg-orange-100 hover:bg-white focus:bg-white leading-tight focus:outline-none focus:shadow-outline'
                      type='password'
                      name='confirmNewPassword'
                      id='confirmNewPassword'
                      ref={updatePassword({ required: true })}
                      required
                    />
                  </div>
                  <div className='border-b border-gray-400 w-full my-8'></div>
                  <button
                    className='text-sm tracking-tight w-52 bg-orange-500 transition duration-100 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline'
                    type='submit'
                  >
                    Update Password
                  </button>
                </form>
              )}
            </section>
          </>
        )}
      </main>
    </Layout>
  );
};

export default EditProfile;
