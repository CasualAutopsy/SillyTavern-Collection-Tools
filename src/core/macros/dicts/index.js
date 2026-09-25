import enumMacros from './enum-macros.js';
import mutMacros from './mut-macros.js';
import testMacros from './test-macros.js';
import transMacros from './trans-macros.js';

async function initDictMacros() {
    enumMacros();
    mutMacros();
    testMacros();
    transMacros();
}

export default initDictMacros;
