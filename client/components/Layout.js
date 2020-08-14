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
      <div className='font-body text-gray-600 bg-white'>
        <NavBar page={page} />
        <div className='text-gray-700'>{children}</div>
      </div>
      <svg
        className='-mb-24'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#000000'
          fillOpacity='1'
          d='M0,32L60,58.7C120,85,240,139,360,176C480,213,600,235,720,202.7C840,171,960,85,1080,74.7C1200,64,1320,128,1380,160L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'
        ></path>
      </svg>
      <footer className='bg-black font-body text-white text-sm text-center pb-8'>
        <ul className='flex justify-around pb-10 pt-5 px-40'>
          <li>
            <a
              className='hover:text-gray-400 transition ease-out duration-100'
              href='#'
            >
              Frequently Asked Questions
            </a>
          </li>
          <a
            className='hover:text-gray-400 transition ease-out duration-100'
            href='#'
          >
            <li>Contact Us</li>
          </a>
        </ul>
        <div className='flex flex-col'>
          <p>Copyright 2020</p>
          <p>All rights reserved</p>
          <a href='#'>
            <img className='w-6 ml-40' src='github-blue.svg' alt='github' />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Layout;
