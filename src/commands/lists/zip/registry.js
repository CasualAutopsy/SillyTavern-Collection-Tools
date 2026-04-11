import {listZipCMD, listZipObjectCMD} from './lib.js';

import {LIST_ZIP_CONFIG, LIST_ZIP_OBJECT_CONFIG} from './configs.js';


export async function registerZipSlashCommands() {
    const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext()

        , slash_parser = context.SlashCommandParser
        , slash_command = context.SlashCommand;

    slash_parser.addCommandObject(slash_command.fromProps({
        callback: listZipCMD,
        ...LIST_ZIP_CONFIG,
    }));

    slash_parser.addCommandObject(slash_command.fromProps({
        callback: listZipObjectCMD,
        ...LIST_ZIP_OBJECT_CONFIG,
    }));
}
