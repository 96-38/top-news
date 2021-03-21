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
exports.getNhk = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const ioredis_1 = __importDefault(require("ioredis"));
const getElms_1 = require("./getElms");
const getNhk = () => __awaiter(void 0, void 0, void 0, function* () {
    const start = Date.now();
    dayjs_1.default.extend(utc_1.default);
    dayjs_1.default.extend(timezone_1.default);
    const now = dayjs_1.default().tz('Asia/Tokyo').format('YYYY/MM/DD_HH:mm:ss');
    console.log(`get NHK at ${now}`);
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.setRequestInterception(true);
    page.on('request', (request) => {
        if ([
            'texttrack',
            'eventsource',
            'websocket',
            'manifest',
            'fetch',
            'media',
            'stylesheet',
            'font',
        ].includes(request.resourceType())) {
            request.abort();
        }
        else {
            request.continue();
        }
    });
    const titleSelector = '.content--list li em';
    const anchorSelector = '.content--list li dd > a ';
    const imgSelector = '.content--list > li > dl > dt > a > img ';
    const url = 'https://www3.nhk.or.jp/news/';
    const newsArray = yield getElms_1.getElms(page, url, titleSelector, anchorSelector, imgSelector);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    yield redis.set('nhk', JSON.stringify(newsArray));
    yield browser.close();
    redis.disconnect();
    console.log('Took', Date.now() - start, 'ms (NHK)');
});
exports.getNhk = getNhk;
//# sourceMappingURL=getNhk.js.map