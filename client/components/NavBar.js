import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className='flex justify-between py-2 px-10 text-sm'>
      <ul className='flex'>
        <li>
          <Link href='/'>
            <a className='font-semibold hover:text-gray-200 transition ease-out duration-100'>
              uBooze
            </a>
          </Link>
        </li>
        <li className='ml-4'>
          <Link href='/products'>
            <a className='hover:text-gray-200 transition ease-out duration-100'>
              Products
            </a>
          </Link>
        </li>
      </ul>
      <ul className='flex'>
        <li>
          <Link href='/profile'>
            <a className='hover:text-gray-200 transition ease-out duration-100'>
              Profile
            </a>
          </Link>
        </li>
        <li className='ml-4'>
          <Link href='/login'>
            <a className='hover:text-gray-200 transition ease-out duration-100'>
              Login
            </a>
          </Link>
        </li>
        <li className='ml-4'>
          <Link href='/register'>
            <a className='hover:text-gray-200 transition ease-out duration-100'>
              Register
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
