import puppeteer from 'puppeteer';
import { getElms } from './getElms';

export const getSankei = (req, res) => {
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
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '[data-tb-region="top"] .entry_title';
    const anchorSelector = '[data-tb-region="top"] .entry_title > a';
    const imgSelector = '[data-tb-region="top"]  .entry_img > figure > img';
    const url = 'https://www.sankei.com/';
    const newsArray = await getElms(
      page,
      url,
      titleSelector,
      anchorSelector,
      imgSelector
    );

    await res.json(newsArray);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
};
