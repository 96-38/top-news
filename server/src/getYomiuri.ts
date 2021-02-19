import puppeteer from 'puppeteer';
import { getElms } from './getElms';

export const getYomiuri = (req, res) => {
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

    const titleSelector = '.home-2020-prime-topnews > h3 > a';
    const anchorSelector = '.home-2020-prime-topnews > h3 > a';
    const url = 'https://www.yomiuri.co.jp/';
    const newsArray = await getElms(page, url, titleSelector, anchorSelector);
    await res.json(newsArray);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
};
