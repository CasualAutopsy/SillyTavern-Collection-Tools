import enumMacros from './enum-macros.js';
import mutMacros from './mut-macros.js';
import searchMacros from './search-macros.js';
import testMacros from './test-macros.js';
import transMacros from './trans-macros.js';

async function initListMacros() {
    enumMacros();
    mutMacros();
    searchMacros();
    testMacros();
    transMacros();
}

export default initListMacros;
