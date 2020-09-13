import Link from 'next/link';

const NavBar = ({ page }) => {
  return (
    <>
      <header className='text-gray-700 body-font border-b'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <Link href='/'>
            <a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
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
              <span className='ml-3 text-xl'>ubooze</span>
            </a>
          </Link>
          <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
            <Link href='/search/postcode'>
              <a className='mr-5 hover:text-gray-900 border-b border-transparent hover:border-orange-700 transition duration-300 ease-in-out'>
                Search by Postcode
              </a>
            </Link>
            <Link href='/search/supermarket'>
              <a className='mr-5 hover:text-gray-900 border-b border-transparent hover:border-orange-700 transition duration-300 ease-in-out'>
                Search by Supermarket
              </a>
            </Link>
            <Link href='/search/drink'>
              <a className='mr-5 hover:text-gray-900 border-b border-transparent hover:border-orange-700 transition duration-300 ease-in-out'>
                Search by Drink
              </a>
            </Link>
            <Link href='/products'>
              <a className='mr-5 hover:text-gray-900 border-b border-transparent hover:border-orange-700 transition duration-300 ease-in-out'>
                All Products
              </a>
            </Link>
          </nav>
          <Link href='/login'>
            <a className='inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0'>
              <svg viewBox='0 0 20 20' fill='#000000' className='user w-6 h-6'>
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </a>
          </Link>
        </div>
      </header>
    </>
  );
};

export default NavBar;
