import { getAsahi } from './getAsahi';
import { getYahoo } from './getYahoo';
import { getNhk } from './getNhk';
import { getLivedoor } from './getLivedoor';
import { getExcite } from './getExcite';
import { getMainichi } from './getMainichi';
import { getNikkei } from './getNikkei';
import { getSankei } from './getSankei';
import { getYomiuri } from './getYomiuri';

(() => {
  getAsahi();
  getYahoo();
  getNhk();
  getLivedoor();
  getExcite();
  getMainichi();
  getNikkei();
  getSankei();
  getYomiuri();
})();
