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
const express_1 = __importDefault(require("express"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const ioredis_1 = __importDefault(require("ioredis"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
const redis = new ioredis_1.default(process.env.REDIS_URL);
const app = express_1.default();
const port = process.env.PORT || 8080;
app.get('/api/yahoo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = dayjs_1.default().tz('Asia/Tokyo').format('HH:mm:ss');
    const data = yield redis.get('yahoo');
    res.json(JSON.parse(data));
    console.log('took yahoo from redis at ' + currentTime);
}));
app.get('/api/nhk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = dayjs_1.default().tz('Asia/Tokyo').format('HH:mm:ss');
    const data = yield redis.get('nhk');
    res.json(JSON.parse(data));
    console.log('took nhk from redis at ' + currentTime);
}));
app.get('/api/livedoor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = dayjs_1.default().tz('Asia/Tokyo').format('HH:mm:ss');
    const data = yield redis.get('livedoor');
    res.json(JSON.parse(data));
    console.log('took livedoor from redis at ' + currentTime);
}));
app.get('/api/excite', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = dayjs_1.default().tz('Asia/Tokyo').format('HH:mm:ss');
    const data = yield redis.get('excite');
    res.json(JSON.parse(data));
    console.log('took excite from redis at ' + currentTime);
}));
app.get('/api/mainichi', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = dayjs_1.default().tz('Asia/Tokyo').format('HH:mm:ss');
    const data = yield redis.get('mainichi');
    res.json(JSON.parse(data));
    console.log('took mainichi from redis at ' + currentTime);
}));
app.get('/api/nikkei', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = dayjs_1.default().tz('Asia/Tokyo').format('HH:mm:ss');
    const data = yield redis.get('nikkei');
    res.json(JSON.parse(data));
    console.log('took nikkei from redis at ' + currentTime);
}));
app.get('/api/sankei', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = dayjs_1.default().tz('Asia/Tokyo').format('HH:mm:ss');
    const data = yield redis.get('sankei');
    res.json(JSON.parse(data));
    console.log('took sankei from redis at ' + currentTime);
}));
app.get('/api/asahi', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = dayjs_1.default().tz('Asia/Tokyo').format('HH:mm:ss');
    const data = yield redis.get('asahi');
    res.json(JSON.parse(data));
    console.log('took asahi from redis at ' + currentTime);
}));
app.get('/api/yomiuri', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = dayjs_1.default().tz('Asia/Tokyo').format('HH:mm:ss');
    const data = yield redis.get('yomiuri');
    res.json(JSON.parse(data));
    console.log('took yomiuri from redis at ' + currentTime);
}));
app.get('/api/hokkoku', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = dayjs_1.default().tz('Asia/Tokyo').format('HH:mm:ss');
    const data = yield redis.get('hokkoku');
    res.json(JSON.parse(data));
    console.log('took hokkoku from redis at ' + currentTime);
}));
app.listen(port, () => {
    console.log(`running on PORT ${port}`);
});
//# sourceMappingURL=server.js.map