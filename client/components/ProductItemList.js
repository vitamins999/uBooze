import React from 'react';
import ProductItem from './ProductItem';

const ProductItemList = ({ products }) => {
  return (
    <div>
      {products.map((product) => {
        return <ProductItem key={product.productID} product={product} />;
      })}
    </div>
  );
};

export default ProductItemList;
