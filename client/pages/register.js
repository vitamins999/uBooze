import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTestData = async () => {
    try {
      const data = await fetch('http://localhost:3001/api/auth/users');
      const user = await data.json();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title='Register'>
      <main>
        <h1 className='text-xl'>Registration Page</h1>
        <div className='py-3'>
          <h3>Register with...</h3>
          <div>
            <ul className='py-2 flex'>
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
              <li>
                <a
                  onClick={handleTestData}
                  className='bg-green-500 hover:bg-green-700 cursor-pointer text-white py-2 px-3 ml-2 rounded'
                >
                  TestData
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='py-3'>
          <h3>Or sign up below</h3>
          <div>
            <form
              className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='mb-4'>
                <label
                  htmlFor='firstName'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  First Name
                </label>
                <input
                  className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                  className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                Sign Up!
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default RegisterPage;
