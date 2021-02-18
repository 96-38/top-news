import puppeteer from 'puppeteer';
import { getElms } from './getElms.js';

export const getLivedoor = (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //block resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        ['media', 'script', 'image', 'stylesheet', 'font'].includes(
          request.resourceType()
        )
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '.topTopicsList > .topicsList > li > a ';
    const anchorSelector = '.topTopicsList > .topicsList > li > a';
    const url = 'https://news.livedoor.com/';
    const newsArray = await getElms(page, url, titleSelector, anchorSelector);

    await browser.close();

    await res.json(newsArray);
    console.log('Took', Date.now() - start, 'ms');
  })();
};
