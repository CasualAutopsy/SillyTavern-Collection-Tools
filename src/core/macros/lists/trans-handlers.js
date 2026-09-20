const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Macro handler for slicing a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified sliced list.
 */
function listSliceHandler({unnamedArgs: [rawList], list: rawIndices}) {
    const
        start = rawIndices?.[0] != null
            ? argH.parse(rawIndices[0], 'int')
            : undefined,
        end = rawIndices?.[1] != null
            ? argH.parse(rawIndices[1], 'int')
            : undefined;
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listSlice] The input is not a list.');
        return '';
    }

    return JSON.stringify(list.slice(start, end));
}

/**
 * Macro handler for concatenating lists.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified concatenated list.
 */
function listConcatHandler({unnamedArgs: [rawList], list: rawLists}) {
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listConcat] First input is not a list.');
        return '';
    }

    /** @type {any[]} */
    let concat_lists = [];
    let error_trip = false;
    for (const val of rawLists) {
        const parsed_list = argH.parseVar(val, 'json');

        if (!Array.isArray(parsed_list)) {
            error_trip = true;
            break;
        }

        concat_lists.push(parsed_list);
    }

    if (error_trip) {
        console.error('[Collection Tools | listConcat] One of the inputs is not a list.');
        return '';
    }

    return JSON.stringify(list.concat(...concat_lists));
}

/**
 * Macro handler for flattening a list.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified flattened list.
 */
function listFlatHandler({unnamedArgs: [rawList, rawDepth]}) {
    const depth = argH.parse(rawDepth, 'int');
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listFlat] Input is not a list.');
        return '';
    }

    return JSON.stringify(list.flat(depth));
}

/**
 * Macro handler for splicing a list immutably.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified list.
 */
function listToSpliceHandler({unnamedArgs: [rawList, rawStart, rawDeleteCount, rawInsert]}) {
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listSplice] The input is not a list.');
        return '';
    }

    const
        start = argH.parse(rawStart, 'int'),
        delete_count = rawDeleteCount != ''
            ? argH.parse(rawDeleteCount, 'int')
            : undefined;

    /** @type {Object|any[]|undefined} */
    let insert = undefined;
    try {
        insert = argH.parse(rawInsert, 'json');
    } catch {
        // Skip using insert if it's not valid JSON
    }

    if (insert != null && Array.isArray(insert) && delete_count != null) {
        return JSON.stringify(list.toSpliced(start, delete_count, ...insert));
    } else {
        return JSON.stringify(list.toSpliced(start, delete_count));
    }
}

/**
 * Macro handler for sorting a list immutably.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified sorted list.
 */
function listToSortHandler({unnamedArgs: [rawList]}) {
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listSort] Input is not a list.');
        return '';
    }

    return JSON.stringify(list.toSorted());
}

/**
 * Macro handler for reversing a list immutably.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified reversed list.
 */
function listToReverseHandler({unnamedArgs: [rawList]}) {
    const list = argH.parseVar(rawList, 'json');

    if (!Array.isArray(list)) {
        console.error('[Collection Tools | listReverse] Input is not a list.');
        return '';
    }

    return JSON.stringify(list.toReversed());
}

export {
    listSliceHandler,
    listConcatHandler,
    listFlatHandler,
    listToSpliceHandler,
    listToSortHandler, listToReverseHandler
};
