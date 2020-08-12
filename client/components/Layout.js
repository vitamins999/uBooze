import Head from 'next/head';
import NavBar from './NavBar';

const Layout = ({ children, title, page }) => {
  return (
    <>
      <Head>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='favicon-16x16.png'
        />
        <title>uBooze | {title}</title>
      </Head>
      <div className='font-body text-gray-600 bg-gray-100'>
        <NavBar page={page} />
        <div className='text-gray-700'>{children}</div>
      </div>
    </>
  );
};

export default Layout;
