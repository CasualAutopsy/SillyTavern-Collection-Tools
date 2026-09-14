/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * Slash command callback for popping an item from a list
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified list.
 */
async function listPopCallback(args, vals) {
    /** @type {any[]} */
    let list;
    try {
        list = JSON.parse(vals.shift());
    } catch {
        throw new TypeError('[Collection Tools | listPop] First input is not a list.');
    }

    if (vals.length == 0) {
        throw new Error('[Collection Tools | listPop] Expected at least 2 arguments, but got 1.');
    }

    const values = vals.map(())
}
