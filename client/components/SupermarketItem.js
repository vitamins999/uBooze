import React from 'react';

const SupermarketItem = ({ supermarket }) => {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });
  return (
    <div>
      <a href={supermarket.link}>
        <span className='text-md text-blue-700'>
          {supermarket.supermarket}:
        </span>{' '}
        <span className='text-sm font-medium ml-1'>
          {formatter.format(supermarket.price / 100)}
        </span>
      </a>
      <p className='text-xs italic'>{supermarket.offer}</p>
    </div>
  );
};

export default SupermarketItem;
