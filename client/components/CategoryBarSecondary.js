import Link from 'next/link';

const CategoryBarSecondary = ({ primary, secondary }) => {
  return (
    <div
      data-testid='section-main-secondary'
      className='mb-10 w-full flex justify-center flex-wrap text-xs text-gray-700'
    >
      <>
        {primary === 'beer' && (
          <>
            {secondary === 'allBeer' ? (
              <a
                data-testid='link-allbeer-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                All Beer & Cider
              </a>
            ) : (
              <Link href='/products/beer'>
                <a
                  data-testid='link-allbeer-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  All Beer & Cider
                </a>
              </Link>
            )}
            {secondary === 'lager' ? (
              <a
                data-testid='link-lager-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Lager
              </a>
            ) : (
              <Link href='/products/beer/lager'>
                <a
                  data-testid='link-lager-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Lager
                </a>
              </Link>
            )}
            {secondary === 'ale' ? (
              <a
                data-testid='link-ale-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Ale
              </a>
            ) : (
              <Link href='/products/beer/ale'>
                <a
                  data-testid='link-ale-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Ale
                </a>
              </Link>
            )}
            {secondary === 'stout' ? (
              <a
                data-testid='link-stout-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Stout
              </a>
            ) : (
              <Link href='/products/beer/stout'>
                <a
                  data-testid='link-stout-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Stout
                </a>
              </Link>
            )}
            {secondary === 'craft' ? (
              <a
                data-testid='link-craft-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Craft Beer
              </a>
            ) : (
              <Link href='/products/beer/craft'>
                <a
                  data-testid='link-craft-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Craft Beer
                </a>
              </Link>
            )}
            {secondary === 'cider' ? (
              <a
                data-testid='link-cider-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Cider
              </a>
            ) : (
              <Link href='/products/beer/cider'>
                <a
                  data-testid='link-cider-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Cider
                </a>
              </Link>
            )}
            {secondary === 'lowAlcoholBeer' ? (
              <a
                data-testid='link-lowbeer-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Low Alcohol
              </a>
            ) : (
              <Link href='/products/beer/lowalcohol'>
                <a
                  data-testid='link-lowbeer-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
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
              <a
                data-testid='link-allwine-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                All Wine
              </a>
            ) : (
              <Link href='/products/wine'>
                <a
                  data-testid='link-allwine-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  All Wine
                </a>
              </Link>
            )}
            {secondary === 'red' ? (
              <a
                data-testid='link-redwine-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Red
              </a>
            ) : (
              <Link href='/products/wine/red'>
                <a
                  data-testid='link-redwine-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Red
                </a>
              </Link>
            )}
            {secondary === 'white' ? (
              <a
                data-testid='link-whitewine-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                White
              </a>
            ) : (
              <Link href='/products/wine/white'>
                <a
                  data-testid='link-whitewine-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  White
                </a>
              </Link>
            )}
            {secondary === 'rose' ? (
              <a
                data-testid='link-rosewine-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Rosé
              </a>
            ) : (
              <Link href='/products/wine/rose'>
                <a
                  data-testid='link-rosewine-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Rosé
                </a>
              </Link>
            )}
            {secondary === 'sparkling' ? (
              <a
                data-testid='link-sparkling-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Sparkling & Champagne
              </a>
            ) : (
              <Link href='/products/wine/sparkling'>
                <a
                  data-testid='link-sparkling-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Sparkling & Champagne
                </a>
              </Link>
            )}
            {secondary === 'wineBoxes' ? (
              <a
                data-testid='link-winebox-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Wine Boxes
              </a>
            ) : (
              <Link href='/products/wine/boxes'>
                <a
                  data-testid='link-winebox-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Wine Boxes
                </a>
              </Link>
            )}
            {secondary === 'dessert' ? (
              <a
                data-testid='link-dessertwine-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Dessert
              </a>
            ) : (
              <Link href='/products/wine/dessert'>
                <a
                  data-testid='link-dessertwine-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Dessert
                </a>
              </Link>
            )}
            {secondary === 'fortified' ? (
              <a
                data-testid='link-fortifiedwine-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Port, Sherry & Vermouth
              </a>
            ) : (
              <Link href='/products/wine/fortified'>
                <a
                  data-testid='link-fortifiedwine-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Port, Sherry & Vermouth
                </a>
              </Link>
            )}
            {secondary === 'smallBottles' ? (
              <a
                data-testid='link-smallwine-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Small Bottles
              </a>
            ) : (
              <Link href='/products/wine/small'>
                <a
                  data-testid='link-smallwine-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
                  Small Bottles
                </a>
              </Link>
            )}
            {secondary === 'lowAlcoholWine' ? (
              <a
                data-testid='link-lowwine-false'
                className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
              >
                Low Alcohol
              </a>
            ) : (
              <Link href='/products/wine/lowalcohol'>
                <a
                  data-testid='link-lowwine-true'
                  className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
                >
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
            <a
              data-testid='link-allspirits-false'
              className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
            >
              All Spirits
            </a>
          ) : (
            <Link href='/products/spirits'>
              <a
                data-testid='link-allspirits-true'
                className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
              >
                All Spirits
              </a>
            </Link>
          )}
          {secondary === 'gin' ? (
            <a
              data-testid='link-gin-false'
              className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
            >
              Gin
            </a>
          ) : (
            <Link href='/products/spirits/gin'>
              <a
                data-testid='link-gin-true'
                className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
              >
                Gin
              </a>
            </Link>
          )}
          {secondary === 'whisky' ? (
            <a
              data-testid='link-whisky-false'
              className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
            >
              Whisky
            </a>
          ) : (
            <Link href='/products/spirits/whisky'>
              <a
                data-testid='link-whisky-true'
                className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
              >
                Whisky
              </a>
            </Link>
          )}
          {secondary === 'vodka' ? (
            <a
              data-testid='link-vodka-false'
              className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
            >
              Vodka
            </a>
          ) : (
            <Link href='/products/spirits/vodka'>
              <a
                data-testid='link-vodka-true'
                className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
              >
                Vodka
              </a>
            </Link>
          )}
          {secondary === 'rum' ? (
            <a
              data-testid='link-rum-false'
              className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
            >
              Rum
            </a>
          ) : (
            <Link href='/products/spirits/rum'>
              <a
                data-testid='link-rum-true'
                className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
              >
                Rum
              </a>
            </Link>
          )}
          {secondary === 'brandy' ? (
            <a
              data-testid='link-brandy-false'
              className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
            >
              Brandy & Cognac
            </a>
          ) : (
            <Link href='/products/spirits/brandycognac'>
              <a
                data-testid='link-brandy-true'
                className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
              >
                Brandy & Cognac
              </a>
            </Link>
          )}
          {secondary === 'liqueurs' ? (
            <a
              data-testid='link-liqueurs-false'
              className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
            >
              Tequila & Liqueurs
            </a>
          ) : (
            <Link href='/products/spirits/liqueurs'>
              <a
                data-testid='link-liqueurs-true'
                className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
              >
                Tequila & Liqueurs
              </a>
            </Link>
          )}
          {secondary === 'premixed' ? (
            <a
              data-testid='link-premixed-false'
              className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
            >
              Premixed
            </a>
          ) : (
            <Link href='/products/spirits/premixed'>
              <a
                data-testid='link-premixed-true'
                className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
              >
                Premixed
              </a>
            </Link>
          )}
          {secondary === 'lowAlcoholSpirits' ? (
            <a
              data-testid='link-lowspirits-false'
              className='mx-2 py-2 px-4 cursor-pointer text-black bg-gray-300 font-semibold rounded-lg shadow'
            >
              Low Alcohol
            </a>
          ) : (
            <Link href='/products/spirits/lowalcohol'>
              <a
                data-testid='link-lowspirits-true'
                className='mx-2 py-2 px-4 cursor-pointer hover:text-green-500'
              >
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
