import puppeteer from 'puppeteer';
import { getElms } from './getElms.js';

export const getMainichi = (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // block css,font
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
          'stylesheet',
          'font',
          'media',
          'script',
          'xhr',
          'fetch',
          'websocket',
          'eventsource',
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector =
      '[data-cx-area="top-selection"] .toppickup-detail > .toppickup-title.mb-10';
    const titleSelector2 =
      '[data-cx-area="top-selection"] ul.toppickuplist > li h3';
    const anchorSelector = '[data-cx-area="top-selection"] .toppickup a';
    const anchorSelector2 =
      '[data-cx-area="top-selection"] ul.toppickuplist > li a';
    const url = 'https://mainichi.jp/';
    const newsArray = await getElms(page, url, titleSelector, anchorSelector);
    const newsArray2 = await getElms(
      page,
      url,
      titleSelector2,
      anchorSelector2
    );
    const newsArray3 = [...newsArray, ...newsArray2];
    // newsArray3.length = 7;

    await res.json(newsArray3);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
};
