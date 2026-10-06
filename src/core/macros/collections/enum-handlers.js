const argH = NoxLib.MacroHandlers.argHandler;


/**
 * @import {} from '../../../../global'
 */


/**
 * @typedef {import('../../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */


/**
 *
 * @param {MacroExecutionContext} param0
 */
function collEntriesCallback({unnamedArgs: [rawColl, mode]}) {
    const coll = argH.parseVar(rawColl, 'json');

    if (!Array.isArray(coll)) {
        switch (mode) {
            case "keys":
                return JSON.stringify(Object.keys(coll));
            case "values":
                return JSON.stringify(Object.values(coll));
            default:
                return JSON.stringify(Object.entries(coll));
        }
    } else {
        switch (mode) {
            case "keys":
                return JSON.stringify([...coll.keys()]);
            case "values":
                return JSON.stringify(coll);
            default:
                return JSON.stringify(coll.map((value, index) => [index, value]));
        }
    }
}


export {
    collEntriesCallback,
};
