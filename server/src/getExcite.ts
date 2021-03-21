import puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Redis from 'ioredis';
import { getElms } from './getElms';

export const getExcite = async () => {
  //measure time
  const start = Date.now();
  //dayjs
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const now = dayjs().tz('Asia/Tokyo').format('YYYY/MM/DD_HH:mm:ss');
  console.log(`get Excite at ${now}`);

  const launchConfig = {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  const browser = await puppeteer.launch(launchConfig);
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

  const titleSelector = 'headline > ul > li > a > span';
  const anchorSelector = 'headline > ul > li > a ';
  const url = 'https://www.excite.co.jp/';
  const newsArray = await getElms(page, url, titleSelector, anchorSelector);

  newsArray.length = 10;

  //store json to redis
  const redis = new Redis(process.env.REDIS_URL);
  await redis.set('excite', JSON.stringify(newsArray));

  await browser.close();
  redis.disconnect();
  console.log('Took', Date.now() - start, 'ms (excite)');
};
