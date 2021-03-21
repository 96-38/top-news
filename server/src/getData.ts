import { getAsahi } from './getAsahi';
import { getYahoo } from './getYahoo';
import { getNhk } from './getNhk';
import { getLivedoor } from './getLivedoor';
import { getExcite } from './getExcite';

(() => {
  getAsahi();
  getYahoo();
  getNhk();
  getLivedoor();
  getExcite();
})();
