import { sainsburysScraper } from '../utils/sainsburysScraper';
import fs from 'fs';
import { removeDuplicates } from '../utils/removeDuplicates';
import { SupermarketProduct } from '../utils/types';

// Beer URLs

// Lager
const beerLagerURL: string =
  'https://www.sainsburys.co.uk/shop/CategoryDisplay?catalogId=10241&beginIndex=0&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&langId=44&storeId=10151&facet=&categoryId=278253&parent_category_rn=12192#langId=44&storeId=10151&catalogId=10241&categoryId=278253&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0';

// World Lager
const beerLagerWorldURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/world-beer?fromMegaNav=1#langId=44&storeId=10151&catalogId=10241&categoryId=12260&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0';

// Craft and Specialist
const beerCraftURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12264&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12264&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Cider
const beerCiderURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12269&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12269&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';

// Ale
const beerAleURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12257&orderBy=FAVOURITES_FIRST&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12257&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0';

// Stout
const beerStoutURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/stout#langId=44&storeId=10151&catalogId=10241&categoryId=275908&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0&hideFilters=true';

// Low alcohol
const beerLowAlcoholURL: string =
  'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12267&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12267&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0';

export const sainsburysScrapeBeer = async (): Promise<void> => {
  // Lager
  const beerLagerRegular: SupermarketProduct[] = await sainsburysScraper(
    beerLagerURL,
    'beer',
    'lager'
  );
  const beerLagerWorld: SupermarketProduct[] = await sainsburysScraper(
    beerLagerWorldURL,
    'beer',
    'lager'
  );

  const beerLager: SupermarketProduct[] = [
    ...beerLagerRegular,
    ...beerLagerWorld,
  ];

  // Craft and Specialist
  const beerCraft: SupermarketProduct[] = await sainsburysScraper(
    beerCraftURL,
    'beer',
    'craft'
  );

  // Cider
  const beerCider: SupermarketProduct[] = await sainsburysScraper(
    beerCiderURL,
    'beer',
    'cider'
  );

  // Ale
  const beerAle: SupermarketProduct[] = await sainsburysScraper(
    beerAleURL,
    'beer',
    'ale'
  );

  // Stout
  const beerStout: SupermarketProduct[] = await sainsburysScraper(
    beerStoutURL,
    'beer',
    'stout'
  );

  // Low alcohol
  const beerLowAlcohol: SupermarketProduct[] = await sainsburysScraper(
    beerLowAlcoholURL,
    'beer',
    'low alcohol'
  );

  let beer: SupermarketProduct[] = [
    ...beerLager,
    ...beerCraft,
    ...beerCider,
    ...beerAle,
    ...beerStout,
    ...beerLowAlcohol,
  ];

  beer = removeDuplicates(beer);

  const beerJSON: string = JSON.stringify(beer);
  fs.writeFileSync('src/output/sainsburys-beer.json', beerJSON);
};
