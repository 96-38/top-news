import express from 'express';
import { getYahoo } from './getYahoo';
import { getNhk } from './getNhk';
import { getLivedoor } from './getLivedoor';
import { getExcite } from './getExcite';
import { getMainichi } from './getMainichi';
import { getNikkei } from './getNikkei';
import { getSankei } from './getSankei';
import { getAsahi } from './getAsahi';
import { getYomiuri } from './getYomiuri';
import { getHokkoku } from './getHokkoku';

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
