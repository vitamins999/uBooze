import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserProfile,
  updateUserAccount,
} from '../../lib/slices/userInfoSlice';
import { useForm } from 'react-hook-form';
import { restAPI } from '../../api/calls';
import { deleteUserAccountAPI } from '../../api/private';

import { motion } from 'framer-motion';
import { fadeOutPage } from '../../animations/navigation';

import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import { notifyError, notifySuccess } from '../../utils/alerts';

const EditProfile = () => {
  const [currentSection, setCurrentSection] = useState('profile');
  const [hoverOnName, setHoverOnName] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();
  const router = useRouter();

  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [location, setLocation] = useState(
    userInfo.location ? userInfo.location : ''
  );
  const [bio, setBio] = useState(userInfo.bio ? userInfo.bio : '');
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);

  const [confirmPasswordAccount, setConfirmPasswordAccount] = useState('');

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

  useEffect(() => {
    if (updateProfileErrors.firstName?.type === 'required') {
      notifyError('First name is required');
    }
    if (updateProfileErrors.lastName?.type === 'required') {
      notifyError('Last name is required');
    }
    if (updateProfileErrors.location?.type === 'maxLength') {
      notifyError('Location cannot exceed 50 characters');
    }
    if (updateProfileErrors.bio?.type === 'maxLength') {
      notifyError('Bio cannot exceed 200 characters');
    }
  }, [updateProfileErrors]);

  useEffect(() => {
    if (updateAccountErrors.username?.type === 'required') {
      notifyError('Username is required');
    }
    if (updateAccountErrors.username?.type === 'maxLength') {
      notifyError('Username cannot exceed 30 characters');
    }
    if (updateAccountErrors.email?.type === 'required') {
      notifyError('Email is required');
    }
    if (updateAccountErrors.email?.type === 'maxLength') {
      notifyError('Email cannot exceed 200 characters');
    }
    if (updateAccountErrors.confirmPasswordAccount?.type === 'minLength') {
      notifyError('Password must be at least 6 characters');
    }
    if (updateAccountErrors.confirmPasswordAccount?.type === 'maxLength') {
      notifyError('Password cannot exceed 20 characters');
    }
    if (updateAccountErrors.confirmPasswordAccount?.type === 'required') {
      notifyError('Password is required to save changes');
    }
  }, [updateAccountErrors]);

  useEffect(() => {
    if (updatePasswordErrors.oldPassword?.type === 'minLength') {
      notifyError('Old password must be at least 6 characters');
    }
    if (updatePasswordErrors.oldPassword?.type === 'maxLength') {
      notifyError('Old password cannot exceed 20 characters');
    }
    if (updatePasswordErrors.oldPassword?.type === 'required') {
      notifyError('Old password is required');
    }
    if (updatePasswordErrors.newPassword?.type === 'minLength') {
      notifyError('New password must be at least 6 characters');
    }
    if (updatePasswordErrors.newPassword?.type === 'maxLength') {
      notifyError('New password cannot exceed 20 characters');
    }
    if (updatePasswordErrors.newPassword?.type === 'required') {
      notifyError('New password is required');
    }
    if (updatePasswordErrors.confirmNewPassword?.type === 'minLength') {
      notifyError('Confirm new password must be at least 6 characters');
    }
    if (updatePasswordErrors.confirmNewPassword?.type === 'maxLength') {
      notifyError('Confirm new password cannot exceed 20 characters');
    }
    if (updatePasswordErrors.confirmNewPassword?.type === 'required') {
      notifyError('Confirm new password is required');
    }
  }, [updatePasswordErrors]);

  const fetchCurrentProfile = async () => {
    const { data } = await restAPI.get(`/profile/currentUser`);

    return data;
  };

  const onUpdateProfileSubmit = async ({
    firstName,
    lastName,
    location,
    bio,
  }) => {
    try {
      dispatch(updateUserProfile(firstName, lastName, location, bio));
      notifySuccess('Profile updated successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateAccountSubmit = async ({
    username,
    email,
    confirmPasswordAccount,
  }) => {
    try {
      const isError = await dispatch(
        updateUserAccount(username, email, confirmPasswordAccount)
      );
      if (isError) {
        notifyError(isError.msg);
      } else {
        notifySuccess('Account settings updated successfully!');
      }
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
    } else {
      try {
        const { data } = await restAPI.put(`/profile/currentUser/password`, {
          oldPassword,
          newPassword,
        });

        if (data.error) {
          notifyError(data.msg);
        } else {
          notifySuccess(data.msg);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (confirmPasswordAccount === '') {
      notifyError('Password is required to delete account');
    } else {
      if (
        window.confirm(
          'WARNING: THIS CANNOT BE UNDONE.  Are you sure you want to delete your account?'
        )
      ) {
        const data = await deleteUserAccountAPI(confirmPasswordAccount);

        if (data.error) {
          notifyError(data.msg);
        } else {
          router.push('/login?logout=true');
        }
      }
    }
  };

  const { isLoading, error, data, status } = useQuery(
    'currentProfile',
    fetchCurrentProfile
  );

  const title = 'Edit Profile';

  return (
    <Layout title={title}>
      <motion.main
        variants={fadeOutPage}
        exit='exit'
        initial='initial'
        animate='animate'
        className='flex flex-col 2xl:pl-128 xl:pl-64 iPadWidescreen:px-16 iPadPro:px-16 h-full justify-center lg:items-start items-center'
      >
        {isLoading && <Loader />}
        {status === 'success' && (
          <div>
            <section className='mt-16 h-32'>
              <div className='flex lg:flex-row flex-col lg:items-center'>
                <img
                  src={userInfo.gravatar}
                  alt='profile image'
                  className={`rounded-full w-20 h-20 lg:mb-0 mb-2 mx-auto lg:mx-0 ${
                    hoverOnName &&
                    'opacity-75 transition ease-in-out duration-200'
                  }`}
                />
                <div className='flex flex-col justify-center lg:ml-8'>
                  <h2 className='lg:text-lg text-base font-bold text-gray-900 tracking-wide flex flex-col lg:flex-row'>
                    <Link href={`/profile/${userInfo.username}`}>
                      <a
                        onMouseEnter={() => setHoverOnName(true)}
                        onMouseLeave={() => setHoverOnName(false)}
                        className='text-green-500 hover:text-green-600 transition ease-in-out duration-200 mx-auto'
                      >
                        {userInfo.username}
                      </a>
                    </Link>
                    <span className='flex mx-auto lg:mx-0'>
                      {' '}
                      <span className='lg:flex hidden lg:mx-1 mx-auto'>
                        /
                      </span>{' '}
                      {currentSection === 'profile' && 'Edit Profile'}
                      {currentSection === 'account' && 'Account Settings'}
                      {currentSection === 'password' && 'Change Password'}
                    </span>
                  </h2>
                  {currentSection === 'profile' && (
                    <h3 className='lg:text-sm text-xs mx-auto lg:mx-0'>
                      Edit your public profile details.
                    </h3>
                  )}
                  {currentSection === 'account' && (
                    <h3 className='lg:text-sm text-xs mx-auto lg:mx-0'>
                      Change your account settings.
                    </h3>
                  )}
                  {currentSection === 'password' && (
                    <h3 className='lg:text-sm text-xs mx-auto lg:mx-0'>
                      Update your password.
                    </h3>
                  )}
                </div>
              </div>
            </section>
            <div className='flex lg:flex-row flex-col'>
              <section className='lg:my-12 mt-16 -mb-5 lg:text-sm text-xs w-64 iPad:w-128'>
                <ul className='flex lg:flex-col flex-row flex-wrap justify-center iPad:justify-around'>
                  <li className='lg:pb-1'>
                    <button
                      onClick={() => setCurrentSection('profile')}
                      className={`flex items-center py-2 focus:outline-none ${
                        currentSection === 'profile'
                          ? 'text-gray-900 font-semibold'
                          : 'hover:text-green-500 transition ease-in-out duration-200 text-gray-500 font-medium'
                      }`}
                    >
                      <svg
                        className='w-6 h-6 lg:mr-4 mr-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        ></path>
                      </svg>
                      Edit Profile
                    </button>
                  </li>
                  <li className='lg:py-1 lg:ml-0 ml-1 iPad:ml-0'>
                    <button
                      onClick={() => setCurrentSection('account')}
                      className={`flex justify-center items-center py-2 focus:outline-none ${
                        currentSection === 'account'
                          ? 'text-gray-900 font-semibold'
                          : 'hover:text-green-500 transition ease-in-out duration-200 text-gray-500 font-medium'
                      }`}
                    >
                      <svg
                        className='w-6 h-6 lg:mr-4 mr-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                        ></path>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        ></path>
                      </svg>
                      Account Settings
                    </button>
                  </li>
                  <li className='lg:py-1'>
                    <button
                      onClick={() => setCurrentSection('password')}
                      className={`flex justify-center items-center py-2 focus:outline-none ${
                        currentSection === 'password'
                          ? 'text-gray-900 font-semibold'
                          : 'hover:text-green-500 transition ease-in-out duration-200 text-gray-500 font-medium'
                      }`}
                    >
                      <svg
                        className='w-6 h-6 lg:mr-4 mr-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
                        ></path>
                      </svg>
                      Change Password
                    </button>
                  </li>
                </ul>
              </section>
              <section className='my-12 lg:ml-24 lg:w-128 w-64 lg:h-128 iPadPro:mb-36 iPad:w-128'>
                {currentSection === 'profile' && (
                  <form
                    className='bg-white rounded pb-8 mb-4 w-full'
                    onSubmit={handleUpdateProfileSubmit(onUpdateProfileSubmit)}
                  >
                    <div className='flex lg:justify-between lg:flex-row flex-col'>
                      <div className='mb-6 w-full lg:pr-2'>
                        <label
                          htmlFor='firstName'
                          className='block text-gray-700 text-sm font-medium'
                        >
                          First name <span className='text-red-700'>*</span>
                        </label>
                        <input
                          className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                          type='text'
                          name='firstName'
                          id='firstName'
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          ref={updateProfile({ required: true })}
                        />
                      </div>
                      <div className='mb-6 w-full lg:pl-2'>
                        <label
                          htmlFor='lastName'
                          className='block text-gray-700 text-sm font-medium'
                        >
                          Last name <span className='text-red-700'>*</span>
                        </label>
                        <input
                          className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                          type='text'
                          name='lastName'
                          id='lastName'
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          ref={updateProfile({ required: true })}
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
                        className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                        type='location'
                        name='location'
                        id='location'
                        placeholder="Let us know where you're from... "
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        ref={updateProfile({ maxLength: 50 })}
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
                        className='h-32 resize-none text-sm mt-1 w-full shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                        type='text'
                        name='bio'
                        id='bio'
                        placeholder='Share something about yourself with the rest of the community...'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        ref={updateProfile({ maxLength: 200 })}
                      />
                    </div>
                    <div className='border-b border-gray-200 w-full my-8'></div>
                    <div className='w-full flex justify-end'>
                      <button
                        className='text-sm shadow-sm lg:w-auto w-full border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
                        type='submit'
                      >
                        Save
                      </button>
                    </div>
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
                          className='block text-gray-700 text-sm font-medium'
                        >
                          Username <span className='text-red-700'>*</span>
                        </label>
                        <input
                          className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                          type='username'
                          name='username'
                          id='username'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          ref={updateAccount({ required: true, maxLength: 30 })}
                        />
                        <p className='lg:text-sm text-xs lg:flex hidden text-gray-500 pt-1'>
                          Your ubooze Profile URL:
                          https://www.ubooze.com/profile/
                          <span className='font-semibold'>
                            {userInfo.username}
                          </span>
                        </p>
                      </div>
                      <div className='mb-10'>
                        <label
                          htmlFor='email'
                          className='block text-gray-700 text-sm font-medium'
                        >
                          Email address <span className='text-red-700'>*</span>
                        </label>
                        <input
                          className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                          type='email'
                          name='email'
                          id='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          ref={updateAccount({
                            required: true,
                            maxLength: 200,
                          })}
                        />
                      </div>
                      <div className='border-b border-gray-200 w-full my-6'></div>
                      <div className='flex justify-between lg:py-5 py-0 lg:flex-row flex-col'>
                        <div>
                          <p className='text-gray-900 lg:text-xl text-lg font-semibold'>
                            Close Account
                          </p>
                          <p className='lg:text-sm text-xs text-gray-500 py-2'>
                            Delete my account and all account data
                          </p>
                        </div>
                        <a
                          onClick={() => handleDeleteAccount()}
                          className='px-7 py-5 lg:my-0 my-5 lg:w-auto w-full text-md font-semibold tracking-tighter text-white bg-red-600 border-gray-400 border text-center rounded-md hover:bg-red-800 hover:text-white transition ease-in-out duration-100 cursor-pointer'
                        >
                          Close Account
                        </a>
                      </div>
                      <div className='border-b border-gray-200 w-full my-6'></div>
                      <div className='mb-6'>
                        <label
                          htmlFor='confirmNewPassword'
                          className='block text-gray-700 text-sm font-medium'
                        >
                          Confirm password{' '}
                          <span className='text-red-700'>*</span>
                        </label>
                        <input
                          className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                          type='password'
                          name='confirmPasswordAccount'
                          id='confirmPasswordAccount'
                          onChange={(e) =>
                            setConfirmPasswordAccount(e.target.value)
                          }
                          ref={updateAccount({
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                          })}
                        />
                      </div>
                      <div className='w-full flex justify-end'>
                        <button
                          className='text-sm shadow-sm lg:w-auto w-full border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
                          type='submit'
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                {currentSection === 'password' && (
                  <form
                    className='bg-white rounded pb-8 mb-4 w-full'
                    onSubmit={handleUpdatePasswordSubmit(
                      onUpdatePasswordSubmit
                    )}
                  >
                    <div className='mb-6'>
                      <label
                        htmlFor='oldPassword'
                        className='block text-gray-700 text-sm font-medium'
                      >
                        Old password <span className='text-red-700'>*</span>
                      </label>
                      <input
                        className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                        type='password'
                        name='oldPassword'
                        id='oldPassword'
                        ref={updatePassword({
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                        })}
                      />
                    </div>
                    <div className='mb-6'>
                      <label
                        htmlFor='newPassword'
                        className='block text-gray-700 text-sm font-medium'
                      >
                        New password <span className='text-red-700'>*</span>
                      </label>
                      <input
                        className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                        type='password'
                        name='newPassword'
                        id='newPassword'
                        ref={updatePassword({
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                        })}
                      />
                    </div>
                    <div className='mb-6'>
                      <label
                        htmlFor='confirmNewPassword'
                        className='block text-gray-700 text-sm font-medium'
                      >
                        Confirm new password{' '}
                        <span className='text-red-700'>*</span>
                      </label>
                      <input
                        className='mt-1 w-full text-sm shadow-inner border transition duration-150 rounded-md py-2 px-3 text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2'
                        type='password'
                        name='confirmNewPassword'
                        id='confirmNewPassword'
                        ref={updatePassword({
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                        })}
                      />
                    </div>
                    <div className='border-b border-gray-200 w-full my-8'></div>
                    <div className='w-full flex lg:justify-end'>
                      <button
                        className='text-sm lg:w-auto w-full shadow-sm border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
                        type='submit'
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                )}
              </section>
            </div>
          </div>
        )}
      </motion.main>
    </Layout>
  );
};

export default EditProfile;
