"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sainsburysScrapeBeer = void 0;
const sainsburysScraper_1 = require("../utils/sainsburysScraper");
const fs_1 = __importDefault(require("fs"));
// Beer URLs
// Lager
const beerLagerURL = 'https://www.sainsburys.co.uk/shop/CategoryDisplay?catalogId=10241&beginIndex=0&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&langId=44&storeId=10151&facet=&categoryId=278253&parent_category_rn=12192#langId=44&storeId=10151&catalogId=10241&categoryId=278253&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0';
// World Lager
const beerLagerWorldURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/world-beer?fromMegaNav=1#langId=44&storeId=10151&catalogId=10241&categoryId=12260&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0';
// Craft and Specialist
const beerCraftURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12264&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12264&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';
// Cider
const beerCiderURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12269&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12269&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';
// Ale
const beerAleURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12257&orderBy=FAVOURITES_FIRST&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12257&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0';
// Stout
const beerStoutURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/stout#langId=44&storeId=10151&catalogId=10241&categoryId=275908&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0&hideFilters=true';
// Low alcohol
const beerLowAlcoholURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12267&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12267&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0';
exports.sainsburysScrapeBeer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Lager
    const beerLagerRegular = yield sainsburysScraper_1.sainsburysScraper(beerLagerURL);
    const beerLagerWorld = yield sainsburysScraper_1.sainsburysScraper(beerLagerWorldURL);
    const beerLager = beerLagerRegular.concat(beerLagerWorld);
    // Craft and Specialist
    const beerCraft = yield sainsburysScraper_1.sainsburysScraper(beerCraftURL);
    // Cider
    const beerCider = yield sainsburysScraper_1.sainsburysScraper(beerCiderURL);
    // Ale
    const beerAle = yield sainsburysScraper_1.sainsburysScraper(beerAleURL);
    // Stout
    const beerStout = yield sainsburysScraper_1.sainsburysScraper(beerStoutURL);
    // Low alcohol
    const beerLowAlcohol = yield sainsburysScraper_1.sainsburysScraper(beerLowAlcoholURL);
    const beer = {
        lager: beerLager,
        craft: beerCraft,
        cider: beerCider,
        ale: beerAle,
        stout: beerStout,
        lowAlcohol: beerLowAlcohol,
    };
    const beerJSON = JSON.stringify(beer);
    fs_1.default.writeFileSync('output/sainsburys-beer.json', beerJSON);
});
