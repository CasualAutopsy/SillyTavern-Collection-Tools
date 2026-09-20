import mutMacros from './mut-macros.js';
import transMacros from './trans-macros.js';
import searchMacros from './search-macros.js';
import testMacros from './test-macros.js';

async function initListMacros() {
    mutMacros();
    transMacros();
    searchMacros();
    testMacros();
}

export default initListMacros;
