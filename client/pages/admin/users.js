import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import axios from 'axios';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const EditUsersPage = () => {
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const router = useRouter();

  const userInfo = useSelector((state) => state.userInfo);
  const { isAdmin } = userInfo;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${userInfo.token}`,
    },
  };

  const fetchUsers = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/admin/users`,
      config
    );

    return data;
  };

  const { isLoading, error, data, status } = useQuery('users', fetchUsers);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin]);

  const deleteUserHandler = async (userID) => {
    if (Number(userID) === userInfo.userID) {
      notifyError(
        'Deleting your own user info in this panel is restricted, to prevent admin accounts from locking themselves out!'
      );
    } else {
      if (window.confirm('Are you sure?')) {
        try {
          await axios.delete(
            `http://localhost:3001/api/admin/users/${userID}`,
            config
          );
          notifySuccess('User deleted successfully!');
        } catch (error) {
          notifyError(`Oops! ${error.message}`);
        }
      }
    }
  };

  const title = 'Admin Panel - User List';

  return (
    <Layout title={title}>
      <main className='flex flex-col w-full justify-center items-center mt-10 mb-40'>
        <h2 className='text-5xl font-bold my-10'>Users List</h2>
        {isLoading && <Loader />}
        {status === 'success' && (
          <table className='table-auto'>
            <thead>
              <tr>
                <th className='px-4 py-2'>ID</th>
                <th className='px-4 py-2'>USERNAME</th>
                <th className='px-4 py-2'>EMAIL</th>
                <th className='px-4 py-2'>FIRST NAME</th>
                <th className='px-4 py-2'>LAST NAME</th>
                <th className='px-4 py-2'>ADMIN</th>
                <th className='px-4 py-2'>EDIT</th>
                <th className='px-4 py-2'>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr
                  key={user.userID}
                  className={`${index % 2 === 0 && 'bg-gray-200'}`}
                >
                  <td className='border px-4 py-2'>{user.userID}</td>
                  <td className='border px-4 py-2'>{user.username}</td>
                  <td className='border px-4 py-2'>
                    <Link href={`mailto:${user.email}`}>
                      <a className='hover:text-orange-500'>{user.email}</a>
                    </Link>
                  </td>
                  <td className='border px-4 py-2'>{user.firstName}</td>
                  <td className='border px-4 py-2'>{user.lastName}</td>
                  <td className='border px-4 py-2 flex justify-center'>
                    {user.isAdmin ? (
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='#48bb78'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 13l4 4L19 7'
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='#f56565'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M6 18L18 6M6 6l12 12'
                        ></path>
                      </svg>
                    )}
                  </td>
                  <td className='border px-4 py-2'>
                    <Link href={`/admin/edit/users/${user.userID}`}>
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
                    <button onClick={() => deleteUserHandler(user.userID)}>
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

export default EditUsersPage;
