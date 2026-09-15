/* eslint-disable no-undef */
const {
    sample, sampleSize,
    shuffle
} = SillyTavern.libs.lodash;

const {
    shorthandIntResolver,
    shorthandJSONResolver
} = NoxLib.CoercionAndShorthand.VarShorthand

/**
 * @typedef {import('/scripts/slash-commands/SlashCommand').NamedArguments} NamedArguments
 * @typedef {import('/scripts/slash-commands/SlashCommand').UnnamedArguments} UnnamedArguments
 */

/**
 * Handles the '/collection-sample' command for sampling a random value from a collection.
 *
 * @param {NamedArguments} args - Slash command arguments.
 * @param {UnnamedArguments} val - Target collection / variable.
 * @returns {Promise<*>} - Sampled value.
 */
export async function collectionSampleCMD(args, val) {
    const sampledValue = sample(
        shorthandJSONResolver(val, args)
    );

    return typeof sampledValue == 'object'
        ? JSON.stringify(sampledValue)
        : sampledValue;
}

/**
 * Handles the '/collection-sample-size' command for randomly sampling n number of values from a collection.
 *
 * @param {NamedArguments} args - Slash command arguments.
 * @param {[String, String]} unnamedArgs - Target collection / variable + number of values to sample.
 * @returns {Promise<String>} - Array of sampled values.
 */
export async function collectionSampleSizeCMD(args, [target, n]) {
    return JSON.stringify(
        // @ts-ignore
        sampleSize(
            shorthandJSONResolver(target, args),
            shorthandIntResolver(n, args),
    ));
}

/**
 * Handles the '/collection-shuffle' command for shuffling a collection.
 *
 * @param {NamedArguments} args - Slash command arguments.
 * @param {UnnamedArguments} val - Target collection / variable.
 * @returns {Promise<String>} - Array of shuffled values.
 */
export async function collectionShuffleCMD(args, val) {
    return JSON.stringify(shuffle(
        shorthandJSONResolver(val, args)
    ));
}
