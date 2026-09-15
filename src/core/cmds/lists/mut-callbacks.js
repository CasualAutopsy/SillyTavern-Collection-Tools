const argH = NoxLib.SlashHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * Slash command callback for pushing items to a list
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string[]} vals - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified length.
 */
async function listPushCallback(args, vals) {
    const { var: list, setVar: mutate } = argH.parseMut(vals.shift(), args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | listPop] First input is not a list.');
    }

    if (vals.length == 0) {
        throw new Error('[Collection Tools | listPop] Expected at least 2 arguments, but got 1.');
    }

    vals.forEach((val) => {
        list.push(argH.parse(val));
    });

    mutate(list);

    return String(list.length);
}

/**
 * Slash command callback for popping an item from a list
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listPopCallback(args, val) {
    const { var: list, setVar: mutate } = argH.parseMut(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | listPop] The input is not a list.');
    }

    if (list.length == 0) {
        throw new Error('[Collection Tools | listPop] The list is empty.');
    }

    const popped = list.pop();

    mutate(list);

    return String(popped);
}

/**
 * Slash command callback for unshifting items to a list
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string[]} vals - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified length.
 */
async function listUnshiftCallback(args, vals) {
    const { var: list, setVar: mutate } = argH.parseMut(vals.shift(), args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | listPop] First input is not a list.');
    }

    if (vals.length == 0) {
        throw new Error('[Collection Tools | listPop] Expected at least 2 arguments, but got 1.');
    }

    vals.forEach((val) => {
        list.unshift(argH.parse(val));
    });

    mutate(list);

    return String(list.length);
}

/**
 * Slash command callback for shifting items from a list
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listShiftCallback(args, val) {
    const { var: list, setVar: mutate } = argH.parseMut(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | listPop] The input is not a list.');
    }

    if (list.length == 0) {
        throw new Error('[Collection Tools | listPop] The list is empty.');
    }

    const shifted = list.shift();

    mutate(list);

    return String(shifted);
}

export {
    listPushCallback, listPopCallback,
    listUnshiftCallback, listShiftCallback
};
