import { range } from '../utils/range';

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  totalPages,
}) => {
  const siblingCount = 1;

  const pagesToShow = siblingCount + 5;

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 2;

  let pageNumbers = [];

  if (pagesToShow >= totalPages) {
    let rangeToInsert = range(1, totalPages);

    pageNumbers = [...rangeToInsert];
  } else if (!showLeftDots && showRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);

    pageNumbers = [...leftRange, '...', totalPages];
  } else if (showLeftDots && !showRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = range(totalPages - rightItemCount + 1, totalPages);

    pageNumbers = [1, '...', ...rightRange];
  } else if (showLeftDots && showRightDots) {
    let middleRange = range(leftSibling, rightSibling);

    pageNumbers = [1, '...', ...middleRange, '...', totalPages];
  }

  if (totalItems === 0) {
    return null;
  }

  return (
    <nav className='lg:-mb-4 z-10 pt-5 lg:pt-0'>
      <ul className='flex'>
        <button
          onClick={() => paginate(currentPage - 1)}
          className={`${
            currentPage === 1 && 'hidden'
          } flex pr-3 text-gray-900 focus:outline-none hover:text-green-500 transition duration-200 ease-in-out`}
        >
          <svg
            className='w-6 h-6'
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
          <span className='lg:inline-flex hidden'>Previous</span>
        </button>
        {pageNumbers.map((number, index) => (
          <li className='px-2' key={index}>
            {number === '...' ? (
              <p
                className='text-gray-800 lg:text-base text-xs font-medium lg:tracking-widest cursor-default
              focus:outline-none px-3 pb-2'
              >
                ...
              </p>
            ) : (
              <button
                className={`${
                  number === currentPage
                    ? 'text-gray-900 font-medium lg:text-base text-xs border-b-2 border-gray-900 cursor-default'
                    : 'text-gray-800 lg:text-base text-xs hover:text-green-500 transition duration-200 ease-in-out'
                } focus:outline-none lg:px-3 px-2 pb-2`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          className={`${
            currentPage === totalPages && 'hidden'
          } flex pl-3 text-gray-900 focus:outline-none hover:text-green-500 transition duration-200 ease-in-out`}
        >
          <span className='lg:inline-flex hidden'>Next</span>
          <svg
            className='w-6 h-6'
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
