import { formatter, supermarketLogo } from '../utils/supermarketListUtils';

const SupermarketItem = ({ supermarket, index, hasLowestPrice }) => {
  return (
    <div className='flex flex-col mx-2'>
      <div href={supermarket.link} className='flex flex-col border-t'>
        <span className='text-sm font-bold text-blue-700 my-4'>
          <img src={supermarketLogo(supermarket.supermarket)} alt='logo' />
        </span>{' '}
        {index === 0 && hasLowestPrice ? (
          <span className='text-xs font-bold text-yellow-600'>
            {formatter.format(supermarket.price / 100)}
          </span>
        ) : (
          <span className='text-xs font-bold'>
            {formatter.format(supermarket.price / 100)}
          </span>
        )}
        <p className='text-xs italic'>{supermarket.offer}</p>
        {index === 0 && hasLowestPrice && (
          <div className='text-sm font-medium bg-yellow-500 px-3 mt-1 rounded-sm shadow-md'>
            <p>Lowest</p>
            <p>Price</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupermarketItem;
