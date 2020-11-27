import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children, title, landingPage }) => {
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
      <div className='font-body text-gray-600 bg-white'>
        <NavBar landingPage={landingPage} />
        <div className='text-gray-700'>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
