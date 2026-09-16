import mutCmds from './mut-cmds.js';
import transCmds from './trans-cmds.js';
import searchCmds from './search-cmds.js';

async function initListSlashCMDs() {
    mutCmds();
    transCmds();
    searchCmds();
}

export default initListSlashCMDs;
