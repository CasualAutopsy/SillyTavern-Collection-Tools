import {assign} from 'lodash-es';

const {
    parseJSONOrVar,
    mutableParseValueOrVar
} = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js');

/**
 * Handles the '/dict-assign' slash command for assigning properties to a dictionary mutably.
 *
 * @param {Object} args - Slash command arguments.
 * @param {Object|string} target - Target dictionary or a variable containing a dictionary.
 * @param {Object|string} sources - Sources containing properties to assign to the target dictionary.
 * @returns {string<Object>} - The modified dictionary.
 */
export async function dictAssignCMD(args, [target, ...sources]) {
    const {list, setList} = mutableParseValueOrVar(target, args);

    const dict = assign(list, ...sources.map((src) => {
        return parseJSONOrVar(src, args);
    }));

    setList(dict);
    return JSON.stringify(dict);
}
