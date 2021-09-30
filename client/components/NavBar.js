import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { motion } from 'framer-motion';
import { fadeOutPage } from '../animations/navigation';
import SearchBox from './SearchBox';

import Cookies from 'js-cookie';
import { userLogout, userLoginSuccess } from '../lib/slices/userInfoSlice';

const NavBar = ({ landingPage }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userInfo = useSelector((state) => state.userInfo);
  const { gravatar, userID, username, isAdmin } = userInfo;
  const userMenuRef = useRef(null);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userID) {
      const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'));
      const user = {
        user: {
          ...userInfoFromStorage,
        },
      };

      if (user) {
        dispatch(userLoginSuccess(user));
      } else {
        let userCookie = Cookies.get('user');
        if (userCookie) {
          userCookie = JSON.parse(userCookie);
          const userState = {
            user: {
              userID: user.userID,
              email: user.email,
              username: user.username,
              displayName: user.displayName,
              firstName: user.firstName,
              lastName: user.lastName,
              location: user.location,
              bio: user.bio,
              isAdmin: user.isAdmin,
              gravatar: user.gravatar,
              favourites: user.favourites,
            },
          };
          Cookies.remove('user');
          dispatch(userLoginSuccess(userState));
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
            },
          };
          dispatch(userLoginSuccess(defaultState));
        }
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
    localStorage.removeItem('accessToken');
    dispatch(userLogout());
    router.push('/');
  };

  const navbarVariants = {
    start: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.3,
      },
    },
  };

  return (
    <>
      <motion.header
        data-testid='section-header'
        variants={fadeOutPage}
        exit='exit'
        initial='initial'
        animate='animate'
        className='text-gray-700 body-font border-b'
      >
        <motion.div
          variants={landingPage && navbarVariants}
          initial='start'
          animate='animate'
          className='container mx-auto flex flex-wrap iPad:flex-col iPadWidescreen:flex-col iPadPro:flex-col px-2 py-5 flex-col md:flex-row items-center'
        >
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
              <span className='ml-3 text-3xl text-green-700 font-heading'>
                ubooze
              </span>
            </a>
          </Link>
          <nav className='lg:text-sm text-xs md:mr-auto iPad:mx-0 iPadWidescreen:mx-0 iPadPro:mx-0 md:ml-4 md:py-1 md:pl-4 md:border-l iPad:border-0 iPadWidescreen:border-0 iPadPro:border-0 md:border-gray-400	flex flex-wrap items-center justify-center'>
            <Link href='/search/postcode'>
              <a className='lg:mr-5 px-2 lg:px-0 hover:text-green-500 font-medium transition duration-300 ease-in-out'>
                Search by Postcode
              </a>
            </Link>
            <Link href='/search/supermarket'>
              <a className='lg:mr-5 px-2 lg:px-0 hover:text-green-500 font-medium transition duration-300 ease-in-out'>
                Search by Supermarket
              </a>
            </Link>
          </nav>
          <div className='lg:mr-auto iPadWidescreen:mr-0 iPadPro:mr-0 py-2 lg:py-0 iPadWidescreen:py-2 iPadPro:py-2 flex align-middle justify-center'>
            <SearchBox />
          </div>
          {userID ? (
            <div className='relative flex justify-center lg:block lg:w-auto w-full'>
              <div
                onClick={() => setShowUserMenu(true)}
                className='relative flex items-center cursor-pointer text-sm'
              >
                <p
                  className='font-medium cursor-pointer'
                  onClick={() => setShowUserMenu(true)}
                >
                  {username}
                </p>
                <img
                  onClick={() => setShowUserMenu(true)}
                  src={gravatar}
                  className='w-10 rounded-full ml-5 lg:mr-8 mr-0 cursor-pointer'
                />
              </div>
              {showUserMenu && (
                <div
                  ref={userMenuRef}
                  className='dropdown absolute left-0 h-auto shadow-lg z-50 w-20 mt-3 -ml-2'
                  onMouseClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <ul className='bg-gray-100 w-48 shadow-lg py-4 text-left text-xs font-medium tracking-wide rounded-lg text-gray-500'>
                    <li className='py-2'>
                      <Link href={`/profile/${username}`}>
                        <a className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-6 cursor-pointer transition duration-100 ease-in-out'>
                          Profile
                        </a>
                      </Link>
                    </li>
                    <div className='px-6 py-2'>
                      <li className='w-full h-1 border-b border-gray-300 mb-1 flex items-center'></li>
                    </div>
                    <li className='py-2'>
                      <Link href='/profile/edit'>
                        <a className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-6 cursor-pointer transition duration-100 ease-in-out'>
                          Edit Profile
                        </a>
                      </Link>
                    </li>
                    <li className='py-2'>
                      <Link href='/profile/favourites'>
                        <a className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-6 cursor-pointer transition duration-100 ease-in-out'>
                          My Favourite Drinks
                        </a>
                      </Link>
                    </li>
                    <div className='px-6 py-2'>
                      <li className='w-full h-1 border-b border-gray-300 mb-1 flex items-center'></li>
                    </div>
                    {isAdmin && (
                      <>
                        <li className='text-center font-bold mt-2'>Admin</li>
                        <li className='py-2'>
                          <Link href='/admin/users'>
                            <a className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-6 cursor-pointer transition duration-100 ease-in-out'>
                              Users List
                            </a>
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link href='/admin/drinks'>
                            <a className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-6 cursor-pointer transition duration-100 ease-in-out'>
                              Drinks List
                            </a>
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link href='/admin/newdrink'>
                            <a className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-6 cursor-pointer transition duration-100 ease-in-out'>
                              Add New Drink
                            </a>
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link href='/admin/supermarketproducts'>
                            <a className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-6 cursor-pointer transition duration-100 ease-in-out'>
                              Supermarket Products List
                            </a>
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link href='/admin/supermarketproductsupdate'>
                            <a className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-6 cursor-pointer transition duration-100 ease-in-out'>
                              Supermarket Products To Update
                            </a>
                          </Link>
                        </li>
                        <li className='py-2'>
                          <Link href='/admin/sync'>
                            <a className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-6 cursor-pointer transition duration-100 ease-in-out'>
                              Sync Supermarkets
                            </a>
                          </Link>
                        </li>
                        <div className='px-6 py-2'>
                          <li className='w-full h-1 border-b border-gray-300 mb-1 flex items-center'></li>
                        </div>
                      </>
                    )}
                    <li className='py-2'>
                      <a
                        onClick={() => {
                          logoutHandler();
                        }}
                        className='flex justify-between items-center hover:bg-green-500 hover:text-white py-2 px-6 cursor-pointer transition duration-100 ease-in-out'
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className='lg:w-auto w-full flex justify-center'>
              <Link href='/login'>
                <a className='inline-flex text-sm items-center font-medium px-3 hover:text-green-500 transition duration-300 ease-in-out text-md md:mt-0'>
                  Login
                </a>
              </Link>
              <Link href='/signup'>
                <a className='ml-2 text-sm shadow-sm border border-transparent bg-green-500 transition duration-200 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'>
                  Sign Up
                </a>
              </Link>
            </div>
          )}
        </motion.div>
      </motion.header>
    </>
  );
};

export default NavBar;
