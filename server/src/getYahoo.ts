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

  // const titleSelector = '.topics li';
  const titleSelector =
    '.newsFeed_list > .newsFeed_item > .newsFeed_item_link > .newsFeed_item_text > .newsFeed_item_title';
  // const anchorSelector = '.topics li a ';
  const anchorSelector = '.newsFeed_list > .newsFeed_item > a';
  const imgSelector =
    '.newsFeed_list > .newsFeed_item > .newsFeed_item_link > .newsFeed_item_thumbnail img';
  // const url = 'https://news.yahoo.co.jp/';
  const url = 'https://news.yahoo.co.jp/topics/top-picks';
  const newsArray = await getElms(
    page,
    url,
    titleSelector,
    anchorSelector,
    imgSelector
  );

  //store json to redis
  const redis = new Redis(process.env.REDIS_URL);
  await redis.set('yahoo', JSON.stringify(newsArray));

  await browser.close();
  redis.disconnect();
  console.log('Took', Date.now() - start, 'ms (yahoo)');
};

getYahoo();
