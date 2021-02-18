import puppeteer from 'puppeteer';
import { getElms } from './getElms.js';

export const getHokkoku = (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // block resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
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
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '.top-news-list__item .top-news-list__title';
    const anchorSelector = '.top-news-list__item > a';
    const imgSelector = '.top-news-img-slider__item > img'; //ブラウザのconsoleでは取得できるが、なぜかうまく取得できない
    const url = 'https://www.hokkoku.co.jp/';
    const newsArray = await getElms(page, url, titleSelector, anchorSelector);

    newsArray.length = 8;
    await res.json(newsArray);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
};
