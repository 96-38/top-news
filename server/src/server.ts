import express from 'express';
import path from 'path';
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
app.use(express.static(path.join(__dirname, '../../client/build')));
const port = process.env.PORT || 8080;

//Yahoo News
app.get('/api/yahoo', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('yahoo');
  await res.json(JSON.parse(data!));
  console.log('took yahoo from redis at ' + currentTime);
});

//NHK News
app.get('/api/nhk', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('nhk');
  await res.json(JSON.parse(data!));
  console.log('took nhk from redis at ' + currentTime);
});

//Livedoor News
app.get('/api/livedoor', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('livedoor');
  await res.json(JSON.parse(data!));
  console.log('took livedoor from redis at ' + currentTime);
});

//excite News
app.get('/api/excite', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('excite');
  await res.json(JSON.parse(data!));
  console.log('took excite from redis at ' + currentTime);
});

// mainichi
app.get('/api/mainichi', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('mainichi');
  await res.json(JSON.parse(data!));
  console.log('took mainichi from redis at ' + currentTime);
});

// nikkei
app.get('/api/nikkei', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('nikkei');
  await res.json(JSON.parse(data!));
  console.log('took nikkei from redis at ' + currentTime);
});

// sankei
app.get('/api/sankei', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('sankei');
  await res.json(JSON.parse(data!));
  console.log('took sankei from redis at ' + currentTime);
});

// asahi
app.get('/api/asahi', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('asahi');
  await res.json(JSON.parse(data!));
  console.log('took asahi from redis at ' + currentTime);
});

// yomiuri
app.get('/api/yomiuri', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('yomiuri');
  await res.json(JSON.parse(data!));
  console.log('took yomiuri from redis at ' + currentTime);
});

// hokkoku
app.get('/api/hokkoku', async (req, res) => {
  const currentTime = dayjs().tz('Asia/Tokyo').format('HH:mm:ss');
  const data = await redis.get('hokkoku');
  await res.json(JSON.parse(data!));
  console.log('took hokkoku from redis at ' + currentTime);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

//listen port
app.listen(port, () => {
  console.log(`running on PORT ${port}`);
});
