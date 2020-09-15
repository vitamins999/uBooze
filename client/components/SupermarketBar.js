import Cookie from 'js-cookie';
import {
  supermarketLogo,
  capitaliseFirstLetter,
} from '../utils/supermarketListUtils';

const SupermarketBar = () => {
  const supermarketList = JSON.parse(Cookie.get('supermarketList'));
  supermarketList.sort((a, b) => a.localeCompare(b));
  return (
    <div className='w-screen h-10 border-b flex items-center px-24 border-gray-300'>
      <h1 className='text-sm tracking-wide'>Showing results for: </h1>
      <div className='flex items-center'>
        {supermarketList.map((supermarket) => {
          return (
            <li key={supermarket} className='list-none ml-10'>
              <img
                src={supermarketLogo(capitaliseFirstLetter(supermarket))}
                alt={supermarket}
                className='w-20'
              />
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default SupermarketBar;
