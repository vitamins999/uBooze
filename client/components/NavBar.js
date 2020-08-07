import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className='flex justify-between py-2 text-sm'>
      <ul className='flex'>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
      </ul>
      <ul className='flex'>
        <li>
          <Link href='/profile'>
            <a>Profile</a>
          </Link>
        </li>
        <li className='ml-4'>
          <Link href='/login'>
            <a>Login</a>
          </Link>
        </li>
        <li className='ml-4'>
          <Link href='/register'>
            <a>Register</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
