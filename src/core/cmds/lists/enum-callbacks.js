import { STPublic as pub } from '../../../external/st-public.js';


const {
    zip
} = SillyTavern.libs.lodash;

const argH = NoxLib.SlashHandlers.argHandler;


const {
    SlashCommandClosure,
    SlashCommandBreakController,
    SlashCommandNamedArgumentAssignment
} = pub;


/**
 * @import {} from '../../../../global'
 */


/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */


/**
 * Slash command callback for zipping multiple lists.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string[]} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The list's stringified index.
 */
async function listZipCallback(args, val) {
    let lists = [];
    if (Array.isArray(val)) {
        lists = val.map(l => argH.parseVar(l, args, 'json'));
    } else {
        throw new TypeError('[Collection Tools | list-zip] Expected at least 2 arguments, got 1 instead.');
    }

    const all_array = lists.every(l => Array.isArray(l));
    if (!all_array) {
        throw new TypeError('[Collection Tools | list-zip] One or more arguments is not a list.');
    }

    return JSON.stringify(zip(...lists));
}

export {
    listZipCallback,
};
