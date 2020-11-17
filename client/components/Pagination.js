const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  totalPages,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (totalItems === 0) {
    return null;
  }

  return (
    <nav className='-mb-4 z-10'>
      <ul className='flex'>
        <button
          onClick={() => paginate(currentPage - 1)}
          className={`${
            currentPage === 1 && 'hidden'
          } flex pr-3 text-gray-900 focus:outline-none hover:text-green-500 transition duration-200 ease-in-out`}
        >
          <svg
            class='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 19l-7-7 7-7'
            ></path>
          </svg>
          <span>Previous</span>
        </button>
        {pageNumbers.map((number) => (
          <li className='px-2' key={number}>
            <button
              className={`${
                number === currentPage
                  ? 'text-gray-900 font-medium border-b-2 border-gray-900 cursor-default'
                  : 'text-gray-800 hover:text-green-500 transition duration-200 ease-in-out'
              } focus:outline-none px-3 pb-2`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          className={`${
            currentPage === totalPages && 'hidden'
          } flex pl-3 text-gray-900 focus:outline-none hover:text-green-500 transition duration-200 ease-in-out`}
        >
          <span>Next</span>
          <svg
            class='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 5l7 7-7 7'
            ></path>
          </svg>
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
