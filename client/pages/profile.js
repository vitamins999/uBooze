import axios from 'axios';
import Layout from '../components/Layout';

const ProfilePage = ({ user }) => {
  return (
    <Layout title='Profile'>
      <main>
        <h1 className='text-xl'>Profile Page</h1>
        <h2 className='mt-4'>Hello {user.displayName}!</h2>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const reqCookies = context.req.headers && context.req.headers.cookie;

    const res = await axios.get('http://localhost:3001/api/profile/', {
      headers: { Cookie: reqCookies },
    });
    const user = res.data;
    console.log(user);
    return {
      props: { user },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

export default ProfilePage;
