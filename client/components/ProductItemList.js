import { motion } from 'framer-motion';
import ProductItem from './ProductItem';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 1.5,
  },
  show: {
    opacity: 1,
    scale: 1,
  },
};

const ProductItemList = ({ products, publicProfilePage }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='show'
      className='grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-5 iPad:grid-cols-2 iPadWidescreen:grid-cols-3 iPadPro:grid-cols-3 mt-3'
    >
      {products.map((product, index) => {
        return (
          <motion.div variants={itemVariants} key={index}>
            <ProductItem
              key={product.productID}
              product={product}
              publicProfilePage={publicProfilePage}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ProductItemList;
