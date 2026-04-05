import {
    collectionSampleCMD, collectionSampleSizeCMD, collectionShuffleCMD
} from './lib.js';

import {
    COLLECTION_SAMPLE_CONFIG, COLLECTION_SAMPLE_SIZE_CONFIG, COLLECTION_SHUFFLE_CONFIG
} from './configs.js';

/**
 * Register all randomization slash commands.
 */
export async function registerRandomSlashCommands() {
    const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext();

    const slash_parser = context.SlashCommandParser;
    const slash_command = context.SlashCommand;

    // register '/collection-sample' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: collectionSampleCMD,
        ...COLLECTION_SAMPLE_CONFIG,
    }));

    // register '/collection-sample-size' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: collectionSampleSizeCMD,
        ...COLLECTION_SAMPLE_SIZE_CONFIG,
    }));

    // register '/collection-shuffle' command
    slash_parser.addCommandObject(slash_command.fromProps({
        callback: collectionShuffleCMD,
        ...COLLECTION_SHUFFLE_CONFIG,
    }));
}
