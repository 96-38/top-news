import puppeteer from 'puppeteer';
import { getElms } from './getElms';

export const getAsahi = (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //block resource
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

    const titleSelector = '.c-articleModule__title';
    const anchorSelector = '.c-articleModule__title > a';
    const imgSelector = '.c-articleModule__image > a > img';
    const url = 'https://www.asahi.com/';
    const newsArray = await getElms(
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
