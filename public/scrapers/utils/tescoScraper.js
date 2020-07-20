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
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const currency_js_1 = __importDefault(require("currency.js"));
const tescoScraper = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = [];
        const { data } = yield axios_1.default.get(url);
        const $ = cheerio_1.default.load(data);
        $('body')
            .find('.product-list--list-item')
            .each((i, el) => {
            const productName = $(el).find('.sc-fjdhpX').text();
            if (!productName) {
                return;
            }
            let priceText = $(el).find('.value').first().text();
            if (!priceText) {
                priceText = '0';
            }
            const price = currency_js_1.default(priceText).intValue;
            let offer = $(el)
                .find('.list-item-content')
                .find('.offer-text')
                .first()
                .text();
            if (!offer) {
                offer = 'No offer';
            }
            let linkPartial = $(el).find('.product-image-wrapper').attr('href');
            linkPartial = String(linkPartial);
            const link = `https://www.tesco.com${linkPartial}`;
            const imagePartial = $(el).find('.product-image').attr('src');
            const image = String(imagePartial);
            products.push({
                productName,
                price,
                offer,
                link,
                image,
            });
        });
        return products;
    }
    catch (error) {
        throw new Error(`*** An error occured with tescoScraper: ${error}`);
    }
});
module.exports = {
    tescoScraper,
};
