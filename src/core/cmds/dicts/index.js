import enumCmds from './enum-cmds.js';
import transCmds from './trans-cmds.js';

async function initDictSlashCMDs() {
    enumCmds();
    transCmds();
}

export default initDictSlashCMDs;
