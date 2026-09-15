/* eslint-disable no-undef */
const { at, get } = SillyTavern.libs.lodash;

const { shorthandJSONResolver, shorthandValueResolver } = NoxLib.CoercionAndShorthand.VarShorthand

/**
 * @typedef {import('/scripts/slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('/scripts/slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 *
 * @typedef {import('lodash').PropertyPath} PropertyPath
 */

/**
 * Handles the '/dict-at' slash command for retrieving multiple values from a dictionary.
 *
 * @param {NamedArguments} args - Slash command arguments.
 * @param {[String, PropertyPath]} target - Target dictionary / variable.
 * @returns {Promise<String>} - The values at the specified paths.
 */
export async function dictAtCMD(args, [target, ...paths]) {
    return JSON.stringify(
        at(
            shorthandJSONResolver(target, args),
            ...paths
        )
    );
}

/**
 * Handles the '/dict-get' slash command for retrieving a single value from a dictionary.
 *
 * @param {NamedArguments} args - Slash command arguments.
 * @param {[String, String]} target - Target dictionary / variable.
 * @returns {Promise<*>} - The value at the specified path.
 */
export async function dictGetCMD(args, [target, path]) {
    const retrieval = get(
        shorthandJSONResolver(target, args),
        path,

        args.default
            ? shorthandValueResolver(args.default, args)
            : undefined
    );

    return typeof retrieval == 'object'
        ? JSON.stringify(retrieval)
        : retrieval;
}
