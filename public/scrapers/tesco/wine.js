'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.tescoScrapeWine = void 0;
const tescoScraper_1 = require('../utils/tescoScraper');
const fs_1 = __importDefault(require('fs'));
const removeDuplicates_1 = require('../utils/removeDuplicates');
// Wine URLS
// Red
const wineRedURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=1&count=48';
const wineRedURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=2&count=48';
const wineRedURL3 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=3&count=48';
const wineRedURL4 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=4&count=48';
const wineRedURL5 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/red-wine?page=5&count=48';
// White
const wineWhiteURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=1&count=48';
const wineWhiteURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=2&count=48';
const wineWhiteURL3 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=3&count=48';
const wineWhiteURL4 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/white-wine?page=4&count=48';
// Rose
const wineRoseURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/rose-wine?page=1&count=48';
const wineRoseURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/rose-wine?page=2&count=48';
// Champagne & Sparkling
const wineChampagneSparklingURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/champagne-and-sparkling-wine?page=1&count=48';
const wineChampagneSparklingURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/champagne-and-sparkling-wine?page=2&count=48';
// Boxes
const wineBoxesURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/boxed-wine';
// Fruity
const wineFruityURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/fruity-wine';
// Dessert
const wineDessertURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/dessert-wine';
// Fortified Wine (Port and Sherry) and Vermouth
const wineFortifiedVermouthURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/fortified-wine-and-vermouth';
// Small Wine Bottles
const wineSmallURL1 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/small-wine-bottles?page=1&count=48';
const wineSmallURL2 =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/wine/small-wine-bottles?page=2&count=48';
// Low Alcohol
const wineLowAlcoholURL =
  'https://www.tesco.com/groceries/en-GB/shop/drinks/low-and-no-alcohol/low-and-no-alcohol-wine';
exports.tescoScrapeWine = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Red
    const wineRed1 = yield tescoScraper_1.tescoScraper(
      wineRedURL1,
      'wine',
      'red'
    );
    const wineRed2 = yield tescoScraper_1.tescoScraper(
      wineRedURL2,
      'wine',
      'red'
    );
    const wineRed3 = yield tescoScraper_1.tescoScraper(
      wineRedURL3,
      'wine',
      'red'
    );
    const wineRed4 = yield tescoScraper_1.tescoScraper(
      wineRedURL4,
      'wine',
      'red'
    );
    const wineRed5 = yield tescoScraper_1.tescoScraper(
      wineRedURL5,
      'wine',
      'red'
    );
    const wineRed = [
      ...wineRed1,
      ...wineRed2,
      ...wineRed3,
      ...wineRed4,
      ...wineRed5,
    ];
    // White
    const wineWhite1 = yield tescoScraper_1.tescoScraper(
      wineWhiteURL1,
      'wine',
      'white'
    );
    const wineWhite2 = yield tescoScraper_1.tescoScraper(
      wineWhiteURL2,
      'wine',
      'white'
    );
    const wineWhite3 = yield tescoScraper_1.tescoScraper(
      wineWhiteURL3,
      'wine',
      'white'
    );
    const wineWhite4 = yield tescoScraper_1.tescoScraper(
      wineWhiteURL4,
      'wine',
      'white'
    );
    const wineWhite = [
      ...wineWhite1,
      ...wineWhite2,
      ...wineWhite3,
      ...wineWhite4,
    ];
    // Rose
    const wineRose1 = yield tescoScraper_1.tescoScraper(
      wineRoseURL1,
      'wine',
      'rose'
    );
    const wineRose2 = yield tescoScraper_1.tescoScraper(
      wineRoseURL2,
      'wine',
      'rose'
    );
    const wineRose = [...wineRose1, ...wineRose2];
    // Champagne & Sparkling
    const wineChampagneSparkling1 = yield tescoScraper_1.tescoScraper(
      wineChampagneSparklingURL1,
      'wine',
      'sparkling'
    );
    const wineChampagneSparkling2 = yield tescoScraper_1.tescoScraper(
      wineChampagneSparklingURL2,
      'wine',
      'sparkling'
    );
    const wineChampagneSparkling = [
      ...wineChampagneSparkling1,
      ...wineChampagneSparkling2,
    ];
    // Boxes
    const wineBoxes = yield tescoScraper_1.tescoScraper(
      wineBoxesURL,
      'wine',
      'boxes'
    );
    // Fruity
    const wineFruity = yield tescoScraper_1.tescoScraper(
      wineFruityURL,
      'wine',
      'fruity'
    );
    // Dessert
    const wineDessert = yield tescoScraper_1.tescoScraper(
      wineDessertURL,
      'wine',
      'dessert'
    );
    // Fortified Wine (Port and Sherry) and Vermouth
    const wineFortifiedVermouth = yield tescoScraper_1.tescoScraper(
      wineFortifiedVermouthURL,
      'wine',
      'fortified and vermouth'
    );
    // Small wine bottles
    const wineSmall1 = yield tescoScraper_1.tescoScraper(
      wineSmallURL1,
      'wine',
      'small'
    );
    // const wineSmall2 = yield tescoScraper_1.tescoScraper(wineSmallURL2, 'wine', 'small');
    const wineSmall = [...wineSmall1];
    // Low alcohol
    const wineLowAlcohol = yield tescoScraper_1.tescoScraper(
      wineLowAlcoholURL,
      'wine',
      'low alcohol'
    );
    let wine = [
      ...wineRed,
      ...wineWhite,
      ...wineRose,
      ...wineChampagneSparkling,
      ...wineBoxes,
      ...wineFruity,
      ...wineDessert,
      ...wineFortifiedVermouth,
      ...wineSmall,
      ...wineLowAlcohol,
    ];
    wine = removeDuplicates_1.removeDuplicates(wine);
    const wineJSON = JSON.stringify(wine);
    fs_1.default.writeFileSync('src/output/tesco-wine.json', wineJSON);
  });
