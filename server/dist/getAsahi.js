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
exports.getAsahi = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const getElms_1 = require("./getElms");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const ioredis_1 = __importDefault(require("ioredis"));
const getAsahi = () => __awaiter(void 0, void 0, void 0, function* () {
    const start = Date.now();
    dayjs_1.default.extend(utc_1.default);
    dayjs_1.default.extend(timezone_1.default);
    const now = dayjs_1.default().tz('Asia/Tokyo').format('YYYY/MM/DD_HH:mm:ss');
    console.log(`get Asahi at ${now}`);
    const launchConfig = {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };
    const browser = yield puppeteer_1.default.launch(launchConfig);
    const page = yield browser.newPage();
    yield page.setRequestInterception(true);
    page.on('request', (request) => {
        if ([
            'font',
            'media',
            'xhr',
            'fetch',
            'websocket',
            'eventsource',
            'script',
            'stylesheet',
            'texttrack',
            'image',
        ].includes(request.resourceType())) {
            request.abort();
        }
        else {
            request.continue();
        }
    });
    const titleSelector = '.c-articleModule__title';
    const anchorSelector = '.c-articleModule__title > a';
    const imgSelector = '.c-articleModule__image > a > img';
    const url = 'https://www.asahi.com/';
    const newsArray = yield getElms_1.getElms(page, url, titleSelector, anchorSelector, imgSelector);
    newsArray.length = 7;
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    yield redis.set('asahi', JSON.stringify(newsArray));
    yield browser.close();
    redis.disconnect();
    console.log('Took', Date.now() - start, 'ms (asahi)');
});
exports.getAsahi = getAsahi;
//# sourceMappingURL=getAsahi.js.map