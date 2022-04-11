import React from 'react';
import { motion } from 'framer-motion';

const spinTransition = {
  loop: Infinity,
  duration: 1,
  ease: 'linear',
};

const Loader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='relative w-12 h-12'>
        <motion.span
          animate={{ rotate: 360 }}
          transition={spinTransition}
          className='block w-12 h-12 border-gray-300 border-8 border-solid rounded-full absolute box-border top-0 left-0 loader-top'
        />
      </div>
    </div>
  );
};

export default Loader;
