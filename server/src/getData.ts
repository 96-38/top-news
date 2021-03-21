import { getAsahi } from './getAsahi';
import { getYahoo } from './getYahoo';
import { getNhk } from './getNhk';
import { getLivedoor } from './getLivedoor';
import { getExcite } from './getExcite';
import { getMainichi } from './getMainichi';
import { getNikkei } from './getNikkei';
import { getSankei } from './getSankei';
import { getYomiuri } from './getYomiuri';
import { getHokkoku } from './getHokkoku';

(async () => {
  await getAsahi();
  await getYahoo();
  await getNhk();
  await getLivedoor();
  await getExcite();
  await getMainichi();
  await getNikkei();
  await getSankei();
  await getYomiuri();
  await getHokkoku();
})();
