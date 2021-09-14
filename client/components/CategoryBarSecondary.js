import Link from 'next/link';

const CategoryBarSecondary = ({ primary, secondary }) => {
  return (
    <div className='mb-10 w-full flex justify-center flex-wrap text-xs text-gray-700'>
      <>
        {primary === 'beer' && (
          <>
            {secondary === 'allBeer' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                All Beer & Cider
              </a>
            ) : (
              <Link href='/products/beer'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  All Beer & Cider
                </a>
              </Link>
            )}
            {secondary === 'lager' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Lager
              </a>
            ) : (
              <Link href='/products/beer/lager'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Lager
                </a>
              </Link>
            )}
            {secondary === 'ale' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Ale
              </a>
            ) : (
              <Link href='/products/beer/ale'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Ale
                </a>
              </Link>
            )}
            {secondary === 'stout' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Stout
              </a>
            ) : (
              <Link href='/products/beer/stout'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Stout
                </a>
              </Link>
            )}
            {secondary === 'craft' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Craft Beer
              </a>
            ) : (
              <Link href='/products/beer/craft'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Craft Beer
                </a>
              </Link>
            )}
            {secondary === 'cider' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Cider
              </a>
            ) : (
              <Link href='/products/beer/cider'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Cider
                </a>
              </Link>
            )}
            {secondary === 'lowAlcoholBeer' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Low Alcohol
              </a>
            ) : (
              <Link href='/products/beer/lowalcohol'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
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
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                All Wine
              </a>
            ) : (
              <Link href='/products/wine'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  All Wine
                </a>
              </Link>
            )}
            {secondary === 'red' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Red
              </a>
            ) : (
              <Link href='/products/wine/red'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Red
                </a>
              </Link>
            )}
            {secondary === 'white' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                White
              </a>
            ) : (
              <Link href='/products/wine/white'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  White
                </a>
              </Link>
            )}
            {secondary === 'rose' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Rosé
              </a>
            ) : (
              <Link href='/products/wine/rose'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Rosé
                </a>
              </Link>
            )}
            {secondary === 'sparkling' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Sparkling & Champagne
              </a>
            ) : (
              <Link href='/products/wine/sparkling'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Sparkling & Champagne
                </a>
              </Link>
            )}
            {secondary === 'wineBoxes' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Wine Boxes
              </a>
            ) : (
              <Link href='/products/wine/boxes'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Wine Boxes
                </a>
              </Link>
            )}
            {secondary === 'dessert' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Dessert
              </a>
            ) : (
              <Link href='/products/wine/dessert'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Dessert
                </a>
              </Link>
            )}
            {secondary === 'fortified' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Port, Sherry & Vermouth
              </a>
            ) : (
              <Link href='/products/wine/fortified'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Port, Sherry & Vermouth
                </a>
              </Link>
            )}
            {secondary === 'smallBottles' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Small Bottles
              </a>
            ) : (
              <Link href='/products/wine/small'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                  Small Bottles
                </a>
              </Link>
            )}
            {secondary === 'lowAlcoholWine' ? (
              <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
                Low Alcohol
              </a>
            ) : (
              <Link href='/products/wine/lowalcohol'>
                <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
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
            <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
              All Spirits
            </a>
          ) : (
            <Link href='/products/spirits'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                All Spirits
              </a>
            </Link>
          )}
          {secondary === 'gin' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
              Gin
            </a>
          ) : (
            <Link href='/products/spirits/gin'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                Gin
              </a>
            </Link>
          )}
          {secondary === 'whisky' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
              Whisky
            </a>
          ) : (
            <Link href='/products/spirits/whisky'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                Whisky
              </a>
            </Link>
          )}
          {secondary === 'vodka' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
              Vodka
            </a>
          ) : (
            <Link href='/products/spirits/vodka'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                Vodka
              </a>
            </Link>
          )}
          {secondary === 'rum' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
              Rum
            </a>
          ) : (
            <Link href='/products/spirits/rum'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                Rum
              </a>
            </Link>
          )}
          {secondary === 'brandy' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
              Brandy & Cognac
            </a>
          ) : (
            <Link href='/products/spirits/brandycognac'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                Brandy & Cognac
              </a>
            </Link>
          )}
          {secondary === 'liqueurs' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
              Tequila & Liqueurs
            </a>
          ) : (
            <Link href='/products/spirits/liqueurs'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                Tequila & Liqueurs
              </a>
            </Link>
          )}
          {secondary === 'premixed' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
              Premixed
            </a>
          ) : (
            <Link href='/products/spirits/premixed'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
                Premixed
              </a>
            </Link>
          )}
          {secondary === 'lowAlcoholSpirits' ? (
            <a className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'>
              Low Alcohol
            </a>
          ) : (
            <Link href='/products/spirits/lowalcohol'>
              <a className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'>
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
