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
exports.tescoScrapeBeer = void 0;
const tescoScraper_1 = require("../utils/tescoScraper");
const fs_1 = __importDefault(require("fs"));
const removeDuplicates_1 = require("../utils/removeDuplicates");
// Beer URLs
// Lager
const beerLagerURL1 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=1&count=48';
const beerLagerURL2 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=2&count=48';
// const beerLagerURL3: string =
//   'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-lager?page=3&count=48';
const beerLagerWorldURL1 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-world-lager?page=1&count=48';
const beerLagerWorldURL2 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-world-lager?page=2&count=48';
// Ale & Bitter
const beerAleURL1 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-ale-and-bitter?page=1&count=48';
const beerAleURL2 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-ale-and-bitter?page=2&count=48';
// Craft & Specialist
const beerCraftURL1 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-craft-and-specialist?page=1&count=48';
const beerCraftURL2 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-craft-and-specialist?page=2&count=48';
const beerCraftURL3 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/beer-craft-and-specialist?page=3&count=48';
// Cider
const beerCiderURL1 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/cider?page=1&count=48';
const beerCiderURL2 = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/cider?page=2&count=48';
// Stout & Porter
const beerStoutURL = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/stout-and-porter';
// Gluten Free
const beerGlutenFreeURL = 'https://www.tesco.com/groceries/en-GB/shop/drinks/beer-and-cider/gluten-free-beer';
// Low alcohol
const beerLowAlcoholURL = 'https://www.tesco.com/groceries/en-GB/shop/drinks/low-and-no-alcohol/low-and-no-alcohol-beer-and-cider';
exports.tescoScrapeBeer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Lager
    const beerLager1 = yield tescoScraper_1.tescoScraper(beerLagerURL1, 'beer', 'lager');
    const beerLager2 = yield tescoScraper_1.tescoScraper(beerLagerURL2, 'beer', 'lager');
    // const beerLager3: SupermarketProduct[] = await tescoScraper(beerLagerURL3);
    const beerLagerRegular = [...beerLager1, ...beerLager2];
    const beerLagerWorld1 = yield tescoScraper_1.tescoScraper(beerLagerWorldURL1, 'beer', 'lager');
    const beerLagerWorld2 = yield tescoScraper_1.tescoScraper(beerLagerWorldURL2, 'beer', 'lager');
    const beerLagerWorld = [
        ...beerLagerWorld1,
        ...beerLagerWorld2,
    ];
    const beerLager = [
        ...beerLagerRegular,
        ...beerLagerWorld,
    ];
    // Ale and Bitter
    const beerAle1 = yield tescoScraper_1.tescoScraper(beerAleURL1, 'beer', 'ale');
    const beerAle2 = yield tescoScraper_1.tescoScraper(beerAleURL2, 'beer', 'ale');
    const beerAle = [...beerAle1, ...beerAle2];
    // Craft & Specialist
    const beerCraft1 = yield tescoScraper_1.tescoScraper(beerCraftURL1, 'beer', 'craft');
    const beerCraft2 = yield tescoScraper_1.tescoScraper(beerCraftURL2, 'beer', 'craft');
    const beerCraft3 = yield tescoScraper_1.tescoScraper(beerCraftURL3, 'beer', 'craft');
    const beerCraft = [
        ...beerCraft1,
        ...beerCraft2,
        ...beerCraft3,
    ];
    // Cider
    const beerCider1 = yield tescoScraper_1.tescoScraper(beerCiderURL1, 'beer', 'cider');
    const beerCider2 = yield tescoScraper_1.tescoScraper(beerCiderURL2, 'beer', 'cider');
    const beerCider = [...beerCider1, ...beerCider2];
    // Stout
    const beerStout = yield tescoScraper_1.tescoScraper(beerStoutURL, 'beer', 'stout');
    // Gluten Free
    const beerGlutenFree = yield tescoScraper_1.tescoScraper(beerGlutenFreeURL, 'beer', 'gluten free');
    // Low alcohol
    const beerLowAlcohol = yield tescoScraper_1.tescoScraper(beerLowAlcoholURL, 'beer', 'low alcohol');
    let beer = [
        ...beerLager,
        ...beerAle,
        ...beerCraft,
        ...beerCider,
        ...beerStout,
        ...beerGlutenFree,
        ...beerLowAlcohol,
    ];
    beer = removeDuplicates_1.removeDuplicates(beer);
    const beerJSON = JSON.stringify(beer);
    fs_1.default.writeFileSync('src/output/tesco-beer.json', beerJSON);
});
// TODO: Add a conditional to all Tesco pages whereby if it's a 404, it ignores it and
// moves on to the next page, since that must mean the page has dynamically changed to where
// it doesn't exist anymore because there aren't enough items to make it. Use beer URL to test.
