import Link from 'next/link';

const NavBar = ({ page }) => {
  return (
    <nav className='fixed w-full z-30 top-0 text-gray-200 bg-black'>
      <div className='flex justify-between py-5 px-40 text-sm'>
        <ul className='flex items-center'>
          <li>
            <Link href='/'>
              <a className='font-semibold text-lg hover:text-gray-400 transition ease-out duration-100'>
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
                <span className='ml-2 tracking-widest uppercase'>uBooze</span>
              </a>
            </Link>
          </li>
          <li className='ml-4'>
            <Link href='/products'>
              <a className='hover:text-gray-400 transition ease-out duration-100'>
                Products
              </a>
            </Link>
          </li>
        </ul>
        <ul className='flex items-center'>
          <li>
            <Link href='/profile'>
              <a className='hover:text-gray-400 transition ease-out duration-100'>
                Profile
              </a>
            </Link>
          </li>
          <li className='ml-4'>
            <Link href='/login'>
              <a className='hover:text-gray-400 transition ease-out duration-100'>
                Login
              </a>
            </Link>
          </li>
          <li className='ml-4'>
            <Link href='/register'>
              <a className='hover:text-gray-400 transition ease-out duration-100'>
                Register
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
