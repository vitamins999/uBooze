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
exports.waitroseScrapeSpirits = void 0;
const waitroseScraper_1 = require("../utils/waitroseScraper");
const fs_1 = __importDefault(require("fs"));
const removeDuplicates_1 = require("../utils/removeDuplicates");
// Spirits URLs
// Whisky
const spiritsWhiskyURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/whisky';
// Gin
const spiritsGinURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/gin';
// Vodka
const spiritsVodkaURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/vodka';
// Brandy
const spiritsBrandyURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/brandy';
// Cognac
const spiritsCognacURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/cognac';
// Rum
const spiritsRumURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/rum';
// Tequila
const spiritsTequilaURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/tequila';
// Pimms & Summer Drinks
const spiritsPimmsSummerURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/pimms_and_summer_drinks';
// Liqueurs & Aperitifs
const spiritsLiqueursURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/liqueurs_and_aperitifs';
// Premix
const spiritsPremixURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/pre_mixed_spirits';
// Low alcohol
const spiritsLowAlcoholURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/low_and_no_alcohol_spirits';
exports.waitroseScrapeSpirits = () => __awaiter(void 0, void 0, void 0, function* () {
    // Gin
    const spiritsGin = yield waitroseScraper_1.waitroseScraper(spiritsGinURL, 'spirits', 'gin');
    // Whisky
    const spiritsWhisky = yield waitroseScraper_1.waitroseScraper(spiritsWhiskyURL, 'spirits', 'whisky', 3);
    // Vodka
    const spiritsVodka = yield waitroseScraper_1.waitroseScraper(spiritsVodkaURL, 'spirits', 'vodka');
    // Brandy and Cognac
    const spiritsBrandy = yield waitroseScraper_1.waitroseScraper(spiritsBrandyURL, 'spirits', 'brandy and cognac');
    const spiritsCognac = yield waitroseScraper_1.waitroseScraper(spiritsCognacURL, 'spirits', 'brandy and cognac');
    const spiritsBrandyCognac = [
        ...spiritsBrandy,
        ...spiritsCognac,
    ];
    // Rum
    const spiritsRum = yield waitroseScraper_1.waitroseScraper(spiritsRumURL, 'spirits', 'rum');
    // Tequila, Liqueurs and Aperitifs
    const spiritsTequila = yield waitroseScraper_1.waitroseScraper(spiritsTequilaURL, 'spirits', 'tequila and liqueurs');
    const spiritsLiqueurs = yield waitroseScraper_1.waitroseScraper(spiritsLiqueursURL, 'spirits', 'tequila and liqueurs');
    const spiritsPimmsSummer = yield waitroseScraper_1.waitroseScraper(spiritsPimmsSummerURL, 'spirits', 'tequila and liqueurs');
    const spiritsTequilaLiqueurs = [
        ...spiritsTequila,
        ...spiritsLiqueurs,
        ...spiritsPimmsSummer,
    ];
    // Premix
    const spiritsPremix = yield waitroseScraper_1.waitroseScraper(spiritsPremixURL, 'spirits', 'premix');
    // Low alcohol
    const spiritsLowAlcohol = yield waitroseScraper_1.waitroseScraper(spiritsLowAlcoholURL, 'spirits', 'low alcohol');
    let spirits = [
        ...spiritsGin,
        ...spiritsWhisky,
        ...spiritsVodka,
        ...spiritsRum,
        ...spiritsBrandyCognac,
        ...spiritsTequilaLiqueurs,
        ...spiritsPremix,
        ...spiritsLowAlcohol,
    ];
    spirits = removeDuplicates_1.removeDuplicates(spirits);
    const spiritsJSON = JSON.stringify(spirits);
    fs_1.default.writeFileSync('src/output/waitrose-spirits.json', spiritsJSON);
});
