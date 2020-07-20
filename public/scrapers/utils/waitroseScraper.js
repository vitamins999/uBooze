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
exports.waitroseScraper = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const currency_js_1 = __importDefault(require("currency.js"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const puppeteer_autoscroll_down_1 = require("puppeteer-autoscroll-down");
exports.waitroseScraper = (url, scrollNum = 1) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = [];
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.setViewport({ width: 1300, height: 1000 });
        yield page.goto(url, { waitUntil: 'networkidle2' });
        // Clicks the 'accept cookies' popup
        yield page.focus('.button___2YB28');
        yield page.click('.button___2YB28');
        // Scroll to very top of page
        yield page.evaluate((_) => {
            window.scrollTo(0, 0);
        });
        // Scroll to the bottom of the page with puppeteer autoscroll down
        yield puppeteer_autoscroll_down_1.scrollPageToBottom(page, 250, 300);
        for (let i = 1; i < scrollNum; i++) {
            yield page.focus('.button___2UT_5');
            yield page.click('.button___2UT_5');
            yield puppeteer_autoscroll_down_1.scrollPageToBottom(page, 250, 300);
        }
        const html = yield page.content();
        const $ = cheerio_1.default.load(html);
        $('article').each((i, el) => {
            const productNameText = $(el).data('product-name');
            if (!productNameText) {
                return;
            }
            const size = $(el).find('.size___2HSwr').first().text();
            const productName = `${productNameText} ${size}`;
            const priceText = $(el)
                .find('.prices___1JkR4')
                .find('span span')
                .text();
            const price = currency_js_1.default(priceText.slice(1)).intValue;
            let offer = $(el)
                .find('.offerDescription___1A6Ew')
                .first()
                .text();
            offer = offer.charAt(0).toUpperCase() + offer.slice(1);
            if (!offer) {
                offer = 'No offer';
            }
            let linkPartial = $(el).find('header a').attr('href');
            linkPartial = String(linkPartial);
            const link = `https://www.waitrose.com${linkPartial}`;
            const imagePartial = $(el).find('picture').find('img').attr('src');
            const image = String(imagePartial);
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
        throw new Error(`*** An error occured with waitroseScraper: ${error}`);
    }
});
