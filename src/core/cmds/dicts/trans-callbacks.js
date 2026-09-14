const argH = NoxLib.SlashHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * Slash command callback for turning a list of
 * key/value entries into a dictionary
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified dictionary.
 */
async function fromEntriesCallback(args, val) {
    const entries_arr = argH.parseVar(val, args, 'json');

    return JSON.stringify(Object.fromEntries(entries_arr));
}

export { fromEntriesCallback };
