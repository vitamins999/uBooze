import Link from 'next/link';

const Footer = () => {
  return (
    <footer data-testid='section-footer' className='text-gray-700 bg-gray-100'>
      <div className='container px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-no-wrap flex-wrap flex-col'>
        <div className='w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left'>
          <Link href='/'>
            <a className='flex title-font font-medium items-center justify-center md:justify-start iPad:justify-start text-gray-900 mb-4 md:mb-0'>
              <svg className='h-8 fill-current inline' viewBox='0 0 512 512'>
                <path
                  d='M266.667,448.213V276.779c71.488-5.483,128-65.259,128-138.133c0-30.144-16.107-80.213-27.883-116.779l-4.608-14.4
C360.768,3.029,356.672,0,352,0H161.579c-4.437,0-8.427,2.752-9.984,6.891c-10.304,27.307-34.261,94.763-34.261,131.776
c0,72.853,56.512,132.651,128,138.133v171.435c-53.525,2.176-106.667,20.629-106.667,53.12c0,5.867,4.779,10.645,10.667,10.645
h213.333c5.888,0,10.667-4.779,10.667-10.667C373.333,468.843,320.171,450.389,266.667,448.213z M139.2,149.333
c-0.32-3.52-0.533-7.061-0.533-10.667c0-25.899,15.211-76.309,30.315-117.333h175.232l2.261,7.104
c10.688,33.216,26.859,83.435,26.859,110.229c0,3.605-0.213,7.147-0.533,10.667H139.2z'
                />
              </svg>
              <span className='ml-3 text-3xl text-green-700 font-heading'>
                ubooze
              </span>
            </a>
          </Link>
          <p className='mt-2 text-sm text-gray-500'>
            Helping you save money on the drinks you love.
          </p>
        </div>
        <div className='flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center'>
          <div className='lg:w-1/4 md:w-1/2 w-full px-4'>
            <h2 className='font-bold text-gray-900 tracking-widest text-sm mb-3'>
              Search By
            </h2>
            <nav className='list-none mb-10'>
              <li>
                <Link href='/search/postcode'>
                  <a className='text-gray-500 hover:text-green-500 transition duration-300 ease-in-out'>
                    Postcode
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/search/supermarket'>
                  <a className='text-gray-500 hover:text-green-500 transition duration-300 ease-in-out'>
                    Supermarket
                  </a>
                </Link>
              </li>
            </nav>
          </div>
          <div className='lg:w-1/4 md:w-1/2 w-full px-4'>
            <h2 className='font-bold text-gray-900 tracking-widest text-sm mb-3'>
              Company
            </h2>
            <nav className='list-none mb-10'>
              <li>
                <Link href='/company/contact'>
                  <a className='text-gray-500 hover:text-green-500 transition duration-300 ease-in-out'>
                    Contact Us
                  </a>
                </Link>
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.buymeacoffee.com/ubooze'
                  className='text-gray-500 hover:text-green-500 transition duration-300 ease-in-out'
                >
                  Donate
                </a>
              </li>
            </nav>
          </div>
          <div className='lg:w-1/4 md:w-1/2 w-full px-4'>
            <h2 className='font-bold text-gray-900 tracking-widest text-sm mb-3'>
              Policies
            </h2>
            <nav className='list-none mb-10'>
              <li>
                <Link href='/policies/privacy'>
                  <a className='text-gray-500 hover:text-green-500 transition duration-300 ease-in-out'>
                    Privacy Policy
                  </a>
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className='bg-gray-100'>
        <div className='container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row'>
          <p
            data-testid='paragraph-copyright'
            className='text-gray-500 text-sm text-center sm:text-left'
          >
            © 2022 uBooze. All rights reserved
          </p>
          <p className='inline-flex text-sm text-gray-500  sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start'>
            Made in the UK
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
