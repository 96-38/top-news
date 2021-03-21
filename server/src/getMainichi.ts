import puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Redis from 'ioredis';
import { getElms } from './getElms';

export const getMainichi = async () => {
  //measure time
  const start = Date.now();
  //dayjs
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const now = dayjs().tz('Asia/Tokyo').format('YYYY/MM/DD_HH:mm:ss');
  console.log(`get Mainichi at ${now}`);

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
  // const imgSelector = '[data-cx-area="top-selection"] .toppickup-image > img';
  // const imgSelector2 =
  //   '[data-cx-area="top-selection"] ul.toppickuplist .toppickuplist-image  > img';

  const url = 'https://mainichi.jp/';
  const newsArray = await getElms(
    page,
    url,
    titleSelector,
    anchorSelector
    // imgSelector
  );
  const newsArray2 = await getElms(
    page,
    url,
    titleSelector2,
    anchorSelector2
    // imgSelector2
  );
  const newsArray3 = [...newsArray, ...newsArray2];
  // newsArray3.length = 7;

  //store json to redis
  const redis = new Redis(process.env.REDIS_URL);
  await redis.set('mainichi', JSON.stringify(newsArray3));

  await browser.close();
  redis.disconnect();
  console.log('Took', Date.now() - start, 'ms (mainichi)');
};
