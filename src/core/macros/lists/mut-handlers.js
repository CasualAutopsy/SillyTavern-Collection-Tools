const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Macro handler for pushing items to a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified length.
 */
function listPushHandler({unnamedArgs: [rawList], list: rawVals}) {
    const {var: list, setVar: mutate} = argH.parseMut(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listPush] First input is not a list.');
        return '';
    }

    if (rawVals.length == 0) {
        console.error('[Collection Tools | listPush] Expected at least 2 arguments, but got 1.');
        return '';
    }

    rawVals.forEach((val) => {
        list.push(argH.parse(val));
    });

    mutate(list);

    return String(list.length);
}

/**
 * Macro handler for popping an item from a list
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified popped value.
 */
function listPopHandler({unnamedArgs: [rawList]}) {
    const {var: list, setVar: mutate} = argH.parseMut(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listPop] The input is not a list.');
        return '';
    }

    if (list.length == 0) {
        console.error('[Collection Tools | listPop] The list is empty.');
        return '';
    }

    const popped = list.pop();

    mutate(list);

    return String(popped);
}

/**
 * Macro handler for unshifting items to a list
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified length.
 */
function listUnshiftHandler({unnamedArgs: [rawList], list: rawVals}) {
    const {var: list, setVar: mutate} = argH.parseMut(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listUnshift] First input is not a list.');
        return '';
    }

    if (rawVals.length == 0) {
        console.error('[Collection Tools | listUnshift] Expected at least 2 arguments, but got 1.');
        return '';
    }

    rawVals.forEach((val) => {
        list.unshift(argH.parse(val));
    });

    mutate(list);

    return String(list.length);
}

/**
 * Macro handler for shifting items from a list
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified shifted value.
 */
function listShiftHandler({unnamedArgs: [rawList]}) {
    const {var: list, setVar: mutate} = argH.parseMut(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listShift] The input is not a list.');
        return '';
    }

    if (list.length == 0) {
        console.error('[Collection Tools | listShift] The list is empty.');
        return '';
    }

    const shifted = list.shift();

    mutate(list);

    return String(shifted);
}

export {
    listPushHandler, listPopHandler,
    listUnshiftHandler, listShiftHandler
};
