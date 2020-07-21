import { sainsburysScraper } from '../utils/sainsburysScraper';
import fs from 'fs';
import { removeDuplicates } from '../utils/removeDuplicates';
import { SupermarketProduct } from '../utils/types';

// Spirits URLs

// Gin
const spiritsGinURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12287&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12287&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Whisky
const spiritsWhiskyURL1: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/whisky--#langId=44&storeId=10151&catalogId=10241&categoryId=199702&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';
const spiritsWhiskyURL2: string =
  'https://www.sainsburys.co.uk/shop/CategoryDisplay?listId=&catalogId=10241&searchTerm=&beginIndex=60&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&top_category=12192&langId=44&storeId=10151&categoryId=199702&promotionId=&parent_category_rn=12192';

// Vodka
const spiritsVodkaURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/vodka#langId=44&storeId=10151&catalogId=10241&categoryId=12286&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Rum
const spiritsRumURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/rum#langId=44&storeId=10151&catalogId=10241&categoryId=12291&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CRATINGS_DESC&searchTerm=&beginIndex=0&hideFilters=true';

// Brandy and Cognac
const spiritsBrandyCognacURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/brandy-cognac#langId=44&storeId=10151&catalogId=10241&categoryId=12293&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Tequila, Liqueuers and Speciality
const spiritsTequilaURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/tequila#langId=44&storeId=10151&catalogId=10241&categoryId=41153&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0&hideFilters=true';
const spiritsLiqueurURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/liqueurs-other-spirits#langId=44&storeId=10151&catalogId=10241&categoryId=12294&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0';
const spiritsAperitifURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/vermouths-aperitifs#langId=44&storeId=10151&catalogId=10241&categoryId=12296&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0&hideFilters=true&facet=4294964818';

// Premix
const spiritsPremixURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=458360&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=458360&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

export const sainsburysScrapeSpirits = async (): Promise<void> => {
  // Gin
  const spiritsGin: SupermarketProduct[] = await sainsburysScraper(
    spiritsGinURL,
    'spirits',
    'gin'
  );

  // Whisky
  const spiritsWhisky1: SupermarketProduct[] = await sainsburysScraper(
    spiritsWhiskyURL1,
    'spirits',
    'whisky'
  );
  const spiritsWhisky2: SupermarketProduct[] = await sainsburysScraper(
    spiritsWhiskyURL2,
    'spirits',
    'whisky'
  );

  const spiritsWhisky: SupermarketProduct[] = [
    ...spiritsWhisky1,
    ...spiritsWhisky2,
  ];

  // Vodka
  const spiritsVodka: SupermarketProduct[] = await sainsburysScraper(
    spiritsVodkaURL,
    'spirits',
    'vodka'
  );

  // Rum
  const spiritsRum: SupermarketProduct[] = await sainsburysScraper(
    spiritsRumURL,
    'spirits',
    'rum'
  );

  // Brandy and Cognac
  const spiritsBrandyCognac: SupermarketProduct[] = await sainsburysScraper(
    spiritsBrandyCognacURL,
    'spirits',
    'brandy and cognac'
  );

  // // Tequila, Liqueuers and Speciality
  const spiritsTequila: SupermarketProduct[] = await sainsburysScraper(
    spiritsTequilaURL,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsLiqueur: SupermarketProduct[] = await sainsburysScraper(
    spiritsLiqueurURL,
    'spirits',
    'tequila and liqueurs'
  );
  const spiritsAperitif: SupermarketProduct[] = await sainsburysScraper(
    spiritsAperitifURL,
    'spirits',
    'tequila and liqueurs'
  );

  const spiritsTequilaLiqueur: SupermarketProduct[] = [
    ...spiritsTequila,
    ...spiritsLiqueur,
    ...spiritsAperitif,
  ];

  // Premix
  const spiritsPremix: SupermarketProduct[] = await sainsburysScraper(
    spiritsPremixURL,
    'spirits',
    'premix'
  );

  let spirits: SupermarketProduct[] = [
    ...spiritsGin,
    ...spiritsWhisky,
    ...spiritsVodka,
    ...spiritsRum,
    ...spiritsBrandyCognac,
    ...spiritsTequilaLiqueur,
    ...spiritsPremix,
  ];

  spirits = removeDuplicates(spirits);

  const spiritsJSON: string = JSON.stringify(spirits);
  fs.writeFileSync('src/output/sainsburys-spirits.json', spiritsJSON);
};
