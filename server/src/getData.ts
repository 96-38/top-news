import { getAsahi } from './getAsahi';
import { getYahoo } from './getYahoo';
import { getNhk } from './getNhk';
import { getLivedoor } from './getLivedoor';

(() => {
  getAsahi();
  getYahoo();
  getNhk();
  getLivedoor();
})();
