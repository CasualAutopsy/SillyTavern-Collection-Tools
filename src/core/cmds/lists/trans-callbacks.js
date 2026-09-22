import { STPublic as pub } from '../../../external/st-public.js';


const argH = NoxLib.SlashHandlers.argHandler;

const {
    SlashCommandClosure,
    SlashCommandBreakController,
    SlashCommandNamedArgumentAssignment
} = pub;

/**
 * @import {} from '../../../../global.js'
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommandClosure.js').SlashCommandClosure} Closure
 */

/**
 * Slash command callback for replacing an item in a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified list.
 */
async function listWithCallback(args, val) {
    const list = argH.parseVar(args.list, args, 'json');
    const value = argH.parseVar(val, args);

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-with] The list argument is not a list.');
    }

    if (value == null) {
        throw new TypeError('[Collection Tools | list-with] The value argument is undefined.');
    }

    const new_list = list.with(args.index, value);

    return JSON.stringify(new_list);
}

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
        start = args.start != null
            ? argH.parse(args.start, 'int')
            : undefined,
        end = args.end != null
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
    let concat_lists = [];
    vals.forEach((val) => {
        const parsed_list = argH.parseVar(val, args, 'json');

        if (!Array.isArray(parsed_list)) {
            throw new TypeError('[Collection Tools | list-concat] One of the inputs is not a list.');
        }

        concat_lists.push(parsed_list);
    });

    return JSON.stringify(list.concat(...concat_lists));
}

/**
 * Slash command callback for flattening a list.
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
    listWithCallback,
    listSliceCallback,
    listConcatCallback,
    listFlatCallback
};
