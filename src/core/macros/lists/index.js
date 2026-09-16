import mutMacros from './mut-macros.js';
import transMacros from './trans-macros.js';
import searchMacros from './search-macros.js';

async function initListMacros() {
    mutMacros();
    transMacros();
    searchMacros();
}

export default initListMacros;
