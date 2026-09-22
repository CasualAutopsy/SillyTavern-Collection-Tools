const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Macro handler for getting the index keys of a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified index.
 */
function listIndexHandler({unnamedArgs: [rawList]}) {
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listIndex] Input is not a list.');
        return '';
    }

    return JSON.stringify(list.keys());
}

/**
 * Macro handler for getting the zipped indices and values of a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified index.
 */
function listEntriesHandler({unnamedArgs: [rawList]}) {
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listEntries] Input is not a list.');
        return '';
    }

    return JSON.stringify(list.entries());
}

export {
    listIndexHandler, listEntriesHandler
};
