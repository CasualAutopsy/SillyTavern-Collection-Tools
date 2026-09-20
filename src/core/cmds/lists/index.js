import enumCmds from './enum-cmds.js';
import mutCmds from './mut-cmds.js';
import searchCmds from './search-cmds.js';
import testCmds from './test-cmds.js';
import transCmds from './trans-cmds.js';

async function initListSlashCMDs() {
    enumCmds();
    mutCmds();
    searchCmds();
    testCmds();
    transCmds();
}

export default initListSlashCMDs;
