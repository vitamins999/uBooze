import ProductItem from './ProductItem';

const ProductItemList = ({ products }) => {
  return (
    <div className='grid grid-cols-4 gap-16'>
      {products.map((product) => {
        return <ProductItem key={product.productID} product={product} />;
      })}
    </div>
  );
};

export default ProductItemList;
