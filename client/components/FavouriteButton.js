const FavouriteButton = (
  isFavourite,
  onFavouriteClickHandler,
  publicProfilePage
) => {
  return (
    <>
      {isFavourite ? (
        <svg
          onClick={onFavouriteClickHandler}
          className={`w-6 h-6 absolute top-0 right-0 mt-2 mr-4 z-30 text-orange-300 cursor-pointer ${
            publicProfilePage ? 'hidden' : null
          }`}
          fill='#fbd38d'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
          ></path>
        </svg>
      ) : (
        <svg
          onClick={onFavouriteClickHandler}
          className='w-6 h-6 absolute top-0 right-0 mt-2 mr-4 z-30 text-orange-300 cursor-pointer'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
          ></path>
        </svg>
      )}
    </>
  );
};

export default FavouriteButton;
