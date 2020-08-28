import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import SupermarketItem from './SupermarketItem';
import { capitaliseFirstLetter } from '../utils/supermarketListUtils';

const ProductItem = ({ product }) => {
  const { userPostcode } = useSelector((state) => state.supermarketDetails);

  const productID = product.productID;
  return (
    <Link
      href='/products/[productID]'
      as={`/products/${productID}?postcode=${userPostcode}`}
    >
      <a target='_blank' rel='noreferrer'>
        <li className='list-none p-4 bg-white rounded-lg shadow-md border border-gray-400 border-4 relative hover:shadow-xl transform hover:scale-105 transition ease-in-out duration-200'>
          <div>
            <div className='grid grid-cols-2 items-center'>
              <div>
                <img
                  className='object-cover p-3'
                  src={product.supermarketProducts[0].image}
                  alt={product.productName}
                />
              </div>
              <div className='text-gray-800 p-3'>
                <h3 className='text-xl font-semibold tracking-wide border-b border-gray-700 mb-2'>
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
      </a>
    </Link>
  );
};

export default ProductItem;
