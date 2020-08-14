const SupermarketItem = ({ supermarket, index, hasLowestPrice }) => {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });

  const supermarketLogo = (supermarket) => {
    if (supermarket === 'Waitrose') {
      return 'waitrose_logo.svg';
    } else if (supermarket === "Sainsbury's") {
      return 'sainsburys_logo.svg';
    } else if (supermarket === 'Tesco') {
      return 'tesco_logo.svg';
    }
  };

  return (
    <div className='flex flex-col mx-2'>
      <a
        href={supermarket.link}
        className='flex flex-col hover:border-gray-900 border-t'
      >
        <span className='text-sm font-bold text-blue-700 my-4'>
          <img src={supermarketLogo(supermarket.supermarket)} alt='logo' />
        </span>{' '}
        {index === 0 && hasLowestPrice ? (
          <span className='text-xs font-bold text-yellow-600'>
            {formatter.format(supermarket.price / 100)}
          </span>
        ) : (
          <span className='text-xs font-bold'>
            {formatter.format(supermarket.price / 100)}
          </span>
        )}
        <p className='text-xs italic'>{supermarket.offer}</p>
        {index === 0 && hasLowestPrice && (
          <div className='text-sm font-medium bg-yellow-500 px-3 mt-1 rounded-sm shadow-md'>
            <p>Lowest</p>
            <p>Price</p>
          </div>
        )}
      </a>
    </div>
  );
};

export default SupermarketItem;
