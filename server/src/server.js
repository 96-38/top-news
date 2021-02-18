import express from 'express';
import { getYahoo } from './getYahoo.js';
import { getNhk } from './getNhk.js';
import { getLivedoor } from './getLivedoor.js';
import { getExcite } from './getExcite.js';
import { getMainichi } from './getMainichi.js';
import { getNikkei } from './getNikkei.js';
import { getSankei } from './getSankei.js';
import { getAsahi } from './getAsahi.js';
import { getYomiuri } from './getYomiuri.js';
import { getHokkoku } from './getHokkoku.js';

const app = express();

//Yahoo News
app.get('/api/yahoo', getYahoo);

//NHK News
app.get('/api/nhk', getNhk);

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
app.get('/api/asahi', getAsahi);

// yomiuri
app.get('/api/yomiuri', getYomiuri);

// hokkoku
app.get('/api/hokkoku', getHokkoku);

//listen port
app.listen(8080, () => {
  console.log('running on PORT:8080');
});
