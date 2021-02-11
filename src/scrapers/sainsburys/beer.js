const sainsburysScraper = require('../utils/sainsburysScraper');
const removeDuplicates = require('../utils/removeDuplicates');
const fs = require('fs');

// Beer URLs

// Lager
const beerLagerURL =
  'https://www.sainsburys.co.uk/shop/CategoryDisplay?catalogId=10241&beginIndex=0&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&langId=44&storeId=10151&facet=&categoryId=278253&parent_category_rn=12192#langId=44&storeId=10151&catalogId=10241&categoryId=278253&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0';

// World Lager
const beerLagerWorldURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/world-beer?fromMegaNav=1#langId=44&storeId=10151&catalogId=10241&categoryId=12260&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0';

// Craft and Specialist
const beerCraftURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12264&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12264&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Cider
const beerCiderURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12269&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12269&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Ale
const beerAleURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12257&orderBy=FAVOURITES_FIRST&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12257&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0';

// Stout
const beerStoutURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/stout#langId=44&storeId=10151&catalogId=10241&categoryId=275908&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0&hideFilters=true';

// Low alcohol
const beerLowAlcoholURL =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12267&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12267&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0';

const sainsburysScrapeBeer = async () => {
  // Lager
  const beerLagerRegular = await sainsburysScraper(
    beerLagerURL,
    'beer',
    'lager'
  );
  const beerLagerWorld = await sainsburysScraper(
    beerLagerWorldURL,
    'beer',
    'lager'
  );

  const beerLager = [...beerLagerRegular, ...beerLagerWorld];

  // Craft and Specialist
  const beerCraft = await sainsburysScraper(beerCraftURL, 'beer', 'craft');

  // Cider
  const beerCider = await sainsburysScraper(beerCiderURL, 'beer', 'cider');

  // Ale
  const beerAle = await sainsburysScraper(beerAleURL, 'beer', 'ale');

  // Stout
  const beerStout = await sainsburysScraper(beerStoutURL, 'beer', 'stout');

  // Low alcohol
  const beerLowAlcohol = await sainsburysScraper(
    beerLowAlcoholURL,
    'beer',
    'low alcohol'
  );

  let beer = [
    ...beerLager,
    ...beerCraft,
    ...beerCider,
    ...beerAle,
    ...beerStout,
    ...beerLowAlcohol,
  ];

  beer = removeDuplicates(beer);

  console.log('Beer scraped!');
  return beer;
};

const mainScrape = async () => {
  const beer = await sainsburysScrapeBeer();
  const beerJSON = JSON.stringify(beer);
  fs.writeFileSync('src/output/sainsburys-beer-final.json', beerJSON);
};

mainScrape();

module.exports = sainsburysScrapeBeer;
