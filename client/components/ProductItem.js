import React, { useState, useEffect } from 'react';
import SupermarketItem from './SupermarketItem';

const ProductItem = ({ product }) => {
  const capitaliseFirstLetter = (string) => {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
  };

  return (
    <li className='list-none bg-white rounded shadow-md relative hover:shadow-xl transition ease-in-out duration-200'>
      <div className=''>
        <div className='flex justify-around items-center bg-gray-300'>
          <div>
            <img
              className='w-32 h-32 object-cover p-3'
              src={product.supermarketProducts[0].image}
              alt={product.productName}
            />
          </div>
          <div className='text-gray-800 p-3'>
            <h3 className='text-xl font-semibold border-b border-gray-700 mb-2'>
              {product.productName}
            </h3>
            <h4 className='text-sm italic'>{product.volume}</h4>
            <p className='text-sm'>
              {capitaliseFirstLetter(product.drinkType)},{' '}
              {capitaliseFirstLetter(product.drinkSubtype)}
            </p>
          </div>
        </div>
        <div className='text-center grid grid-cols-3 gap-2 p-3'>
          {product.supermarketProducts.map((supermarket, index) => {
            return (
              <SupermarketItem
                key={supermarket.supermarketProductID}
                index={index}
                supermarket={supermarket}
                hasLowestPrice={product.lowestPrice}
              />
            );
          })}
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
