// @ts-nocheck
/* eslint-disable no-undef */
import {listZipCMD, listZipObjectCMD} from './lib.js';

import {LIST_ZIP_CONFIG, LIST_ZIP_OBJECT_CONFIG} from './configs.js';

import {LIST_ZIP_HELP, LIST_ZIP_OBJECT_HELP} from './docs.js';


/**
 * Register all zip list slash commands.
 */
export async function registerZipSlashCommands() {
    const {
        SlashCommandParser, SlashCommand
    } = SillyTavern.getContext();


    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        callback: listZipCMD,

        ...LIST_ZIP_CONFIG,
        helpString: LIST_ZIP_HELP,
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        callback: listZipObjectCMD,

        ...LIST_ZIP_OBJECT_CONFIG,
        helpString: LIST_ZIP_OBJECT_HELP,
    }));
}
