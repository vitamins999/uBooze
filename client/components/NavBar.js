import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout, userLoginSuccess } from '../lib/slices/userInfoSlice';

const NavBar = ({ page }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userInfo = useSelector((state) => state.userInfo);
  const { gravatar, userID, username, isAdmin } = userInfo;
  const userMenuRef = useRef(null);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userID) {
      const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'));

      if (userInfoFromStorage) {
        dispatch(userLoginSuccess(userInfoFromStorage));
      } else {
        const defaultState = {
          user: {
            userID: null,
            email: null,
            username: null,
            displayName: null,
            firstName: null,
            lastName: null,
            location: null,
            bio: null,
            isAdmin: null,
            gravatar: null,
            favourites: [],
            token: null,
          },
        };
        dispatch(userLoginSuccess(defaultState));
      }
    }
  }, []);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        userMenuRef.current !== null &&
        !userMenuRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [showUserMenu]);

  const logoutHandler = async () => {
    localStorage.removeItem('userInfo');
    dispatch(userLogout());
    router.push('/');
  };

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
              <a className='mr-5  hover:text-orange-500 font-medium transition duration-300 ease-in-out'>
                Search by Postcode
              </a>
            </Link>
            <Link href='/search/supermarket'>
              <a className='mr-5  hover:text-orange-500 font-medium transition duration-300 ease-in-out'>
                Search by Supermarket
              </a>
            </Link>
            <Link href='/search/drink'>
              <a className='mr-5 hover:text-orange-500 font-medium transition duration-300 ease-in-out'>
                Search by Drink
              </a>
            </Link>
            <Link href='/products'>
              <a className='mr-5 hover:text-orange-500 font-medium transition duration-300 ease-in-out'>
                All Products
              </a>
            </Link>
          </nav>
          {userID ? (
            <div className='relative'>
              <div
                onMouseEnter={() => setShowUserMenu(true)}
                className='relative flex items-center cursor-pointer'
              >
                <p
                  className='font-medium cursor-pointer'
                  onMouseEnter={() => setShowUserMenu(true)}
                >
                  {username}
                </p>
                <img
                  onMouseEnter={() => setShowUserMenu(true)}
                  src={gravatar}
                  className='w-10 rounded-full ml-5 mr-8 cursor-pointer'
                />
              </div>
              {showUserMenu && (
                <div
                  ref={userMenuRef}
                  className='dropdown absolute left-0 h-auto shadow-lg z-10 w-20 mt-3 -ml-2'
                  onMouseLeave={() => setShowUserMenu(!showUserMenu)}
                >
                  <ul className='bg-gray-200 w-48 shadow-lg py-2 text-left text-sm tracking-wide rounded-lg text-gray-800'>
                    <li className='py-2'>
                      <Link href={`/profile/${username}`}>
                        <a className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'>
                          Profile
                        </a>
                      </Link>
                    </li>
                    <li className='w-48 h-1 border-b border-gray-400 mb-1'></li>
                    <li className='py-2'>
                      <Link href='/profile/edit'>
                        <a className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'>
                          Edit Profile
                        </a>
                      </Link>
                    </li>
                    <li className='py-2'>
                      <Link href='/profile/favourites'>
                        <a className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'>
                          My Favourite Drinks
                        </a>
                      </Link>
                    </li>
                    <li className='w-48 h-1 border-b border-gray-400 mb-1'></li>
                    {isAdmin && (
                      <>
                        <li className='text-center font-bold mt-2'>Admin</li>
                        <li className='py-2'>
                          <Link href='/admin/users'>
                            <a className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'>
                              Users List
                            </a>
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link href='/admin/drinks'>
                            <a className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'>
                              Drinks List
                            </a>
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link href='/admin/newdrink'>
                            <a className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'>
                              Add New Drink
                            </a>
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link href='/admin/supermarketproducts'>
                            <a className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'>
                              Supermarket Products List
                            </a>
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link href='/admin/supermarketproductsupdate'>
                            <a className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'>
                              Supermarket Products To Update
                            </a>
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link href='/admin/sync'>
                            <a className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'>
                              Sync Supermarkets
                            </a>
                          </Link>
                        </li>
                        <li className='w-48 h-1 border-b border-gray-400 mb-1'></li>
                      </>
                    )}
                    <li className='py-2'>
                      <a
                        onClick={() => {
                          logoutHandler();
                        }}
                        className='flex justify-between items-center hover:bg-orange-500 hover:text-white py-2 px-4 cursor-pointer transition duration-100 ease-in-out'
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link href='/login'>
              <a className='inline-flex items-center font-medium px-3 hover:text-orange-500 transition duration-300 ease-in-out text-md mt-4 md:mt-0'>
                <svg
                  viewBox='0 0 20 20'
                  fill='#000000'
                  className='user w-5 h-5 mr-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                Login
              </a>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default NavBar;
