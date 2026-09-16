const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Macro handler for getting an item from a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified value.
 */
function listAtHandler({unnamedArgs: [rawList, rawIndex]}) {
    const index = argH.parse(rawIndex, 'int');
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listAt] The input is not a list.');
        return '';
    }

    return typeof list[index] === 'object'
        ? JSON.stringify(list[index])
        : String(list[index]);
}

/**
 * Macro handler for getting the index
 * of the first occurrence of an item from a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified value.
 */
function listIndexOfHandler({unnamedArgs: [rawList, rawSearch, rawParse]}) {
    const parse_search_element = argH.stBoolCoercion(rawParse);
    const search_element = parse_search_element
        ? argH.parse(rawSearch)
        : rawSearch;
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listIndexOf] The input is not a list.');
        return '';
    }

    return String(list.indexOf(search_element));
}

/**
 * Macro handler for getting the index
 * of the last occurrence of an item from a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified value.
 */
function listLastIndexOfHandler({unnamedArgs: [rawList, rawSearch, rawParse]}) {
    const parse_search_element = argH.stBoolCoercion(rawParse);
    const search_element = parse_search_element
        ? argH.parse(rawSearch)
        : rawSearch;
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listLastIndexOf] The input is not a list.');
        return '';
    }

    return String(list.lastIndexOf(search_element));
}

export {
    listAtHandler,
    listIndexOfHandler, listLastIndexOfHandler
};
