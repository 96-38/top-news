import puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Redis from 'ioredis';
import { getElms } from './getElms';

export const getYahoo = async () => {
  //measure time
  const start = Date.now();
  //dayjs
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const now = dayjs().tz('Asia/Tokyo').format('YYYY/MM/DD_HH:mm:ss');
  console.log(`get Yahoo at ${now}`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //block resource
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

  const titleSelector = '.topics li';
  const anchorSelector = '.topics li a ';
  const url = 'https://news.yahoo.co.jp/';
  const newsArray = await getElms(page, url, titleSelector, anchorSelector);

  //store json to redis
  const redis = new Redis(process.env.REDIS_URL);
  await redis.set('yahoo', JSON.stringify(newsArray));

  await browser.close();
  redis.disconnect();
  console.log('Took', Date.now() - start, 'ms (yahoo)');
};
