const argH = NoxLib.SlashHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * Slash command callback for creating a list
 * of keys from a dictionary.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified list.
 */
async function getKeysCallback(args, val) {
    const value = argH.parseVar(val, args, 'json');

    return JSON.stringify(Object.keys(value));
}

/**
 * Slash command callback for creating a list
 * of values from a dictionary.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified list.
 */
async function getValuesCallback(args, val) {
    const value = argH.parseVar(val, args, 'json');

    return JSON.stringify(Object.values(value));
}

/**
 * Slash command callback for creating a list
 * of key/value entries from a dictionary.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified list.
 */
async function getEntriesCallback(args, val) {
    const value = argH.parseVar(val, args, 'json');

    return JSON.stringify(Object.entries(value));
}

export {
    getKeysCallback, getValuesCallback, getEntriesCallback
};
