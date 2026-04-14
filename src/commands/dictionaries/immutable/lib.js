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
 * @param {[String, String[]]} target - Target dictionary / variable.
 * @returns {Promise<String>} - The values at the specified paths.
 */
export async function dictAtCMD(args, [target, ...paths]) {
    return JSON.stringify(
        at(
            parseJSONOrVar(target, args),
            paths
        )
    );
}

/**
 * Handles the '/dict-get' slash command for retrieving a single value from a dictionary.
 *
 * @param {Object} args - Slash command arguments.
 * @param {[String, String]} target - Target dictionary / variable.
 * @returns {Promise<*>} - The value at the specified path.
 */
export async function dictGetCMD(args, [target, path]) {
    const retrieval = get(
        parseJSONOrVar(target, args),
        parseValue(path),
        // @ts-ignore
        args.default
            // @ts-ignore
            ? parseValueOrVar(args.default, args)
            : undefined
    );

    return typeof retrieval == 'object'
        ? JSON.stringify(retrieval)
        : retrieval;
}
