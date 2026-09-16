const argH = NoxLib.SlashHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * Slash command callback for getting an item from a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} vals - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listAtCallback(args, val) {
    const index = argH.parse(args.index, 'int');
    const list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-at] The input is not a list.');
    }

    return typeof list[index] === 'object'
        ? JSON.stringify(list[index])
        : String(list[index]);
}

/**
 * Slash command callback for getting the index
 * of the first occurrence of an item from a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} vals - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listIndexOfCallback(args, val) {
    const parse_search_element = args.parse
        ? argH.stBoolCoercion(args.parse)
        : true;
    const search_element = parse_search_element
        ? argH.parseVar(args.search, args)
        : args.search;
    const list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-index-of] The input is not a list.');
    }

    return String(list.indexOf(search_element));
}

/**
 * Slash command callback for getting the index
 * of the last occurrence of an item from a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} vals - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listLastIndexOfCallback(args, val) {
    const parse_search_element = args.parse
        ? argH.stBoolCoercion(args.parse)
        : true;
    const search_element = parse_search_element
        ? argH.parseVar(args.search, args)
        : args.search;
    const list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-last-index-of] The input is not a list.');
    }

    return String(list.lastIndexOf(search_element));
}

export {
    listAtCallback,
    listIndexOfCallback, listLastIndexOfCallback
};
