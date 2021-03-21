import puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Redis from 'ioredis';
import { getElms } from './getElms';

export const getHokkoku = async () => {
  //measure time
  const start = Date.now();
  //dayjs
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const now = dayjs().tz('Asia/Tokyo').format('YYYY/MM/DD_HH:mm:ss');
  console.log(`get Hokkoku at ${now}`);

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

  const titleSelector = '.top-news-list__item .top-news-list__title';
  const anchorSelector = '.top-news-list__item > a';
  const imgSelector = '.top-news-img-slider__item > img'; //ブラウザのconsoleでは取得できるが、なぜかうまく取得できない
  const url = 'https://www.hokkoku.co.jp/';
  const newsArray = await getElms(page, url, titleSelector, anchorSelector);

  newsArray.length = 8;

  //store json to redis
  const redis = new Redis(process.env.REDIS_URL);
  await redis.set('hokkoku', JSON.stringify(newsArray));

  await browser.close();
  redis.disconnect();
  console.log('Took', Date.now() - start, 'ms (hokkoku)');
};
