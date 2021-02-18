import puppeteer from 'puppeteer';
import { getElms } from './getElms.js';

export const getExcite = (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //block css,font
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
          'texttrack',
          'xhr',
          'eventsource',
          'websocket',
          'manifest',
          'fetch',
          'media',
          'script',
          'image',
          'stylesheet',
          'font',
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = 'headline > ul > li > a > span';
    const anchorSelector = 'headline > ul > li > a ';
    const url = 'https://www.excite.co.jp/';
    const newsArray = await getElms(page, url, titleSelector, anchorSelector);

    newsArray.length = 10;
    await res.json(newsArray);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
};
