import puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Redis from 'ioredis';
import { getElmsSrcset } from './getElmsSrcset';

export const getNikkei = async () => {
  //measure time
  const start = Date.now();
  //dayjs
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const now = dayjs().tz('Asia/Tokyo').format('YYYY/MM/DD_HH:mm:ss');
  console.log(`get Nikkei at ${now}`);

  const launchConfig = {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  const browser = await puppeteer.launch(launchConfig);
  const page = await browser.newPage();

  //block resource
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (
      ['font', 'media', 'xhr', 'fetch', 'websocket', 'eventsource'].includes(
        request.resourceType()
      )
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });

  const titleSelector = '.k-card__title';
  const anchorSelector = '.k-card__title-link';
  const imgSelector = '.k-picture__content > source[media="(min-width: 0px)"]';
  const url = 'https://www.nikkei.com/';
  const newsArray = await getElmsSrcset(
    page,
    url,
    titleSelector,
    anchorSelector,
    imgSelector
  );
  newsArray.length = 7;

  //store json to redis
  const redis = new Redis(process.env.REDIS_URL);
  await redis.set('nikkei', JSON.stringify(newsArray));

  await browser.close();
  redis.disconnect();
  console.log('Took', Date.now() - start, 'ms (nikkei)');
};
