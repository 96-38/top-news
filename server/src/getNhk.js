import puppeteer from 'puppeteer';
import { getElms } from './getElms.js';

export const getNhk = (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //block css,resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
          'texttrack',
          'eventsource',
          'websocket',
          'manifest',
          'fetch',
          'media',
          'stylesheet',
          'font',
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '.content--list li em';
    const anchorSelector = '.content--list li dd > a ';
    const imgSelector = '.content--list > li > dl > dt > a > img ';
    const url = 'https://www3.nhk.or.jp/news/';
    const newsArray = await getElms(
      page,
      url,
      titleSelector,
      anchorSelector,
      imgSelector
    );
    await browser.close();
    await res.json(newsArray);
    console.log('Took', Date.now() - start, 'ms');
  })();
};
