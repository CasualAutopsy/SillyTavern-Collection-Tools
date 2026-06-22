// @ts-nocheck
/* eslint-disable no-undef */
const {
    zip, zipObject, zipObjectDeep
} = SillyTavern.libs.lodash

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
    const mapped = sources.map(src => parseJSONOrVar(src, args));

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
    const [keys, values] = [...sources.map(src => parseJSONOrVar(src, args))];

    return JSON.stringify(
        args.deep
            ? zipObjectDeep(keys, values)
            : zipObject(keys, values)
    );
}
