const argH = NoxLib.MacroHandlers.argHandler;
const dataH = NoxLib.Utilities.DataHelper;


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
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listIncludes] Input is not a list.');
        return '';
    }

    const parse_search_element = argH.stBoolCoercion(rawParse);
    const search_element = parse_search_element
        ? argH.parse(rawSearch)
        : rawSearch;

    const is_json = search_element != null && typeof search_element === 'object';
    const is_array = is_json && Array.isArray(search_element);

    if (is_json && is_array) {

        return String(
            list.some(
                item =>
                    Array.isArray(item) &&
                    dataH.arrayEquality(item, search_element)
            )
        );
    }
    else if (is_json) {

        return String(
            list.some(
                item =>
                    dataH.deepEquality(item, search_element)
            )
        );
    }
    else {

        return String(list.includes(search_element));
    }
}


export {
    listIncludesHandler
};
