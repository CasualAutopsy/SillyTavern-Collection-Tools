import {at, get} from 'lodash-es';

const {
    parseValue,
    parseValueOrVar,
    parseJSONOrVar
} = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js');


/**
 * Handles the '/dict-at' slash command for retrieving multiple values from a dictionary.
 *
 * @param {Object} args - Slash command arguments.
 * @param {string} target - Target dictionary / variable.
 * @param {string[]} paths - The property paths to retrieve from.
 * @returns {Array} - The values at the specified paths.
 */
export async function dictAtCMD(args, [target, ...paths]) {
    return JSON.stringify(
        at(
            parseJSONOrVar(target, args),
            parseValue(paths)
        )
    );
}

/**
 * Handles the '/dict-get' slash command for retrieving a single value from a dictionary.
 *
 * @param {Object} args - Slash command arguments.
 * @param {string} target - Target dictionary / variable.
 * @param {string} path - The property path to retrieve from.
 * @returns {*} - The value at the specified path.
 */
export async function dictGetCMD(args, [target, path]) {
    const retrieval = get(
        parseJSONOrVar(target, args),
        parseValue(path),
        args.default
            ? parseValueOrVar(args.default, args)
            : undefined
    );

    return typeof retrieval == 'object'
        ? JSON.stringify(retrieval)
        : retrieval;
}
