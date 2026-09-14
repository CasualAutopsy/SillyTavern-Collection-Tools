import slashes from './cmds/index.js';
import macros from './macros/index.js';

async function initCollectionTools() {
    slashes();
    macros();
}

initCollectionTools();
