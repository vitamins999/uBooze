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
exports.waitroseScrapeBeer = void 0;
const waitroseScraper_1 = require("../utils/waitroseScraper");
const fs_1 = __importDefault(require("fs"));
const removeDuplicates_1 = require("../utils/removeDuplicates");
// Beer URLs
// Ale
const beerAleLightURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/light_ale';
const beerAleAmberURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/amber_ale';
const beerAleDarkURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/ale/dark_ale';
// Lager
const beerLagerURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/lager';
// Cider
const beerCiderTraditionalURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/cider/traditional_ciders';
const beerCiderFlavouredURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/cider/flavoured_ciders';
// Low and Alcohol Free
const beerLowAlcoholURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/beer/low_and_alcohol_free_beer';
exports.waitroseScrapeBeer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Ale
    const beerAleLight = yield waitroseScraper_1.waitroseScraper(beerAleLightURL, 'beer', 'ale', 3);
    const beerAleAmber = yield waitroseScraper_1.waitroseScraper(beerAleAmberURL, 'beer', 'ale');
    const beerAleDark = yield waitroseScraper_1.waitroseScraper(beerAleDarkURL, 'beer', 'ale');
    const beerAle = [
        ...beerAleLight,
        ...beerAleAmber,
        ...beerAleDark,
    ];
    // Lager
    const beerLager = yield waitroseScraper_1.waitroseScraper(beerLagerURL, 'beer', 'lager', 2);
    // Cider
    const beerCiderTraditional = yield waitroseScraper_1.waitroseScraper(beerCiderTraditionalURL, 'beer', 'cider');
    const beerCiderFlavoured = yield waitroseScraper_1.waitroseScraper(beerCiderFlavouredURL, 'beer', 'cider');
    const beerCider = [
        ...beerCiderTraditional,
        ...beerCiderFlavoured,
    ];
    // Low and Alcohol Free
    const beerLowAlcohol = yield waitroseScraper_1.waitroseScraper(beerLowAlcoholURL, 'beer', 'low alcohol');
    let beer = [
        ...beerAle,
        ...beerLager,
        ...beerCider,
        ...beerLowAlcohol,
    ];
    beer = removeDuplicates_1.removeDuplicates(beer);
    const beerJSON = JSON.stringify(beer);
    fs_1.default.writeFileSync('src/output/waitrose-beer.json', beerJSON);
});
