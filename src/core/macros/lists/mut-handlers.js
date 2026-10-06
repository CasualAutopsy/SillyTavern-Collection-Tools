const argH = NoxLib.MacroHandlers.argHandler;

const typeErrMarker = '\u0000\u001FTYPE_ERROR\u001F\u0000'

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
function listPushHandler({unnamedArgs: [rawList, rawReturnLength], list: rawVals}) {
    const {var: list, setVar: mutate} = argH.parseMut(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listPush] First input is not a list.');
        return '';
    }

    if (rawVals == null || rawVals.length == 0) {
        console.error('[Collection Tools | listPush] Expected at least 2 arguments, but got 1.');
        return '';
    }

    const return_length = argH.stBoolCoercion(rawReturnLength);

    rawVals.forEach((val) => {
        list.push(argH.parse(val));
    });

    mutate(list);

    if (return_length) {
        return String(list.length);
    } else {
        return JSON.stringify(list);
    }
}

/**
 * Macro handler for popping an item from a list.
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

    return typeof popped === 'string'
        ? popped
        : typeof popped === 'object'
            ? JSON.stringify(popped)
            : String(popped);
}

/**
 * Macro handler for unshifting items to a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified length.
 */
function listUnshiftHandler({unnamedArgs: [rawList, rawReturnLength], list: rawVals}) {
    const {var: list, setVar: mutate} = argH.parseMut(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listUnshift] First input is not a list.');
        return '';
    }

    if (rawVals == null || rawVals.length == 0) {
        console.error('[Collection Tools | listUnshift] Expected at least 2 arguments, but got 1.');
        return '';
    }

    const return_length = argH.stBoolCoercion(rawReturnLength);

    rawVals.forEach((val) => {
        list.unshift(argH.parse(val));
    });

    mutate(list);

    if (return_length) {
        return String(list.length);
    } else {
        return JSON.stringify(list);
    }
}

/**
 * Macro handler for shifting items from a list.
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

    return typeof shifted === 'string'
        ? shifted
        : typeof shifted === 'object'
            ? JSON.stringify(shifted)
            : String(shifted);
}

/**
 * Macro handler for splicing a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified list of removed items.
 */
function listSpliceHandler({unnamedArgs: [rawList, rawStart, rawDeleteCount, rawInsert]}) {
    const {var: list, setVar: mutate} = argH.parseMut(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listSplice] The input is not a list.');
        return '';
    }

    const
        start = argH.parse(rawStart, 'int'),
        delete_count = rawDeleteCount != ''
            ? argH.parse(rawDeleteCount, 'int')
            : undefined;

    if (!Number.isInteger(start)) {
        console.error('[Collection Tools | listSplice] The start index is not an integer.');
        return '';
    }
    if (!Number.isInteger(delete_count) && delete_count != null) {
        console.error('[Collection Tools | listSplice] The delete count is not an integer.');
        return '';
    }

    /** @type {Object|any[]|undefined} */
    let insert;
    try {
        insert = rawInsert
            ? argH.parse(rawInsert, 'json')
            : undefined;
    } catch {}

    if (typeof insert !== 'undefined' && !Array.isArray(insert)) {
        console.error('[Collection Tools | listSplice] Insert is not a list.');
        return '';
    }

    if (insert != null && Array.isArray(insert) && delete_count != null) {
        list.splice(start, delete_count, ...insert);
    } else {
        list.splice(start, delete_count);
    }

    mutate(list);

    return JSON.stringify(list);
}

/**
 * Macro handler for filling a list with a value.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified filled list.
 */
function listFillHandler({unnamedArgs: [rawList, rawVal], list: rawIndices}) {
    const {var: list, setVar: mutate} = argH.parseMut(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listFill] The input is not a list.');
        return '';
    }

    const fill_val = argH.parse(rawVal);

    if (fill_val === undefined) {
        console.error('[Collection Tools | listFill] The fill value is undefined.');
        return '';
    }

    const
        start = rawIndices?.[0] != null
            ? argH.parse(rawIndices[0], 'int')
            : undefined,
        end = rawIndices?.[1] != null
            ? argH.parse(rawIndices[1], 'int')
            : undefined;

    if (!Number.isInteger(start) && start != null) {
        console.error('[Collection Tools | listFill] The start index is not an integer.');
        return '';
    }
    if (!Number.isInteger(end) && end != null) {
        console.error('[Collection Tools | listFill] The end index is not an integer.');
        return '';
    }

    list.fill(fill_val, start, end);

    mutate(list);

    return JSON.stringify(list);
}

/**
 * Macro handler for copying within a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified copied within list.
 */
function listCopyWithinHandler({unnamedArgs: [rawList], list: rawIndices}) {
    const {var: list, setVar: mutate} = argH.parseMut(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listCopyWithin] The input is not a list.');
        return '';
    }

    if (rawIndices == null || rawIndices.length < 2) {
        const e_length = rawIndices != null
            ? 2
            : 1;

        console.error(`[Collection Tools | listCopyWithin] Expected at least 3 arguments, but got ${e_length}.`);
        return '';
    }

    const
        target = argH.parse(rawIndices[0], 'int'),
        start = argH.parse(rawIndices[1], 'int'),
        end = rawIndices?.[2] != null
            ? argH.parse(rawIndices[2], 'int')
            : undefined;

    if (!Number.isInteger(target)) {
        console.error('[Collection Tools | listCopyWithin] The target index is not an integer.');
        return '';
    }
    if (!Number.isInteger(start)) {
        console.error('[Collection Tools | listCopyWithin] The start index is not an integer.');
        return '';
    }
    if (!Number.isInteger(end) && end != null) {
        console.error('[Collection Tools | listCopyWithin] The end index is not an integer.');
        return '';
    }

    list.copyWithin(target, start, end);

    mutate(list);

    return JSON.stringify(list);
}

/**
 * Macro handler for sorting a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified sorted list.
 */
function listSortHandler({unnamedArgs: [rawList]}) {
    const {var: list, setVar: mutate} = argH.parseMut(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listSort] The input is not a list.');
        return '';
    }

    list.sort();

    mutate(list);

    return JSON.stringify(list);
}

/**
 * Macro handler for reversing a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified reversed list.
 */
function listReverseHandler({unnamedArgs: [rawList]}) {
    const {var: list, setVar: mutate} = argH.parseMut(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listReverse] The input is not a list.');
        return '';
    }

    list.reverse();

    mutate(list);

    return JSON.stringify(list);
}


export {
    listPushHandler, listPopHandler,
    listUnshiftHandler, listShiftHandler,
    listSpliceHandler,
    listFillHandler, listCopyWithinHandler,
    listSortHandler, listReverseHandler,
};
