/* eslint-disable no-undef */
// @ts-nocheck
import { COLLECTION_FOREACH_CONFIG } from './config.js';
import { forEachCMD } from './lib.js';

const { SlashCommandParser, SlashCommand } = SillyTavern.getContext();

/**
 * Register all collection iteration slash commands.
 */
export async function registerIterCollectionSlashCommands() {

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        callback: forEachCMD,
        ...COLLECTION_FOREACH_CONFIG,
        helpString: '',
    }));

}
