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

import {
    LIST_POP_HELP, LIST_SHIFT_HELP,
    LIST_PUSH_HELP, LIST_UNSHIFT_HELP,
    LIST_SPLICE_HELP,
    LIST_SORT_HELP, LIST_REVERSE_HELP,
    LIST_FILL_HELP, LIST_COPYWITHIN_HELP
} from './docs.js';

/**
 * Register all mutable list slash commands.
 */
export async function registerMutableSlashCommands() {
    const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext()

        , slash_parser = context.SlashCommandParser
        , slash_command = context.SlashCommand;

    // PUSH / POP

    // Register '/list-push' command
    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: listPushCMD,
        ...LIST_PUSH_CONFIG,
        helpString: LIST_PUSH_HELP,
    }));

    // Register '/list-pop' command
    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: listPopCMD,
        ...LIST_POP_CONFIG,
        helpString: LIST_POP_HELP,
    }));

    // SHIFT / UNSHIFT

    // Register '/list-unshift' command
    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: listUnshiftCMD,
        ...LIST_UNSHIFT_CONFIG,
        helpString: LIST_UNSHIFT_HELP,
    }));

    // Register '/list-shift' command
    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: listShiftCMD,
        ...LIST_SHIFT_CONFIG,
        helpString: LIST_SHIFT_HELP,
    }));

    // SPLICE

    // Register '/list-splice' command
    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: listSpliceCMD,
        ...LIST_SPLICE_CONFIG,
        helpString: LIST_SPLICE_HELP,
    }));

    // SORT / REVERSE

    // Register '/list-sort' command
    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: listSortCMD,
        ...LIST_SORT_CONFIG,
        helpString: LIST_SORT_HELP,
    }));

    // Register '/list-reverse' command
    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: listReverseCMD,
        ...LIST_REVERSE_CONFIG,
        helpString: LIST_REVERSE_HELP,
    }));

    // FILL / COPYWITHIN

    // Register '/list-fill' command
    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: listFillCMD,
        ...LIST_FILL_CONFIG,
        helpString: LIST_FILL_HELP,
    }));

    // Register '/list-copywithin' command
    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: listCopyWithinCMD,
        ...LIST_COPYWITHIN_CONFIG,
        helpString: LIST_COPYWITHIN_HELP,
    }));
}
