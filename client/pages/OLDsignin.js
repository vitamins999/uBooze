import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Axios from 'axios';

const LoginPage = () => {
  const {
    register: login,
    handleSubmit: handleLoginSubmit,
    watch: loginWatch,
    errors: loginErrors,
  } = useForm();

  const {
    register,
    handleSubmit: handleRegisterSubmit,
    watch: registerWatch,
    errors: registerErrors,
  } = useForm();
  const router = useRouter();

  const onLoginSubmit = async (data) => {
    try {
      const res = await Axios({
        method: 'POST',
        withCredentials: true,
        data: data,
        url: 'http://localhost:3001/api/auth/login',
      });
      if (res.status === 200) {
        router.push('/');
      } else if (res.status === 500) {
        router.push('/register');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRegisterSubmit = async (data) => {
    try {
      const res = await Axios({
        method: 'POST',
        data: data,
        url: 'http://localhost:3001/api/auth/register',
      });
      if (res.status === 200) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title='Login'>
      <main>
        <div className='px-40'>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <form
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
                onSubmit={handleLoginSubmit(onLoginSubmit)}
              >
                <h3 className='text-lg text-center font-bold'>
                  Already have an account?
                </h3>
                <div className='mb-4 mt-4'>
                  <label
                    htmlFor='email'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Email Address
                  </label>
                  <input
                    className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email address...'
                    ref={login({ required: true })}
                  />
                </div>
                <div className='mb-6'>
                  <label
                    htmlFor='password'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Password
                  </label>
                  <input
                    className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password...'
                    ref={login({ required: true })}
                  />
                </div>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Sign In!
                </button>
                <div className='py-8 pt-12 mt-3'>
                  <h3 className='text-gray-700 leading-tight font-semibold'>
                    Login with...
                  </h3>
                  <div>
                    <ul className='py-4 flex'>
                      <li>
                        <a
                          href='http://localhost:3001/api/auth/google'
                          className='bg-red-500 hover:bg-red-700 cursor-pointer text-white py-2 px-3 rounded'
                        >
                          Google
                        </a>
                      </li>
                      <li>
                        <a
                          href='http://localhost:3001/api/auth/facebook'
                          className='bg-blue-500 hover:bg-blue-700 cursor-pointer text-white py-2 px-3 ml-2 rounded'
                        >
                          Facebook
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>

            <div>
              <div>
                <form
                  className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
                  onSubmit={handleRegisterSubmit(onRegisterSubmit)}
                >
                  <h3 className='text-lg text-center font-bold'>
                    Register for a new account
                  </h3>
                  <div className='mb-4 mt-4'>
                    <label
                      htmlFor='firstName'
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      First Name
                    </label>
                    <input
                      className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      type='text'
                      name='firstName'
                      id='firstName'
                      placeholder='First name...'
                      ref={register}
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor='lastName'
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      Last Name
                    </label>
                    <input
                      className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      type='text'
                      name='lastName'
                      id='lastName'
                      placeholder='Last name...'
                      ref={register}
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor='email'
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      Email Address
                    </label>
                    <input
                      className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Email address...'
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      htmlFor='password'
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      Password
                    </label>
                    <input
                      className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Password...'
                      ref={register({ required: true })}
                    />
                  </div>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='submit'
                  >
                    Register!
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default LoginPage;
