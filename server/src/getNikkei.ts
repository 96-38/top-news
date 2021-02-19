import puppeteer from 'puppeteer';
import { getElmsSrcset } from './getElmsSrcset';

export const getNikkei = (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // block resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        ['font', 'media', 'xhr', 'fetch', 'websocket', 'eventsource'].includes(
          request.resourceType()
        )
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '.k-card__title';
    const anchorSelector = '.k-card__title-link';
    const imgSelector =
      '.k-picture__content > source[media="(min-width: 0px)"]';
    const url = 'https://www.nikkei.com/';
    const newsArray = await getElmsSrcset(
      page,
      url,
      titleSelector,
      anchorSelector,
      imgSelector
    );
    newsArray.length = 7;

    await res.json(newsArray);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
};
