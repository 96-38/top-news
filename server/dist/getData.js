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
Object.defineProperty(exports, "__esModule", { value: true });
const getAsahi_1 = require("./getAsahi");
const getYahoo_1 = require("./getYahoo");
const getNhk_1 = require("./getNhk");
const getLivedoor_1 = require("./getLivedoor");
const getExcite_1 = require("./getExcite");
const getMainichi_1 = require("./getMainichi");
const getNikkei_1 = require("./getNikkei");
const getSankei_1 = require("./getSankei");
const getYomiuri_1 = require("./getYomiuri");
const getHokkoku_1 = require("./getHokkoku");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield getAsahi_1.getAsahi();
    yield getYahoo_1.getYahoo();
    yield getNhk_1.getNhk();
    yield getLivedoor_1.getLivedoor();
    yield getExcite_1.getExcite();
    yield getMainichi_1.getMainichi();
    yield getNikkei_1.getNikkei();
    yield getSankei_1.getSankei();
    yield getYomiuri_1.getYomiuri();
    yield getHokkoku_1.getHokkoku();
}))();
//# sourceMappingURL=getData.js.map