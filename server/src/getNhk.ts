import puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Redis from 'ioredis';
import { getElms } from './getElms';

export const getNhk = async () => {
  //measure time
  const start = Date.now();
  //dayjs
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const now = dayjs().tz('Asia/Tokyo').format('YYYY/MM/DD_HH:mm:ss');
  console.log(`get NHK at ${now}`);

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
        'eventsource',
        'websocket',
        'manifest',
        'fetch',
        'media',
        'stylesheet',
        'font',
      ].includes(request.resourceType())
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });

  const titleSelector = '.content--list li em';
  const titleSelector2 =
    '.content--header .content--summary .content--header-title > a > em';
  const anchorSelector = '.content--list li dd > a ';
  const anchorSelector2 =
    '.content--header .content--summary .content--header-title > a ';
  const imgSelector = '.content--list > li > dl > dt > a > img ';
  const imgSelector2 = '.content--header .content--thumb > a > img';
  const url = 'https://www3.nhk.or.jp/news/';
  const newsArray = await getElms(
    page,
    url,
    titleSelector,
    anchorSelector,
    imgSelector
  );
  const newsArray2 = await getElms(
    page,
    url,
    titleSelector2,
    anchorSelector2,
    imgSelector2
  );

  const newsArray3 = [...newsArray2, ...newsArray];

  //store json to redis
  const redis = new Redis(process.env.REDIS_URL);
  if (newsArray3.length) {
    await redis.set('nhk', JSON.stringify(newsArray3));
  }
  await browser.close();
  redis.disconnect();
  console.log('Took', Date.now() - start, 'ms (NHK)');
};
