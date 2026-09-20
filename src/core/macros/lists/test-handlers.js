const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Macro handler for checking if a list includes an item.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified value.
 */
function listIncludesHandler({unnamedArgs: [rawList, rawSearch, rawParse]}) {
    const parse_search_element = argH.stBoolCoercion(rawParse);
    const search_element = parse_search_element
        ? argH.parse(rawSearch)
        : rawSearch;
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listIncludes] Input is not a list.');
        return '';
    }

    return String(list.includes(search_element));
}

export {
    listIncludesHandler
};
