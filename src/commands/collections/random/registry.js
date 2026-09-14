/* eslint-disable no-undef */
// @ts-nocheck
import {
    collectionSampleCMD,
    collectionSampleSizeCMD,
    collectionShuffleCMD
} from './lib.js';

import {
    COLLECTION_SAMPLE_CONFIG,
    COLLECTION_SAMPLE_SIZE_CONFIG,
    COLLECTION_SHUFFLE_CONFIG
} from './configs.js';

import {
    COLLECTION_SAMPLE_HELP,
    COLLECTION_SAMPLE_SIZE_HELP,
    COLLECTION_SHUFFLE_HELP
} from './docs.js';

const { SlashCommand, SlashCommandParser } = SillyTavern.getContext();

/**
 * Register all collection randomization slash commands.
 */
export async function registerRandomCollectionSlashCommands() {
    // register '/collection-sample' command
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        callback: collectionSampleCMD,
        ...COLLECTION_SAMPLE_CONFIG,
        helpString: COLLECTION_SAMPLE_HELP,
    }));

    // register '/collection-sample-size' command
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        callback: collectionSampleSizeCMD,
        ...COLLECTION_SAMPLE_SIZE_CONFIG,
        helpString: COLLECTION_SAMPLE_SIZE_HELP,
    }));

    // register '/collection-shuffle' command
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        callback: collectionShuffleCMD,
        ...COLLECTION_SHUFFLE_CONFIG,
        helpString: COLLECTION_SHUFFLE_HELP,
    }));
}
