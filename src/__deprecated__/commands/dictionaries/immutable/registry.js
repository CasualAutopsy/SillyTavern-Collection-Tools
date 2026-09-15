/* eslint-disable no-undef */
//@ts-nocheck
import {dictAtCMD, dictGetCMD} from './lib.js';

import {DICT_AT_CONFIG, DICT_GET_CONFIG} from './configs.js';

import {DICT_AT_HELP, DICT_GET_HELP} from './docs.js';

const { SlashCommandParser, SlashCommand } = SillyTavern.getContext()

/**
 * Register all dictionary immutable slash commands.
 */
export async function registerImmutableDictSlashCommands() {// register '/dict-at' command
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        callback: dictAtCMD,
        ...DICT_AT_CONFIG,
        helpString: DICT_AT_HELP,
    }));

    // register '/dict-get' command
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        callback: dictGetCMD,
        ...DICT_GET_CONFIG,
        helpString: DICT_GET_HELP,
    }));
}
