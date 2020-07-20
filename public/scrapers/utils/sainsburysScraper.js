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
exports.sainsburysScraper = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const currency_js_1 = __importDefault(require("currency.js"));
const puppeteer_1 = __importDefault(require("puppeteer"));
exports.sainsburysScraper = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = [];
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.setViewport({ width: 1300, height: 1000 });
        yield page.goto(url, { waitUntil: 'networkidle2' });
        const data = yield page.content();
        const $ = cheerio_1.default.load(data);
        $('.product').each((i, el) => {
            const productName = $(el)
                .find('.productNameAndPromotions')
                .find('h3')
                .text()
                .trim();
            if (!productName) {
                return;
            }
            const priceText = $(el)
                .find('.pricePerUnit')
                .first()
                .text()
                .trim();
            const price = currency_js_1.default(priceText.slice(0, -5).slice(1)).intValue;
            let offer = $(el).find('.promotion').first().text().trim();
            if (!offer) {
                offer = 'No offer';
            }
            const linkPartial = $(el)
                .find('.productNameAndPromotions')
                .find('h3')
                .find('a')
                .attr('href');
            const link = String(linkPartial);
            let imagePartial = $(el)
                .find('.productNameAndPromotions')
                .find('h3')
                .find('a')
                .find('img')
                .attr('src');
            imagePartial = String(imagePartial);
            const image = `https://${imagePartial.slice(2)}`;
            products.push({
                productName,
                price,
                offer,
                link,
                image,
            });
        });
        yield browser.close();
        return products;
    }
    catch (error) {
        throw new Error(`*** An error occured with sainsburysScraper: ${error}`);
    }
});
