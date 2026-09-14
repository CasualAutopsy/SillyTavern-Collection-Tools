const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Macro handler for turning a list of key/value
 * entries into a dictionary
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified dictionary.
 */
function fromEntriesHandler({unnamedArgs: [rawEntries], list: rawList}) {
    const entries = rawEntries !== ''
        ? argH.parseVar(rawEntries, 'json')
        : rawEntries;

    if (entries && Array.isArray(entries)) {
        return JSON.stringify(Object.fromEntries(entries));
    } else if (entries && !Array.isArray(entries)) {
        console.error('[Collection Tools | dictFromEntries] Input is not a valid key/values entries list.');
        return '';
    } else {
        if (!rawList || (rawList.length % 2) !== 0) {
            console.error('[Collection Tools | dictFromEntries] Input is not a valid key/values entries list.');
            return '';
        }

        const split_list = rawList != null
            ? argH.splitList(rawList, 2)
            : rawList;

        const values = split_list[1].map((val) => {
            return argH.parseVar(val);
        })


        /** @type {Iterable<readonly [PropertyKey, any]>} */
        const list = argH.zipList(split_list[0], values);

        return JSON.stringify(Object.fromEntries(list));
    }
}

export { fromEntriesHandler };
