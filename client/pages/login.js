import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Axios from 'axios';

const LoginPage = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
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

  return (
    <Layout title='Login'>
      <main>
        <h1 className='text-xl'>Login Page</h1>
        <div className='py-3'>
          <h3>Sign in below</h3>
          <div>
            <form
              className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Email Address
                </label>
                <input
                  className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                  className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                Sign In!
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default LoginPage;
