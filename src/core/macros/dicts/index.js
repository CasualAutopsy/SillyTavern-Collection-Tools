import mutMacros from './mut-macros.js';
import testMacros from './test-macros.js';
import transMacros from './trans-macros.js';


async function initDictMacros() {
    mutMacros();
    testMacros();
    transMacros();
}


export default initDictMacros;
