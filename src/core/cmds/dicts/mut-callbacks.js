const argH = NoxLib.SlashHandlers.argHandler;

/**
 * @import {} from '../../../../global
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * Slash command callback for assigning a value to a dictionary.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified dictionary.
 */
async function dictAssignCallback(args, val) {
    const { var: target, setVar: mutate } = argH.parseMut(args.target, args, 'json');

    const source = val

    if (Array.isArray(target)) {
        throw new TypeError('[Collection Tools | dict-assign] The input is not a dictionary.');
    }

    if (Array.isArray(source)) {
        throw new TypeError('[Collection Tools | dict-assign] The source is not a dictionary.');
    }

    Object.assign(target, source);

    mutate(target);

    return JSON.stringify(target);
}

/**
 * Slash command callback for deleting a key from a dictionary.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified dictionary.
 */
async function dictDeleteCallback(args, val) {
    const { var: dict, setVar: mutate } = argH.parseMut(val, args, 'json');

    const key = args.key;

    if (Array.isArray(dict)) {
        throw new TypeError('[Collection Tools | dict-remove] The input is not a dictionary.');
    }

    if (!key) {
        throw new Error('[Collection Tools | dict-remove] No key provided.');
    }

    Reflect.deleteProperty(dict, key);

    mutate(dict);

    return JSON.stringify(dict);
}

async function dictDefineCallback(args, val) {
    const { var: dict, setVar: mutate } = argH.parseMut(val, args, 'json');

    const key = args.key;
    const value = argH.parseVar(args.value, args);

    if (Array.isArray(dict)) {
        throw new TypeError('[Collection Tools | dict-define] The input is not a dictionary.');
    }

    if (!key) {
        throw new Error('[Collection Tools | dict-define] No key provided.');
    }

    Object.defineProperty(dict, key, { value: value });

    mutate(dict);

    return JSON.stringify(dict);
}

async function dictMultiDefineCallback(args, val) {
    const { var: target, setVar: mutate } = argH.parseMut(args.target, args, 'json');

    const prop_map = argH.parse(val, 'json');

    if (Array.isArray(target)) {
        throw new TypeError('[Collection Tools | dict-multi-define] The input is not a dictionary.');
    }

    if (Array.isArray(prop_map)) {
        throw new TypeError('[Collection Tools | dict-multi-define] The prop map is not a dictionary.');
    }

    Object.defineProperties(target, prop_map);

    mutate(target);

    return JSON.stringify(target);
}

export {
    dictAssignCallback, dictDeleteCallback,
    dictDefineCallback, dictMultiDefineCallback
};
