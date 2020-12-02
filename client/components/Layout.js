import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children, title, landingPage, image, description, url }) => {
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
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:url' content={url} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />
        <meta name='twitter:card' content='summary_large_image' />
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
