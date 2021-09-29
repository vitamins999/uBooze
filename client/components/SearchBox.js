import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBox = () => {
  const [searchText, setSearchText] = useState('');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/search/results?search=${searchText}`);
  };

  return (
    <div>
      <form
        data-testid='section-form'
        onSubmit={handleSubmit}
        className='flex justify-center'
      >
        <input
          data-testid='input-searchbox'
          className='shadow-inner border-2 font-medium py-2 border-green-500 text-xs rounded-full mr-4 transition duration-150 ease-in-out text-gray-800 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2 px-4 w-64 iPad:w-108 lg:w-108'
          placeholder='Search for a drink...'
          type='text'
          required
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type='submit'
          className='inline-flex my-auto text-gray-700 border-0 py-2 px-2 -ml-16 hover:text-green-500 focus:outline-none transition duration-150 ease-in-out'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
