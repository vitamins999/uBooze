import Link from 'next/link';

const CategoryBarSecondary = ({ primary, secondary }) => {
  return (
    <div className='mb-10 w-full flex justify-center text-xs text-gray-700'>
      <>
        {primary === 'beer' && (
          <>
            {secondary === 'allBeer' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                All Beer & Cider
              </a>
            ) : (
              <Link href='/products/beer'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  All Beer & Cider
                </a>
              </Link>
            )}
            {secondary === 'lager' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Lager
              </a>
            ) : (
              <Link href='/products/beer/lager'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Lager
                </a>
              </Link>
            )}
            {secondary === 'ale' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Ale
              </a>
            ) : (
              <Link href='/products/beer/ale'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Ale
                </a>
              </Link>
            )}
            {secondary === 'stout' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Stout
              </a>
            ) : (
              <Link href='/products/beer/stout'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Stout
                </a>
              </Link>
            )}
            {secondary === 'craft' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Craft Beer
              </a>
            ) : (
              <Link href='/products/beer/craft'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Craft Beer
                </a>
              </Link>
            )}
            {secondary === 'cider' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Cider
              </a>
            ) : (
              <Link href='/products/beer/cider'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Cider
                </a>
              </Link>
            )}
            {secondary === 'lowAlcoholBeer' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Low Alcohol
              </a>
            ) : (
              <Link href='/products/beer/lowalcohol'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Low Alcohol
                </a>
              </Link>
            )}
          </>
        )}
      </>
      <>
        {primary === 'wine' && (
          <>
            {secondary === 'allWine' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                All Wine
              </a>
            ) : (
              <Link href='/products/wine'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  All Wine
                </a>
              </Link>
            )}
            {secondary === 'red' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Red
              </a>
            ) : (
              <Link href='/products/wine/red'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Red
                </a>
              </Link>
            )}
            {secondary === 'white' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                White
              </a>
            ) : (
              <Link href='/products/wine/white'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  White
                </a>
              </Link>
            )}
            {secondary === 'rose' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Rosé
              </a>
            ) : (
              <Link href='/products/wine/rose'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Rosé
                </a>
              </Link>
            )}
            {secondary === 'sparkling' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Sparkling & Champagne
              </a>
            ) : (
              <Link href='/products/wine/sparkling'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Sparkling & Champagne
                </a>
              </Link>
            )}
            {secondary === 'wineBoxes' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Wine Boxes
              </a>
            ) : (
              <Link href='/products/wine/boxes'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Wine Boxes
                </a>
              </Link>
            )}
            {secondary === 'dessert' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Dessert
              </a>
            ) : (
              <Link href='/products/wine/dessert'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Dessert
                </a>
              </Link>
            )}
            {secondary === 'fortified' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Port, Sherry & Vermouth
              </a>
            ) : (
              <Link href='/products/wine/fortified'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Port, Sherry & Vermouth
                </a>
              </Link>
            )}
            {secondary === 'smallBottles' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Small Bottles
              </a>
            ) : (
              <Link href='/products/wine/small'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Small Bottles
                </a>
              </Link>
            )}
            {secondary === 'lowAlcoholWine' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
                Low Alcohol
              </a>
            ) : (
              <Link href='/products/wine/lowalcohol'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                  Low Alcohol
                </a>
              </Link>
            )}
          </>
        )}
      </>
      {primary === 'spirits' && (
        <>
          {secondary === 'allSpirits' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
              All Spirits
            </a>
          ) : (
            <Link href='/products/spirits'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                All Spirits
              </a>
            </Link>
          )}
          {secondary === 'gin' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
              Gin
            </a>
          ) : (
            <Link href='/products/spirits/gin'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                Gin
              </a>
            </Link>
          )}
          {secondary === 'whisky' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
              Whisky
            </a>
          ) : (
            <Link href='/products/spirits/whisky'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                Whisky
              </a>
            </Link>
          )}
          {secondary === 'vodka' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
              Vodka
            </a>
          ) : (
            <Link href='/products/spirits/vodka'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                Vodka
              </a>
            </Link>
          )}
          {secondary === 'rum' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
              Rum
            </a>
          ) : (
            <Link href='/products/spirits/rum'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                Rum
              </a>
            </Link>
          )}
          {secondary === 'brandy' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
              Brandy & Cognac
            </a>
          ) : (
            <Link href='/products/spirits/brandycognac'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                Brandy & Cognac
              </a>
            </Link>
          )}
          {secondary === 'liqueurs' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
              Tequila & Liqueurs
            </a>
          ) : (
            <Link href='/products/spirits/liqueurs'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                Tequila & Liqueurs
              </a>
            </Link>
          )}
          {secondary === 'premixed' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
              Premixed
            </a>
          ) : (
            <Link href='/products/spirits/premixed'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                Premixed
              </a>
            </Link>
          )}
          {secondary === 'lowAlcoholSpirits' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black text-black bg-gray-300 font-semibold rounded-md'>
              Low Alcohol
            </a>
          ) : (
            <Link href='/products/spirits/lowalcohol'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-black'>
                Low Alcohol
              </a>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryBarSecondary;
