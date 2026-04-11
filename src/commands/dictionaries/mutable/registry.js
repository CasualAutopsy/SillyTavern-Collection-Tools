import {dictAssignCMD} from './lib';

import {DICT_ASSIGN_CONFIG} from './configs';

import {DICT_ASSIGN_HELP} from './docs.js';

export async function registerMutableDictSlashCommands() {
    const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext()

        , slash_parser = context.SlashCommandParser
        , slash_command = context.SlashCommand;

    slash_parser.addCommandObject(slash_command.fromProps({
        callback: dictAssignCMD,
        ...DICT_ASSIGN_CONFIG,
        helpString: DICT_ASSIGN_HELP,
    }));
}
