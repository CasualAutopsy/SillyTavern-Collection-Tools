const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Macro handler for checking if a dictionary has a key.
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - Whether the dictionary has the key.
 */
function dictHasOwnHandler({unnamedArgs: [rawSearch, rawFind]}) {
    const search = argH.parseVar(rawSearch, 'json');
    const find = argH.parseVar(rawFind);

    if (Array.isArray(search)) {
        throw new TypeError('[Collection Tools | dictHasOwn] The input is not a dictionary.');
    }

    if (!find) {
        throw new Error('[Collection Tools | dictHasOwn] No key provided.');
    }

    return String(search.hasOwnProperty(find));
}

export { dictHasOwnHandler };
