import enumCmds from './enum-cmds.js';
import searchCmds from './search-cmds.js';
import testCmds from './test-cmds.js';

async function initCollectionSlashCMDs() {
    enumCmds();
    searchCmds();
    testCmds();
}

export default initCollectionSlashCMDs;
