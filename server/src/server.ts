import express from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Redis from 'ioredis';
import { getLivedoor } from './getLivedoor';
import { getExcite } from './getExcite';
import { getMainichi } from './getMainichi';
import { getNikkei } from './getNikkei';
import { getSankei } from './getSankei';
import { getYomiuri } from './getYomiuri';
import { getHokkoku } from './getHokkoku';

//dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

//redis
const redis = new Redis(process.env.REDIS_URL);

const app = express();

//Yahoo News
app.get('/api/yahoo', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('yahoo');
  res.json(JSON.parse(data!));
  console.log('took data from redis at ' + currentTime);
});

//NHK News
app.get('/api/nhk', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('nhk');
  res.json(JSON.parse(data!));
  console.log('took data from redis at ' + currentTime);
});

//Livedoor News
app.get('/api/livedoor', getLivedoor);

//excite News
app.get('/api/excite', getExcite);

// mainichi
app.get('/api/mainichi', getMainichi);

// nikkei
app.get('/api/nikkei', getNikkei);

// sankei
app.get('/api/sankei', getSankei);

// asahi
app.get('/api/asahi', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('asahi');
  res.json(JSON.parse(data!));
  console.log('took data from redis at ' + currentTime);
});

// yomiuri
app.get('/api/yomiuri', getYomiuri);

// hokkoku
app.get('/api/hokkoku', getHokkoku);

//listen port
app.listen(8080, () => {
  console.log('running on PORT:8080');
});
