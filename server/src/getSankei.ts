import puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Redis from 'ioredis';
import { getElms } from './getElms';

export const getSankei = async () => {
  //measure time
  const start = Date.now();
  //dayjs
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const now = dayjs().tz('Asia/Tokyo').format('YYYY/MM/DD_HH:mm:ss');
  console.log(`get Sankei at ${now}`);

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

  //store json to redis
  const redis = new Redis(process.env.REDIS_URL);
  await redis.set('sankei', JSON.stringify(newsArray));

  await browser.close();
  redis.disconnect();
  console.log('Took', Date.now() - start, 'ms (sankei)');
};
