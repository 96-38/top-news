import puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Redis from 'ioredis';
import { getElms } from './getElms';

export const getYomiuri = async () => {
  //measure time
  const start = Date.now();
  //dayjs
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const now = dayjs().tz('Asia/Tokyo').format('YYYY/MM/DD_HH:mm:ss');
  console.log(`get Yomiuri at ${now}`);

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
        'image',
      ].includes(request.resourceType())
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });

  //各カテゴリのトップニュースを取得
  const titleSelector = '.home-2020-prime-topnews > h3 > a';
  const anchorSelector = '.home-2020-prime-topnews > h3 > a';
  const url = 'https://www.yomiuri.co.jp/';
  const newsArray = await getElms(page, url, titleSelector, anchorSelector);

  //store json to redis
  const redis = new Redis(process.env.REDIS_URL);
  await redis.set('yomiuri', JSON.stringify(newsArray));

  await browser.close();
  redis.disconnect();
  console.log('Took', Date.now() - start, 'ms (yomiuri)');
};
