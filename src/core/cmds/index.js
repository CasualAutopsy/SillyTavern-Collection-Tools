import lists from './lists/index.js';
import dicts from './dicts/index.js';
import collections from './collections/index.js';

async function initSlashCMDS() {
    lists();
    dicts();
    collections();
}

export default initSlashCMDS;
