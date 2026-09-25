const argH = NoxLib.SlashHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * Slash command callback for checking if a dictionary has a key.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function dictHasOwnCallback(args, val) {
    const search = argH.parseVar(val, args, 'json');
    const find = args.find;

    if (Array.isArray(search)) {
        throw new TypeError('[Collection Tools | dict-has-own] The input is not a dictionary.');
    }

    if (!find) {
        throw new Error('[Collection Tools | dict-has-own] No key provided.');
    }

    return String(search.hasOwnProperty(find));
}

export {
    dictHasOwnCallback
};
