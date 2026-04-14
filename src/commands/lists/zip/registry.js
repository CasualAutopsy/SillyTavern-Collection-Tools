import {listZipCMD, listZipObjectCMD} from './lib.js';

import {LIST_ZIP_CONFIG, LIST_ZIP_OBJECT_CONFIG} from './configs.js';

import {LIST_ZIP_HELP, LIST_ZIP_OBJECT_HELP} from './docs.js';


/**
 * Register all zip list slash commands.
 */
export async function registerZipSlashCommands() {
    const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext()

        , slash_parser = context.SlashCommandParser
        , slash_command = context.SlashCommand;

    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: listZipCMD,
        ...LIST_ZIP_CONFIG,
        helpString: LIST_ZIP_HELP,
    }));

    slash_parser.addCommandObject(slash_command.fromProps({
        // @ts-ignore
        callback: listZipObjectCMD,
        ...LIST_ZIP_OBJECT_CONFIG,
        helpString: LIST_ZIP_OBJECT_HELP,
    }));
}
