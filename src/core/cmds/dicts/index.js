import enumCmds from './enum-cmds.js';
import mutCmds from './mut-cmds.js';
import testCmds from './test-cmds.js';
import transCmds from './trans-cmds.js';

async function initDictSlashCMDs() {
    enumCmds();
    mutCmds();
    testCmds();
    transCmds();
}

export default initDictSlashCMDs;
