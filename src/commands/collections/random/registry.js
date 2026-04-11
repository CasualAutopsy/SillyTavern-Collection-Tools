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

/**
 * Register all collection randomization slash commands.
 */
export async function registerRandomCollectionSlashCommands() {
    const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext()

        , slash_parser = context.SlashCommandParser
        , slash_command = context.SlashCommand;

    // register '/collection-sample' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: collectionSampleCMD,
        ...COLLECTION_SAMPLE_CONFIG,
        helpString: COLLECTION_SAMPLE_HELP,
    }));

    // register '/collection-sample-size' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: collectionSampleSizeCMD,
        ...COLLECTION_SAMPLE_SIZE_CONFIG,
        helpString: COLLECTION_SAMPLE_SIZE_HELP,
    }));

    // register '/collection-shuffle' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: collectionShuffleCMD,
        ...COLLECTION_SHUFFLE_CONFIG,
        helpString: COLLECTION_SHUFFLE_HELP,
    }));
}
