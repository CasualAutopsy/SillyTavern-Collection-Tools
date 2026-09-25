const argH = NoxLib.SlashHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommandClosure.js').SlashCommandClosure} Closure
 */

/**
 * Slash command callback for pushing items to a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string[]} vals - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified length.
 */
async function listPushCallback(args, vals) {
    const { var: list, setVar: mutate } = argH.parseMut(vals.shift(), args, 'json');

    const return_length = args.returnLength != null
        ? argH.parse(args.returnLen, 'bool')
        : false;

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

    if (return_length) {
        return String(list.length);
    } else {
        return String(list);
    }
}

/**
 * Slash command callback for popping an item from a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listPopCallback(args, val) {
    const { var: list, setVar: mutate } = argH.parseMut(val, args, 'json');

    let n_pop = args.nPop != null
        ? argH.parse(args.nPop, 'int')
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | listPop] The input is not a list.');
    }

    if (list.length == 0) {
        throw new Error('[Collection Tools | listPop] The list is empty.');
    }

    if (n_pop != null && n_pop > list.length) {
        n_pop = list.length;
    }

    /** @type {any|any[]} */
    let popped_items;
    if (n_pop != null && n_pop > 1) {
        popped_items = list.splice(list.length - n_pop, n_pop);
    } else {
        popped_items = list.pop();
    }

    mutate(list);

    return String(popped_items);
}

/**
 * Slash command callback for unshifting items to a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string[]} vals - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified length.
 */
async function listUnshiftCallback(args, vals) {
    const { var: list, setVar: mutate } = argH.parseMut(vals.shift(), args, 'json');

    const return_length = args.returnLength != null
        ? argH.parse(args.returnLen, 'bool')
        : false;

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

    if (return_length) {
        return String(list.length);
    } else {
        return String(list);
    }
}

/**
 * Slash command callback for shifting items from a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listShiftCallback(args, val) {
    const { var: list, setVar: mutate } = argH.parseMut(val, args, 'json');

    let n_pop = args.nShift != null
        ? argH.parse(args.nShift, 'int')
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | listPop] The input is not a list.');
    }

    if (list.length == 0) {
        throw new Error('[Collection Tools | listPop] The list is empty.');
    }

    if (n_pop != null && n_pop > list.length) {
        n_pop = list.length;
    }

    /** @type {any|any[]} */
    let shifted_items;
    if (n_pop != null && n_pop > 1) {
        shifted_items = list.splice(list.length - n_pop, n_pop);
    } else {
        shifted_items = list.shift();
    }

    mutate(list);

    return String(shifted_items);
}

/**
 * Slash command callback for filling a list with a value.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified filled list.
 */
async function listFillCallback(args, val) {
    const { var: list, setVar: mutate } = argH.parseMut(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-fill] The input is not a list.');
    }

    const fill_val = argH.parse(args.value);

    const
        start = args.start != null
            ? argH.parse(args.start, 'int')
            : undefined,
        end = args.end != null
            ? argH.parse(args.end, 'int')
            : undefined;

    list.fill(fill_val, start, end);

    mutate(list);

    return JSON.stringify(list);
}

/**
 * Slash command callback for copying within a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified list.
 */
async function listCopyWithinCallback(args, val) {
    const { var: list, setVar: mutate } = argH.parseMut(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-copy-within] The input is not a list.');
    }

    const
        target = argH.parse(args.target, 'int'),
        start = argH.parse(args.start, 'int'),
        end = args.end != null
            ? argH.parse(args.end, 'int')
            : undefined;

    list.copyWithin(target, start, end);

    mutate(list);

    return JSON.stringify(list);
}

/**
 * Slash command callback for sorting a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified sorted list.
 */
async function listSortCallback(args, val) {
    const { var: list, setVar: mutate } = argH.parseMut(args.list, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-sort] The input is not a list.');
    }

    list.sort();

    mutate(list);

    return JSON.stringify(list);
}

/**
 * Slash command callback for reversing a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified reversed list.
 */
async function listReverseCallback(args, val) {
    const { var: list, setVar: mutate } = argH.parseMut(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-reverse] The input is not a list.');
    }

    list.reverse();

    mutate(list);

    return JSON.stringify(list);
}

export {
    listPushCallback, listPopCallback,
    listUnshiftCallback, listShiftCallback,
    listFillCallback, listCopyWithinCallback,
    listSortCallback, listReverseCallback
};
