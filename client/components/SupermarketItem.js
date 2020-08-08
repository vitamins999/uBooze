import React from 'react';

const SupermarketItem = ({ supermarket, index }) => {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });
  return (
    <div className='flex flex-col mx-2'>
      <a href={supermarket.link} className='flex flex-col'>
        <span className='text-md text-blue-700'>{supermarket.supermarket}</span>{' '}
        {index === 0 ? (
          <span className='text-sm font-bold text-yellow-600'>
            {formatter.format(supermarket.price / 100)}
          </span>
        ) : (
          <span className='text-sm'>
            {formatter.format(supermarket.price / 100)}
          </span>
        )}
      </a>
      <p className='text-xs italic'>{supermarket.offer}</p>
      {index === 0 && (
        <div className='text-sm bg-yellow-500 px-3 mt-1 rounded-sm shadow-md'>
          <p>Lowest</p>
          <p>Price</p>
        </div>
      )}
    </div>
  );
};

export default SupermarketItem;
