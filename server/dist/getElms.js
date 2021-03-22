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
exports.getElms = void 0;
const getElms = (page, url, titleSelector, linkSelector, imgSelector) => __awaiter(void 0, void 0, void 0, function* () {
    page.on('console', (msg) => {
        for (let i = 0; i < msg._args.length; ++i)
            console.log(`${i}: ${msg._args[i]}`);
    });
    yield page.goto(url);
    return yield page.evaluate((titleSelector, linkSelector, imgSelector) => {
        const getElm = (targetArray, targetElement) => {
            const result = [];
            targetArray.forEach((elm) => {
                let item = {
                    [targetElement]: elm[targetElement],
                };
                result.push(item);
            });
            return result;
        };
        const list = document.querySelectorAll(titleSelector);
        const titles = getElm(list, 'textContent');
        const anchor = document.querySelectorAll(linkSelector);
        const links = getElm(anchor, 'href');
        const img = document.querySelectorAll(imgSelector);
        const src = getElm(img, 'src');
        const data = [];
        for (let index = 0; index < titles.length; index++) {
            let item = Object.assign(Object.assign(Object.assign({}, titles[index]), links[index]), src[index]);
            data.push(item);
        }
        const uniqueData = [...new Set(data.map(JSON.stringify))].map(JSON.parse);
        return uniqueData;
    }, titleSelector, linkSelector, imgSelector);
});
exports.getElms = getElms;
//# sourceMappingURL=getElms.js.map