import Link from 'next/link';

import CategoryBarSecondary from './CategoryBarSecondary';

const CategoryBar = ({ primary, secondary, title }) => {
  return (
    <>
      <div className='mb-10 mt-20 w-full flex justify-center text-sm text-gray-700'>
        {primary === 'allDrinks' ? (
          <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
            All Drinks
          </a>
        ) : (
          <Link href='/products'>
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
              All Drinks
            </a>
          </Link>
        )}
        {primary === 'beer' ? (
          <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
            Beer & Cider
          </a>
        ) : (
          <Link href='/products/beer'>
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
              Beer & Cider
            </a>
          </Link>
        )}
        {primary === 'wine' ? (
          <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
            Wine
          </a>
        ) : (
          <Link href='/products/wine'>
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
              Wine
            </a>
          </Link>
        )}
        {primary === 'spirits' ? (
          <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
            Spirits
          </a>
        ) : (
          <Link href='/products/spirits'>
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
              Spirits
            </a>
          </Link>
        )}
      </div>
      <div className='w-full mb-10 text-center text-5xl tracking-wider font-bold text-gray-800'>
        <h1>{title}</h1>
      </div>
      <CategoryBarSecondary primary={primary} secondary={secondary} />
    </>
  );
};

export default CategoryBar;
