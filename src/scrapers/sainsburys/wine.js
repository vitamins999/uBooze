const sainsburysScraper = require('../utils/sainsburysScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Wine URLS

// Red
const wineRedURL1 =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=299875&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=299875&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true&facet=&facet=&facet=&facet=&facet=';
const wineRedURL2 =
  'https://www.sainsburys.co.uk/shop/CategoryDisplay?listId=&catalogId=10241&searchTerm=&beginIndex=120&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&top_category=12192&langId=44&storeId=10151&categoryId=299875&promotionId=&parent_category_rn=12192';

// White
const wineWhiteURL1 =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=299883&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=299883&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&facet=&facet=&facet=&facet=&facet=';
const wineWhiteURL2 =
  'https://www.sainsburys.co.uk/shop/CategoryDisplay?listId=&catalogId=10241&searchTerm=&beginIndex=120&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&top_category=12192&langId=44&storeId=10151&categoryId=299883&promotionId=&parent_category_rn=12192';

// Rose
const wineRoseURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12211&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12211&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Champagne and Sparkling
const wineChampagneSparklingURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=458355&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=458355&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0';

// Boxes
const wineBoxesURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/wine-box#langId=44&storeId=10151&catalogId=10241&categoryId=209298&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Fortified wine (Sherry and Port) and Vermouth
const wineFortifiedVermouthURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/sherry-port-and-fortified-wine#langId=44&storeId=10151&catalogId=10241&categoryId=12225&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Small bottles
const wineSmallURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/small-wine-bottles#langId=44&storeId=10151&catalogId=10241&categoryId=458352&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Low alcohol
const wineLowAlcoholURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/low-and-no-alcohol-wine-#langId=44&storeId=10151&catalogId=10241&categoryId=12238&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

const sainsburysScrapeWine = async () => {
  // Red
  const wineRed1 = await sainsburysScraper(wineRedURL1, 'wine', 'red');
  const wineRed2 = await sainsburysScraper(wineRedURL2, 'wine', 'red');

  const wineRed = [...wineRed1, ...wineRed2];

  // White
  const wineWhite1 = await sainsburysScraper(wineWhiteURL1, 'wine', 'white');
  const wineWhite2 = await sainsburysScraper(wineWhiteURL2, 'wine', 'white');

  const wineWhite = [...wineWhite1, ...wineWhite2];

  // Rose
  const wineRose = await sainsburysScraper(wineRoseURL, 'wine', 'rose');

  // Champagne and Sparkling
  const wineChampagneSparkling = await sainsburysScraper(
    wineChampagneSparklingURL,
    'wine',
    'sparkling'
  );

  // Boxes
  const wineBoxes = await sainsburysScraper(wineBoxesURL, 'wine', 'boxes');

  // Fortified and vermouth
  const wineFortifiedVermouth = await sainsburysScraper(
    wineFortifiedVermouthURL,
    'wine',
    'fortified and vermouth'
  );

  // Small
  const wineSmall = await sainsburysScraper(wineSmallURL, 'wine', 'small');

  // Low alcohol
  const wineLowAlcohol = await sainsburysScraper(
    wineLowAlcoholURL,
    'wine',
    'low alcohol'
  );

  let wine = [
    ...wineRed,
    ...wineWhite,
    ...wineRose,
    ...wineChampagneSparkling,
    ...wineBoxes,
    ...wineFortifiedVermouth,
    ...wineSmall,
    ...wineLowAlcohol,
  ];

  wine = removeDuplicates(wine);

  console.log('Wine scraped!');
  return wine;
};

const mainScrape = async () => {
  const wine = await sainsburysScrapeWine();
  const wineJSON = JSON.stringify(wine);
  fs.writeFileSync('src/output/sainsburys-wine-final.json', wineJSON);
};

mainScrape();

module.exports = sainsburysScrapeWine;
