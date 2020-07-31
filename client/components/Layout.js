import Head from 'next/head';
import NavBar from './NavBar';

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>uBooze | {title}</title>
      </Head>
      <div className='font-body text-gray-600 bg-gray-100 p-4 h-screen w-screen'>
        <NavBar />
        <div className='text-gray-700'>{children}</div>
      </div>
    </>
  );
};

export default Layout;
