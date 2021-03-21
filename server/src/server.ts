import express from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Redis from 'ioredis';

//dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
//redis
const redis = new Redis(process.env.REDIS_URL);

const app = express();
const port = process.env.PORT || 8080;

//Yahoo News
app.get('/api/yahoo', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('yahoo');
  res.json(JSON.parse(data!));
  console.log('took yahoo from redis at ' + currentTime);
});

//NHK News
app.get('/api/nhk', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('nhk');
  res.json(JSON.parse(data!));
  console.log('took nhk from redis at ' + currentTime);
});

//Livedoor News
app.get('/api/livedoor', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('livedoor');
  res.json(JSON.parse(data!));
  console.log('took livedoor from redis at ' + currentTime);
});

//excite News
app.get('/api/excite', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('excite');
  res.json(JSON.parse(data!));
  console.log('took excite from redis at ' + currentTime);
});

// mainichi
app.get('/api/mainichi', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('mainichi');
  res.json(JSON.parse(data!));
  console.log('took mainichi from redis at ' + currentTime);
});

// nikkei
app.get('/api/nikkei', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('nikkei');
  res.json(JSON.parse(data!));
  console.log('took nikkei from redis at ' + currentTime);
});

// sankei
app.get('/api/sankei', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('sankei');
  res.json(JSON.parse(data!));
  console.log('took sankei from redis at ' + currentTime);
});

// asahi
app.get('/api/asahi', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('asahi');
  res.json(JSON.parse(data!));
  console.log('took asahi from redis at ' + currentTime);
});

// yomiuri
app.get('/api/yomiuri', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('yomiuri');
  res.json(JSON.parse(data!));
  console.log('took yomiuri from redis at ' + currentTime);
});

// hokkoku
app.get('/api/hokkoku', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('hokkoku');
  res.json(JSON.parse(data!));
  console.log('took hokkoku from redis at ' + currentTime);
});

//listen port
app.listen(port, () => {
  console.log(`running on PORT ${port}`);
});
