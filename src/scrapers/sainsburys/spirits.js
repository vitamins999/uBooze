const sainsburysScraper = require('../utils/sainsburysScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Spirits URLs

// Gin
const spiritsGinURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12287&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12287&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Whisky
const spiritsWhiskyURL1 =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/whisky--#langId=44&storeId=10151&catalogId=10241&categoryId=199702&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';
const spiritsWhiskyURL2 =
  'https://www.sainsburys.co.uk/shop/CategoryDisplay?listId=&catalogId=10241&searchTerm=&beginIndex=60&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&top_category=12192&langId=44&storeId=10151&categoryId=199702&promotionId=&parent_category_rn=12192';

// Vodka
const spiritsVodkaURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/vodka#langId=44&storeId=10151&catalogId=10241&categoryId=12286&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Rum
const spiritsRumURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/rum#langId=44&storeId=10151&catalogId=10241&categoryId=12291&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CRATINGS_DESC&searchTerm=&beginIndex=0&hideFilters=true';

// Brandy and Cognac
const spiritsBrandyCognacURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/brandy-cognac#langId=44&storeId=10151&catalogId=10241&categoryId=12293&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Tequila, Liqueuers and Speciality
const spiritsTequilaURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/tequila#langId=44&storeId=10151&catalogId=10241&categoryId=41153&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0&hideFilters=true';
const spiritsLiqueurURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/liqueurs-other-spirits#langId=44&storeId=10151&catalogId=10241&categoryId=12294&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0';
const spiritsAperitifURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/vermouths-aperitifs#langId=44&storeId=10151&catalogId=10241&categoryId=12296&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0&hideFilters=true&facet=4294964818';

// Premix
const spiritsPremixURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=458360&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=458360&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

const sainsburysScrapeSpirits = async () => {
  // Gin
  const spiritsGin = await sainsburysScraper(spiritsGinURL, 'spirits', 'gin');

  // Whisky
  const spiritsWhisky1 = await sainsburysScraper(
    spiritsWhiskyURL1,
    'spirits',
    'whisky'
  );
  const spiritsWhisky2 = await sainsburysScraper(
    spiritsWhiskyURL2,
    'spirits',
    'whisky'
  );

  const spiritsWhisky = [...spiritsWhisky1, ...spiritsWhisky2];

  // Vodka
  const spiritsVodka = await sainsburysScraper(
    spiritsVodkaURL,
    'spirits',
    'vodka'
  );

  // Rum
  const spiritsRum = await sainsburysScraper(spiritsRumURL, 'spirits', 'rum');

  // Brandy and Cognac
  const spiritsBrandyCognac = await sainsburysScraper(
    spiritsBrandyCognacURL,
    'spirits',
    'brandy and cognac'
  );

  // // Tequila, Liqueuers and Speciality
  const spiritsTequila = await sainsburysScraper(
    spiritsTequilaURL,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsLiqueur = await sainsburysScraper(
    spiritsLiqueurURL,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsAperitif = await sainsburysScraper(
    spiritsAperitifURL,
    'spirits',
    'tequila and liqueurs'
  );

  const spiritsTequilaLiqueur = [
    ...spiritsTequila,
    ...spiritsLiqueur,
    ...spiritsAperitif,
  ];

  // Premix
  const spiritsPremix = await sainsburysScraper(
    spiritsPremixURL,
    'spirits',
    'premix'
  );

  let spirits = [
    ...spiritsGin,
    ...spiritsWhisky,
    ...spiritsVodka,
    ...spiritsRum,
    ...spiritsBrandyCognac,
    ...spiritsTequilaLiqueur,
    ...spiritsPremix,
  ];

  spirits = removeDuplicates(spirits);

  console.log('Spirits scraped!');
  return spirits;
};

const mainScrape = async () => {
  const spirits = await sainsburysScrapeSpirits();
  const spiritsJSON = JSON.stringify(spirits);
  fs.writeFileSync('src/output/sainsburys-spirits-final.json', spiritsJSON);
};

mainScrape();

module.exports = sainsburysScrapeSpirits;
