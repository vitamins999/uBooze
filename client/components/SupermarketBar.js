import Cookie from 'js-cookie';
import {
  supermarketLogo,
  capitaliseFirstLetter,
} from '../utils/supermarketListUtils';

const SupermarketBar = () => {
  const supermarketList = JSON.parse(Cookie.get('supermarketList'));
  supermarketList.sort((a, b) => a.localeCompare(b));
  return (
    <div className='w-full h-10 border-b flex items-center lg:flex-row iPad:flex-row flex-col justify-around iPadWidescreen:justify-start iPadPro:justify-start iPadWidescreen:px-4 iPadPro:px-4 lg:justify-center iPad:justify-center 2xl:px-48 border-gray-300'>
      <h1 className='lg:ml-2 lg:text-sm text-xs tracking-wide'>
        Showing results for:{' '}
      </h1>
      <div className='flex items-center justify-around w-full lg:w-auto iPad:w-auto'>
        {supermarketList.map((supermarket) => {
          return (
            <li
              key={supermarket}
              className='list-none lg:ml-10 iPad:ml-10 align-middle'
            >
              <img
                src={supermarketLogo(capitaliseFirstLetter(supermarket))}
                alt={supermarket}
                className='lg:h-5 h-2 iPad:h-3'
              />
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default SupermarketBar;
