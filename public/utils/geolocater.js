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
const apiKey = process.env.MAPBOX_API_KEY;
const getLongLatFromPostcode = (postcode) => __awaiter(void 0, void 0, void 0, function* () {
    const urlPostcode = `https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?&access_token=${apiKey}&limit=1`;
    try {
        const { data } = yield axios_1.default.get(urlPostcode);
        return data.features[0].center.toString();
    }
    catch (error) {
        throw new Error(`*** An error occured in getLongLatFromPostcode: ${error} ***`);
    }
});
const getSupermarketList = (longlat) => __awaiter(void 0, void 0, void 0, function* () {
    const urlSupermarkets = `https://api.mapbox.com/geocoding/v5/mapbox.places/supermarket.json?proximity=${longlat}&access_token=${apiKey}&limit=5`;
    try {
        const { data } = yield axios_1.default.get(urlSupermarkets);
        const supermarkets = [];
        data.features.forEach((supermarket) => {
            supermarkets.push({
                name: supermarket.text,
                address: supermarket.place_name,
            });
        });
        return supermarkets;
    }
    catch (error) {
        throw new Error(`*** An error occured in getSupermarketList: ${error} ***`);
    }
});
const getSupermarkets = (postcode) => __awaiter(void 0, void 0, void 0, function* () {
    const longlat = yield getLongLatFromPostcode(postcode);
    const supermarketsData = yield getSupermarketList(longlat);
    return supermarketsData;
});
module.exports = {
    getSupermarkets,
};
