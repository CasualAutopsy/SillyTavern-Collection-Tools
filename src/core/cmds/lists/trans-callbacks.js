const argH = NoxLib.SlashHandlers.argHandler;

/**
 * @import {} from '../../../../global.js'
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * Slash command callback for slicing a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string[]} vals - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified list.
 */
async function listSliceCallback(args, val) {
    const
        start = args.start == null
            ? argH.parse(args.start, 'int')
            : undefined,
        end = args.end == null
            ? argH.parse(args.end, 'int')
            : undefined;

    const list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-concat] First input is not a list.');
    }

    return JSON.stringify(list.slice(start, end));
}

/**
 * Slash command callback for concatenating lists.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string[]} vals - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified list.
 */
async function listConcatCallback(args, vals) {
    if (!Array.isArray(vals)) {
        throw new Error(`[Collection Tools | list-concat] Expected at least 2 arguments.`);
    }

    const list = argH.parseVar(vals.shift(), args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-concat] First input is not a list.');
    }

    /** @type {any[]} */
    let concat_lists;
    vals.forEach((val) => {
        const parsed_list = argH.parseVar(val, args, 'json');

        if (!Array.isArray(val)) {
            throw new TypeError('[Collection Tools | list-concat] One of the inputs is not a list.');
        }

        concat_lists.push(parsed_list);
    });

    return JSON.stringify(list.concat(...lists));
}

/**
 * Slash command callback for flattening a list
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified list.
 */
async function listFlatCallback(args, val) {
    const depth = argH.parse(args.depth, 'int');
    const list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-concat] Input is not a list.');
    }

    return JSON.stringify(list.flat(depth));
}

export {
    listSliceCallback,
    listConcatCallback,
    listFlatCallback
};
