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
        start = rawIndices[0] != null
            ? argH.parse(rawIndices[0], 'int')
            : undefined,
        end = rawIndices[1] != null
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
    let concat_lists;
    rawLists.forEach((val) => {
        const parsed_list = argH.parseVar(val, 'json');

        if (!Array.isArray(val)) {
            console.error('[Collection Tools | listConcat] One of the inputs is not a list.');
            return '';
        }

        concat_lists.push(parsed_list);
    });

    return JSON.stringify(list.concat(...lists));
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

export {
    listSliceHandler,
    listConcatHandler,
    listFlatHandler
};
