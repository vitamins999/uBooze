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
exports.tescoScrapeSpirits = void 0;
const tescoScraper_1 = require("../utils/tescoScraper");
const fs_1 = __importDefault(require("fs"));
const removeDuplicates_1 = require("../utils/removeDuplicates");
// Spirits URLS
// Gin
const spiritsGinURL1 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/gin?page=1&count=48';
const spiritsGinURL2 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/gin?page=2&count=48';
const spiritsGinURL3 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/gin?page=3&count=48';
// Whisky
const spiritsWhiskyURL1 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/whisky?page=1&count=48';
const spiritsWhiskyURL2 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/whisky?page=2&count=48';
const spiritsWhiskyURL3 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/whisky?page=3&count=48';
// Vodka
const spiritsVodkaURL = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/vodka';
// Rum
const spiritsRumURL = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/rum';
// Brandy & Cognac
const spiritsBrandyCognacURL = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/brandy-and-cognac';
// Tequila, Liqueurs & Aperitifs
const spiritsTequilaLiqueursURL1 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/tequila-liqueurs-and-aperitifs?page=1&count=48';
const spiritsTequilaLiqueursURL2 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/tequila-liqueurs-and-aperitifs?page=2&count=48';
// Premix
const spiritsPremixURL1 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/premix-spirits?page=1&count=48';
const spiritsPremixURL2 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/premix-spirits?page=2&count=48';
const spiritsPremixURL3 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/spirits/premix-spirits?page=3&count=48';
// Low alcohol
const spiritsLowAlcoholURL = 'https://www.tesco.com/groceries/en-GB/shop/drinks/low-and-no-alcohol/low-and-no-alcohol-spirits';
exports.tescoScrapeSpirits = () => __awaiter(void 0, void 0, void 0, function* () {
    // Gin
    const spiritsGin1 = yield tescoScraper_1.tescoScraper(spiritsGinURL1, 'spirits', 'gin');
    const spiritsGin2 = yield tescoScraper_1.tescoScraper(spiritsGinURL2, 'spirits', 'gin');
    const spiritsGin3 = yield tescoScraper_1.tescoScraper(spiritsGinURL3, 'spirits', 'gin');
    const spiritsGin = [
        ...spiritsGin1,
        ...spiritsGin2,
        ...spiritsGin3,
    ];
    // Whisky
    const spiritsWhisky1 = yield tescoScraper_1.tescoScraper(spiritsWhiskyURL1, 'spirits', 'whisky');
    const spiritsWhisky2 = yield tescoScraper_1.tescoScraper(spiritsWhiskyURL2, 'spirits', 'whisky');
    const spiritsWhisky3 = yield tescoScraper_1.tescoScraper(spiritsWhiskyURL3, 'spirits', 'whisky');
    const spiritsWhisky = [
        ...spiritsWhisky1,
        ...spiritsWhisky2,
        ...spiritsWhisky3,
    ];
    // Vodka
    const spiritsVodka = yield tescoScraper_1.tescoScraper(spiritsVodkaURL, 'spirits', 'vodka');
    // Rum
    const spiritsRum = yield tescoScraper_1.tescoScraper(spiritsRumURL, 'spirits', 'rum');
    // Brandy & Cognac
    const spiritsBrandyCognac = yield tescoScraper_1.tescoScraper(spiritsBrandyCognacURL, 'spirits', 'brandy and cognac');
    // Tequila, Liqueurs & Aperitifs
    const spiritsTequilaLiqueurs1 = yield tescoScraper_1.tescoScraper(spiritsTequilaLiqueursURL1, 'spirits', 'tequila and liqueurs');
    const spiritsTequilaLiqueurs2 = yield tescoScraper_1.tescoScraper(spiritsTequilaLiqueursURL2, 'spirits', 'tequila and liqueurs');
    const spiritsTequilaLiqueurs = [
        ...spiritsTequilaLiqueurs1,
        ...spiritsTequilaLiqueurs2,
    ];
    // Premix
    const spiritsPremix1 = yield tescoScraper_1.tescoScraper(spiritsPremixURL1, 'spirits', 'premix');
    const spiritsPremix2 = yield tescoScraper_1.tescoScraper(spiritsPremixURL2, 'spirits', 'premix');
    const spiritsPremix3 = yield tescoScraper_1.tescoScraper(spiritsPremixURL3, 'spirits', 'premix');
    const spiritsPremix = [
        ...spiritsPremix1,
        ...spiritsPremix2,
        ...spiritsPremix3,
    ];
    // Low alcohol
    const spiritsLowAlcohol = yield tescoScraper_1.tescoScraper(spiritsLowAlcoholURL, 'spirits', 'low alcohol');
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
    fs_1.default.writeFileSync('src/output/tesco-spirits.json', spiritsJSON);
});
