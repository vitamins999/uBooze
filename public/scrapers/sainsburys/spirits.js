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
exports.sainsburysScrapeSpirits = void 0;
const sainsburysScraper_1 = require("../utils/sainsburysScraper");
const fs_1 = __importDefault(require("fs"));
// Spirits URLs
// Gin
const spiritsGinURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=12287&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=12287&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';
// Whisky
const spiritsWhiskyURL1 = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/whisky--#langId=44&storeId=10151&catalogId=10241&categoryId=199702&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';
const spiritsWhiskyURL2 = 'https://www.sainsburys.co.uk/shop/CategoryDisplay?listId=&catalogId=10241&searchTerm=&beginIndex=60&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&top_category=12192&langId=44&storeId=10151&categoryId=199702&promotionId=&parent_category_rn=12192';
// Vodka
const spiritsVodkaURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/vodka#langId=44&storeId=10151&catalogId=10241&categoryId=12286&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';
// Rum
const spiritsRumURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/rum#langId=44&storeId=10151&catalogId=10241&categoryId=12291&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CRATINGS_DESC&searchTerm=&beginIndex=0&hideFilters=true';
// Brandy and Cognac
const spiritsBrandyCognacURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/brandy-cognac#langId=44&storeId=10151&catalogId=10241&categoryId=12293&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';
// Tequila, Liqueuers and Speciality
const spiritsTequilaURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/tequila#langId=44&storeId=10151&catalogId=10241&categoryId=41153&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0&hideFilters=true';
const spiritsLiqueurURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/liqueurs-other-spirits#langId=44&storeId=10151&catalogId=10241&categoryId=12294&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0';
const spiritsAperitifURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/vermouths-aperitifs#langId=44&storeId=10151&catalogId=10241&categoryId=12296&parent_category_rn=12192&top_category=12192&pageSize=60&orderBy=FAVOURITES_FIRST&searchTerm=&beginIndex=0&hideFilters=true&facet=4294964818';
// Premix
const spiritsPremixURL = 'https://www.sainsburys.co.uk/shop/gb/groceries/drinks/CategoryDisplay?langId=44&storeId=10151&catalogId=10241&categoryId=458360&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&beginIndex=0&promotionId=&listId=&searchTerm=&hasPreviousOrder=&previousOrderId=&categoryFacetId1=&categoryFacetId2=&ImportedProductsCount=&ImportedStoreName=&ImportedSupermarket=&bundleId=&parent_category_rn=12192&top_category=12192&pageSize=120#langId=44&storeId=10151&catalogId=10241&categoryId=458360&parent_category_rn=12192&top_category=12192&pageSize=120&orderBy=FAVOURITES_ONLY%7CSEQUENCING%7CTOP_SELLERS&searchTerm=&beginIndex=0&hideFilters=true';
exports.sainsburysScrapeSpirits = () => __awaiter(void 0, void 0, void 0, function* () {
    // Gin
    const spiritsGin = yield sainsburysScraper_1.sainsburysScraper(spiritsGinURL);
    // Whisky
    const spiritsWhisky1 = yield sainsburysScraper_1.sainsburysScraper(spiritsWhiskyURL1);
    const spiritsWhisky2 = yield sainsburysScraper_1.sainsburysScraper(spiritsWhiskyURL2);
    const spiritsWhisky = spiritsWhisky1.concat(spiritsWhisky2);
    // Vodka
    const spiritsVodka = yield sainsburysScraper_1.sainsburysScraper(spiritsVodkaURL);
    // Rum
    const spiritsRum = yield sainsburysScraper_1.sainsburysScraper(spiritsRumURL);
    // Brandy and Cognac
    const spiritsBrandyCognac = yield sainsburysScraper_1.sainsburysScraper(spiritsBrandyCognacURL);
    // // Tequila, Liqueuers and Speciality
    const spiritsTequila = yield sainsburysScraper_1.sainsburysScraper(spiritsTequilaURL);
    const spiritsLiqueur = yield sainsburysScraper_1.sainsburysScraper(spiritsLiqueurURL);
    const spiritsAperitif = yield sainsburysScraper_1.sainsburysScraper(spiritsAperitifURL);
    const spiritsTequilaLiqueur = spiritsTequila.concat(spiritsLiqueur.concat(spiritsAperitif));
    // Premix
    const spiritsPremix = yield sainsburysScraper_1.sainsburysScraper(spiritsPremixURL);
    const spirits = {
        gin: spiritsGin,
        whisky: spiritsWhisky,
        vodka: spiritsVodka,
        rum: spiritsRum,
        brandyCognac: spiritsBrandyCognac,
        tequilaLiqueur: spiritsTequilaLiqueur,
        premix: spiritsPremix,
    };
    const spiritsJSON = JSON.stringify(spirits);
    fs_1.default.writeFileSync('src/output/sainsburys-spirits.json', spiritsJSON);
});
