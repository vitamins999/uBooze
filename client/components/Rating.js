import { motion } from 'framer-motion';

const Rating = ({ value, text, user, userRating, userRatingHandler }) => {
  return (
    <div className='flex-col mt-2'>
      <div className='flex'>
        <span>
          <svg
            className='w-6 h-6 text-yellow-400'
            fill={`${
              value >= 1 ? '#fbbf24' : value >= 0.5 ? 'url(#grad)' : 'none'
            }`}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <linearGradient id='grad' x1='0' x2='100%' y1='0' y2='0'>
              <stop offset='50%' stopColor='#fbbf24' />
              <stop offset='50%' stopColor='white' />
            </linearGradient>

            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
            ></path>
          </svg>
        </span>
        <span>
          <svg
            className='w-6 h-6 text-yellow-400'
            fill={`${
              value >= 2 ? '#fbbf24' : value >= 1.5 ? 'url(#grad)' : 'none'
            }`}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <linearGradient id='grad' x1='0' x2='100%' y1='0' y2='0'>
              <stop offset='50%' stopColor='#fbbf24' />
              <stop offset='50%' stopColor='white' />
            </linearGradient>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
            ></path>
          </svg>
        </span>
        <span>
          <svg
            className='w-6 h-6 text-yellow-400'
            fill={`${
              value >= 3 ? '#fbbf24' : value >= 2.5 ? 'url(#grad)' : 'none'
            }`}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <linearGradient id='grad' x1='0' x2='100%' y1='0' y2='0'>
              <stop offset='50%' stopColor='#fbbf24' />
              <stop offset='50%' stopColor='white' />
            </linearGradient>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
            ></path>
          </svg>
        </span>
        <span>
          <svg
            className='w-6 h-6 text-yellow-400'
            fill={`${
              value >= 4 ? '#fbbf24' : value >= 3.5 ? 'url(#grad)' : 'none'
            }`}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <linearGradient id='grad' x1='0' x2='100%' y1='0' y2='0'>
              <stop offset='50%' stopColor='#fbbf24' />
              <stop offset='50%' stopColor='white' />
            </linearGradient>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
            ></path>
          </svg>
        </span>
        <span>
          <svg
            className='w-6 h-6 text-yellow-400'
            fill={`${
              value >= 5 ? '#fbbf24' : value >= 4.5 ? 'url(#grad)' : 'none'
            }`}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <linearGradient id='grad' x1='0' x2='100%' y1='0' y2='0'>
              <stop offset='50%' stopColor='#fbbf24' />
              <stop offset='50%' stopColor='white' />
            </linearGradient>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
            ></path>
          </svg>
        </span>
        <span className='ml-4 lg:mr-12 iPadWidescreen:mr-0'>
          {text && text}
        </span>
      </div>

      {user && (
        <div className='flex mt-2'>
          <button
            className='focus:outline-none'
            onClick={() => userRatingHandler(1)}
          >
            <motion.svg
              whileHover={{ scale: 1.2 }}
              className='w-6 h-6 text-yellow-400'
              fill={`${
                userRating >= 1
                  ? '#fbbf24'
                  : userRating >= 0.5
                  ? 'url(#grad)'
                  : 'none'
              }`}
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <linearGradient id='grad' x1='0' x2='100%' y1='0' y2='0'>
                <stop offset='50%' stopColor='#fbbf24' />
                <stop offset='50%' stopColor='white' />
              </linearGradient>

              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
              ></path>
            </motion.svg>
          </button>
          <button
            className='focus:outline-none'
            onClick={() => userRatingHandler(2)}
          >
            <motion.svg
              whileHover={{ scale: 1.2 }}
              className='w-6 h-6 text-yellow-400'
              fill={`${
                userRating >= 2
                  ? '#fbbf24'
                  : userRating >= 1.5
                  ? 'url(#grad)'
                  : 'none'
              }`}
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <linearGradient id='grad' x1='0' x2='100%' y1='0' y2='0'>
                <stop offset='50%' stopColor='#fbbf24' />
                <stop offset='50%' stopColor='white' />
              </linearGradient>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
              ></path>
            </motion.svg>
          </button>
          <button
            className='focus:outline-none'
            onClick={() => userRatingHandler(3)}
          >
            <motion.svg
              whileHover={{ scale: 1.2 }}
              className='w-6 h-6 text-yellow-400'
              fill={`${
                userRating >= 3
                  ? '#fbbf24'
                  : userRating >= 2.5
                  ? 'url(#grad)'
                  : 'none'
              }`}
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <linearGradient id='grad' x1='0' x2='100%' y1='0' y2='0'>
                <stop offset='50%' stopColor='#fbbf24' />
                <stop offset='50%' stopColor='white' />
              </linearGradient>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
              ></path>
            </motion.svg>
          </button>
          <button
            className='focus:outline-none'
            onClick={() => userRatingHandler(4)}
          >
            <motion.svg
              whileHover={{ scale: 1.2 }}
              className='w-6 h-6 text-yellow-400'
              fill={`${
                userRating >= 4
                  ? '#fbbf24'
                  : userRating >= 3.5
                  ? 'url(#grad)'
                  : 'none'
              }`}
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <linearGradient id='grad' x1='0' x2='100%' y1='0' y2='0'>
                <stop offset='50%' stopColor='#fbbf24' />
                <stop offset='50%' stopColor='white' />
              </linearGradient>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
              ></path>
            </motion.svg>
          </button>
          <button
            className='focus:outline-none'
            onClick={() => userRatingHandler(5)}
          >
            <motion.svg
              whileHover={{ scale: 1.2 }}
              className='w-6 h-6 text-yellow-400'
              fill={`${
                userRating >= 5
                  ? '#fbbf24'
                  : userRating >= 4.5
                  ? 'url(#grad)'
                  : 'none'
              }`}
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <linearGradient id='grad' x1='0' x2='100%' y1='0' y2='0'>
                <stop offset='50%' stopColor='#fbbf24' />
                <stop offset='50%' stopColor='white' />
              </linearGradient>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
              ></path>
            </motion.svg>
          </button>
          <span
            className={`ml-4 ${
              userRating !== 0 ? 'lg:mr-8' : 'lg:mr-12 iPadWidescreen:mr-0'
            }`}
          >
            {userRating !== 0 ? 'Your rating' : 'Not rated'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Rating;
