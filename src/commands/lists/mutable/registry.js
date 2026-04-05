import {
    listPopCMD, listShiftCMD,
    listPushCMD, listUnshiftCMD,
    listSpliceCMD,
    listSortCMD, listReverseCMD,
    listFillCMD,
    listCopyWithinCMD
} from './lib.js';

import {
    LIST_POP_CONFIG, LIST_SHIFT_CONFIG,
    LIST_PUSH_CONFIG, LIST_UNSHIFT_CONFIG,
    LIST_SPLICE_CONFIG,
    LIST_SORT_CONFIG, LIST_REVERSE_CONFIG,
    LIST_FILL_CONFIG, LIST_COPYWITHIN_CONFIG
} from './configs.js';

import {list_docs} from "./docs.js";

/**
 * Register all mutable slash commands.
 */
export async function registerMutableSlashCommands() {
    const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext();

    const slash_parser = context.SlashCommandParser;
    const slash_command = context.SlashCommand;

    // PUSH / POP

    // Register '/list-push' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: listPushCMD,
        ...LIST_PUSH_CONFIG,
        helpString: list_docs.list_push,
    }));

    // Register '/list-pop' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: listPopCMD,
        ...LIST_POP_CONFIG,
        helpString: list_docs.list_pop,
    }));

    // SHIFT / UNSHIFT

    // Register '/list-unshift' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: listUnshiftCMD,
        ...LIST_UNSHIFT_CONFIG,
        helpString: list_docs.list_unshift,
    }));

    // Register '/list-shift' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: listShiftCMD,
        ...LIST_SHIFT_CONFIG,
        helpString: list_docs.list_shift,
    }));

    // SPLICE

    // Register '/list-splice' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: listSpliceCMD,
        ...LIST_SPLICE_CONFIG,
        helpString: list_docs.list_splice,
    }));

    // SORT / REVERSE

    // Register '/list-sort' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: listSortCMD,
        ...LIST_SORT_CONFIG,
        helpString: list_docs.list_sort,
    }));

    // Register '/list-reverse' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: listReverseCMD,
        ...LIST_REVERSE_CONFIG,
        helpString: list_docs.list_reverse,
    }));

    // FILL / COPYWITHIN

    // Register '/list-fill' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: listFillCMD,
        ...LIST_FILL_CONFIG,
        helpString: list_docs.list_fill,
    }));

    // Register '/list-copywithin' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: listCopyWithinCMD,
        ...LIST_COPYWITHIN_CONFIG,
        helpString: list_docs.list_copywithin,
    }));
}
