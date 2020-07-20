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
exports.waitroseScrapeWine = void 0;
const waitroseScraper_1 = require("../utils/waitroseScraper");
const fs_1 = __importDefault(require("fs"));
// Wine URLs
// Red
const wineRedBordeauxURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/bordeaux';
const wineRedCabernetSauvignonURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/cabernet_sauvignon';
const wineRedGrenacheURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/grenache';
const wineRedMalbecURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/malbec';
const wineRedMerlotURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/merlot';
const wineRedPinotNoirURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/pinot_noir';
const wineRedRiojaURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/rioja_tempranillo';
const wineRedShirazAndSyrahURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/red_wine/browse_by_grape/shiraz_and_syrah';
// White
const wineWhiteChardonnayURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/chardonnay';
const wineWhiteCheninBlancURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/chenin_blanc';
const wineWhitePinotGrigioURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/pinot_grigio';
const wineWhiteRieslingURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/riesling';
const wineWhiteSauvignonBlancURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/sauvignon_blanc';
const wineWhiteViognierURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/white_wine/browse_by_grape/viognier';
// Rose
const wineRoseFranceURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/france';
const wineRoseItalyURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/italy';
const wineRoseSpainURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/spain';
const wineRoseAustraliaURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/australia';
const wineRoseUSAURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/usa';
const wineRoseSparklingURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/sparkling_rose_wine';
const wineRoseRestOfWorldURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/rest_of_world';
const wineRoseEnglandURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/rose_wine/england';
// Fine Wine
const wineFineRedURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/fine_wine/fine_red_wine';
const wineFineWhiteURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/fine_wine/fine_white_wine';
// Champagne and Sparkling Wine
const wineChampagneSparklingURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/champagne_and_sparkling_wine';
// Dessert Wine
const wineDessertURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/dessert_wine';
// Port
const winePortURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/port_sherry_and_madeira/port';
// Sherry
const wineSherryURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/port_sherry_and_madeira/sherry';
// Madeira Wine
const wineMadeiraURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/port_sherry_and_madeira/madeira';
// Vermouth
const wineVermouthURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/spirits_and_liqueurs/vermouth';
// Wine Boxes
const wineBoxesURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/wine_boxes';
// Small bottles
const wineSmallURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/mini_wine_bottles';
// Low Alcohol
const wineLowAlcoholURL = 'https://www.waitrose.com/ecom/shop/browse/groceries/beer_wine_and_spirits/wine/low_alcohol_wine';
exports.waitroseScrapeWine = () => __awaiter(void 0, void 0, void 0, function* () {
    // Red Wine
    const wineRedBordeaux = yield waitroseScraper_1.waitroseScraper(wineRedBordeauxURL);
    const wineRedCabernetSauvignon = yield waitroseScraper_1.waitroseScraper(wineRedCabernetSauvignonURL);
    const wineRedGrenache = yield waitroseScraper_1.waitroseScraper(wineRedGrenacheURL);
    const wineRedMalbec = yield waitroseScraper_1.waitroseScraper(wineRedMalbecURL);
    const wineRedMerlot = yield waitroseScraper_1.waitroseScraper(wineRedMerlotURL);
    const wineRedPinotNoir = yield waitroseScraper_1.waitroseScraper(wineRedPinotNoirURL);
    const wineRedRioja = yield waitroseScraper_1.waitroseScraper(wineRedRiojaURL);
    const wineRedShirazAndSyrah = yield waitroseScraper_1.waitroseScraper(wineRedShirazAndSyrahURL);
    const wineFineRed = yield waitroseScraper_1.waitroseScraper(wineFineRedURL, 2);
    const wineRed = wineRedBordeaux.concat(wineRedCabernetSauvignon.concat(wineRedGrenache.concat(wineRedMalbec.concat(wineRedMerlot.concat(wineRedPinotNoir.concat(wineRedRioja.concat(wineRedShirazAndSyrah.concat(wineFineRed))))))));
    // White Wine
    const wineWhiteChardonnay = yield waitroseScraper_1.waitroseScraper(wineWhiteChardonnayURL);
    const wineWhiteCheninBlanc = yield waitroseScraper_1.waitroseScraper(wineWhiteCheninBlancURL);
    const wineWhitePinotGrigio = yield waitroseScraper_1.waitroseScraper(wineWhitePinotGrigioURL);
    const wineWhiteRiesling = yield waitroseScraper_1.waitroseScraper(wineWhiteRieslingURL);
    const wineWhiteSauvignonBlanc = yield waitroseScraper_1.waitroseScraper(wineWhiteSauvignonBlancURL);
    const wineWhiteViognier = yield waitroseScraper_1.waitroseScraper(wineWhiteViognierURL);
    const wineFineWhite = yield waitroseScraper_1.waitroseScraper(wineFineWhiteURL);
    const wineWhite = wineWhiteChardonnay.concat(wineWhiteCheninBlanc.concat(wineWhitePinotGrigio.concat(wineWhiteRiesling.concat(wineWhiteSauvignonBlanc.concat(wineWhiteViognier.concat(wineFineWhite))))));
    // Rose Wine
    const wineRoseFrance = yield waitroseScraper_1.waitroseScraper(wineRoseFranceURL);
    const wineRoseItaly = yield waitroseScraper_1.waitroseScraper(wineRoseItalyURL);
    const wineRoseSpain = yield waitroseScraper_1.waitroseScraper(wineRoseSpainURL);
    const wineRoseAustralia = yield waitroseScraper_1.waitroseScraper(wineRoseAustraliaURL);
    const wineRoseUSA = yield waitroseScraper_1.waitroseScraper(wineRoseUSAURL);
    const wineRoseSparkling = yield waitroseScraper_1.waitroseScraper(wineRoseSparklingURL);
    const wineRoseRestOfWorld = yield waitroseScraper_1.waitroseScraper(wineRoseRestOfWorldURL);
    const wineRoseEngland = yield waitroseScraper_1.waitroseScraper(wineRoseEnglandURL);
    const wineRose = wineRoseFrance.concat(wineRoseItaly.concat(wineRoseSpain.concat(wineRoseAustralia.concat(wineRoseUSA.concat(wineRoseSparkling.concat(wineRoseRestOfWorld.concat(wineRoseEngland)))))));
    // Champagne & Sparkling
    const wineChampagneSparkling = yield waitroseScraper_1.waitroseScraper(wineChampagneSparklingURL, 2);
    // Dessert Wine
    const wineDessert = yield waitroseScraper_1.waitroseScraper(wineDessertURL);
    // Fortified wine (Port and Sherry) and Vermouth
    const winePort = yield waitroseScraper_1.waitroseScraper(winePortURL);
    const wineSherry = yield waitroseScraper_1.waitroseScraper(wineSherryURL);
    const wineMadeira = yield waitroseScraper_1.waitroseScraper(wineMadeiraURL);
    const wineVermouth = yield waitroseScraper_1.waitroseScraper(wineVermouthURL);
    const wineFortifiedVermouth = winePort.concat(wineSherry.concat(wineMadeira.concat(wineVermouth)));
    // Boxes
    const wineBoxes = yield waitroseScraper_1.waitroseScraper(wineBoxesURL);
    // Small
    const wineSmall = yield waitroseScraper_1.waitroseScraper(wineSmallURL);
    // Low Alcohol
    const wineLowAlcohol = yield waitroseScraper_1.waitroseScraper(wineLowAlcoholURL);
    const wine = {
        red: wineRed,
        white: wineWhite,
        rose: wineRose,
        champagneSparkling: wineChampagneSparkling,
        boxes: wineBoxes,
        dessert: wineDessert,
        fortifiedVermouth: wineFortifiedVermouth,
        smallBottles: wineSmall,
        lowAlcohol: wineLowAlcohol,
    };
    const wineJSON = JSON.stringify(wine);
    fs_1.default.writeFileSync('output/waitrose-wine.json', wineJSON);
});
