import {dictAtCMD, dictGetCMD} from './lib.js';

import {DICT_AT_CONFIG, DICT_GET_CONFIG} from './configs.js';

import {DICT_AT_HELP, DICT_GET_HELP} from './docs.js';

/**
 * Register all dictionary immutable slash commands.
 */
export async function registerImmutableDictSlashCommands() {
    const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext()

        , slash_parser = context.SlashCommandParser
        , slash_command = context.SlashCommand;

    // register '/dict-at' command
    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: dictAtCMD,
        ...DICT_AT_CONFIG,
        helpString: DICT_AT_HELP,
    }));

    // register '/dict-get' command
    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: dictGetCMD,
        ...DICT_GET_CONFIG,
        helpString: DICT_GET_HELP,
    }));
}
