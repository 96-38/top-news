import puppeteer from 'puppeteer';
import { getElms } from './getElms';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Redis from 'ioredis';

export const getAsahi = async () => {
  //measure time
  const start = Date.now();
  //dayjs
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const now = dayjs().tz('Asia/Tokyo').format('YYYY/MM/DD_HH:mm:ss');
  console.log(`get Asahi at ${now}`);

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

  //store json to redis
  const redis = new Redis(process.env.REDIS_URL);
  await redis.set('asahi', JSON.stringify(newsArray));

  await browser.close();
  redis.disconnect();
  console.log('Took', Date.now() - start, 'ms (asahi)');
};
