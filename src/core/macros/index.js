import lists from './lists/index.js';
import dicts from './dicts/index.js';
import collections from './collections/index.js';

async function initMacros() {
    lists();
    dicts();
    collections();
}

export default initMacros;
