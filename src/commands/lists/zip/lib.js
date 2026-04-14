import {
    zip,
    zipObject,
    zipObjectDeep
} from 'lodash-es';

const {
    parseJSONOrVar
} = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js');


/**
 * Handles the /list-zip command for zipping arrays into tuples.
 *
 * @param {Object} args - Slack command arguments.
 * @param {String[]} sources - Array of arrays to zip.
 * @returns {Promise<String>} - JSON string of zipped tuples.
 */
export async function listZipCMD(args, sources) {
    /** @type {*[][]} */// @ts-ignore
    const mapped // Map sorces to an array of arrays
        = sources.map(src => parseJSONOrVar(src, args));

    return JSON.stringify(zip(...mapped));
}

/**
 * Handles the /list-zip-object command for zipping a pair of arrays into an object.
 *
 * @param {Object} args - Slack command arguments.
 * @param {String[]} sources - Array of strings to zip into keys.
 * @returns {Promise<String>} - JSON string of zipped object.
 */
export async function listZipObjectCMD(args, sources) {
    /** @type {[Array<String>, Array<*>]} */// @ts-ignore
    const [keys, values] // Map sorces to two arrays for keys and values
        = [...sources.map(src => parseJSONOrVar(src, args))];

    return JSON.stringify(
        // @ts-ignore
        args.deep // If deep flag is set, allow the use of property paths for the keys array
            ? zipObjectDeep(keys, values)
            : zipObject(keys, values)
    );
}
