import { STPublic as pub } from '../../../external/st-public.js';


const argH = NoxLib.SlashHandlers.argHandler;
const dataH = NoxLib.Utilities.DataHelper;


const {
    SlashCommandClosure,
    SlashCommandBreakController,
    SlashCommandNamedArgumentAssignment
} = pub;


/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommandClosure.js').SlashCommandClosure} Closure
 */


/**
 * Slash command callback for checking if a list includes an item.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listIncludesCallback(args, val) {
    if (typeof args.parse !== 'string') {

        throw new TypeError('[Collection Tools | list-includes] Expected \'parse\' to be a value. Got a closure instead.');
    }
    if (typeof args.search !== 'string') {

        throw new TypeError('[Collection Tools | list-includes] Expected \'search\' to be a value. Got a closure instead.');
    }

    const list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {

        throw new TypeError('[Collection Tools | list-includes] The input is not a list.');
    }

    const parse_search_element = args.parse
        ? argH.parse(args.parse, 'bool')
        : true;
    const search_element = parse_search_element
        ? argH.parseVar(args.search, args)
        : args.search;

    const is_json = search_element != null && typeof search_element === 'object';
    const is_array = is_json && Array.isArray(search_element);

    if (is_json && is_array) {

        return String(
            list.some(
                item =>
                    Array.isArray(item) &&
                    dataH.arrayEquality(item, search_element)
            )
        );
    }
    else if (is_json) {

        return String(
            list.some(
                item =>
                    dataH.deepEquality(item, search_element)
            )
        );
    }
    else {

        return String(list.includes(search_element));
    }
}


export {
    listIncludesCallback,
};
