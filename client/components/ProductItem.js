import React from 'react';
import SupermarketItem from './SupermarketItem';

const ProductItem = ({ product }) => {
  const capitaliseFirstLetter = (string) => {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
  };

  return (
    <li className='list-none bg-gray-200 rounded-full shadow-lg py-5 px-5 m-3'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <div>
            <img
              className='h-32 w-32 rounded-full'
              src={product.supermarketProducts[0].image}
              alt={product.productName}
            />
          </div>
          <div className='ml-5'>
            <h3 className='text-2xl'>{product.productName}</h3>
            <h4 className='text-sm italic'>{product.volume}</h4>
            <p className='text-sm'>
              {capitaliseFirstLetter(product.drinkType)},{' '}
              {capitaliseFirstLetter(product.drinkSubtype)}
            </p>
          </div>
        </div>
        <div className='mr-5 flex flex-col justify-center'>
          {product.supermarketProducts.map((supermarket) => {
            return (
              <SupermarketItem
                key={supermarket.supermarketProductID}
                supermarket={supermarket}
              />
            );
          })}
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
