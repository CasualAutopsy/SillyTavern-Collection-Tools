const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Macro handler for creating a list of keys
 * from a dictionary.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified list of keys.
 */
function getKeysHandler({unnamedArgs: [rawDict]}) {
    const dict = argH.parseVar(rawDict, 'json');

    return JSON.stringify(Object.keys(dict));
}

/**
 * Macro handler for creating a list of values
 * from a dictionary.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified list of values.
 */
function getValuesHandler({unnamedArgs: [rawDict]}) {
    const dict = argH.parseVar(rawDict, 'json');

    return JSON.stringify(Object.values(dict));
}

/**
 * Macro handler for creating a list of key/value
 * entries from a dictionary.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified list of entries.
 */
function getEntriesHandler({unnamedArgs: [rawDict]}) {
    const dict = argH.parseVar(rawDict, 'json');

    return JSON.stringify(Object.entries(dict));
}

export {
    getKeysHandler, getValuesHandler, getEntriesHandler
};
