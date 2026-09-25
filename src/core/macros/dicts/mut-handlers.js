const argH = NoxLib.MacroHandlers.argHandler;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../macros/engine/MacroRegistry').MacroExecutionContext} MacroExecutionContext
 */

/**
 * Macro handler for assigning a value to a dictionary
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified dictionary.
 */
function dictAssignHandler({unnamedArgs: [rawTarget, rawSource]}) {
    const { var: target, setVar: mutate } = argH.parseMut(rawTarget, 'json');
    const source = argH.parseVar(rawSource, 'json');

    if (Array.isArray(target)) {
        throw new TypeError('[Collection Tools | dictAssign] The target input is not a dictionary.');
    }

    if (Array.isArray(source)) {
        throw new TypeError('[Collection Tools | dictAssign] The source input is not a dictionary.');
    }

    Object.assign(target, source);

    mutate(target);

    return JSON.stringify(target);
}

/**
 * Macro handler for deleting a key from a dictionary
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified dictionary.
 */
function dictDeleteHandler({unnamedArgs: [rawTarget, key]}) {
    const { var: target, setVar: mutate } = argH.parseMut(rawTarget, 'json');

    if (Array.isArray(target)) {
        throw new TypeError('[Collection Tools | dictDelete] The input is not a dictionary.');
    }

    Reflect.deleteProperty(target, key);

    mutate(target);

    return JSON.stringify(target);
}

/**
 * Macro handler for defining a property on a dictionary
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified dictionary.
 */
function dictDefineHandler({unnamedArgs: [rawTarget, key, rawValue]}) {
    const { var: target, setVar: mutate } = argH.parseMut(rawTarget, 'json');
    const value = argH.parse(rawValue);

    if (Array.isArray(target)) {
        throw new TypeError('[Collection Tools | dictDefine] The input is not a dictionary.');
    }

    Object.defineProperty(target, key, { value: value });

    mutate(target);

    return JSON.stringify(target);
}

/**
 * Macro handler for defining multiple properties on a dictionary
 *
 * @param {MacroExecutionContext} param0 - The macro execution context.
 *
 * @returns {String} - The stringified dictionary.
 */
function dictMultiDefineHandler({unnamedArgs: [rawTarget, rawPropMap]}) {
    const { var: target, setVar: mutate } = argH.parseMut(rawTarget, 'json');
    const prop_map = argH.parseVar(rawPropMap, 'json');

    if (Array.isArray(target)) {
        throw new TypeError('[Collection Tools | dictMultiDefine] The target input is not a dictionary.');
    }

    if (Array.isArray(prop_map)) {
        throw new TypeError('[Collection Tools | dictMultiDefine] The prop map is not a dictionary.');
    }

    Object.defineProperties(target, prop_map);

    mutate(target);

    return JSON.stringify(target);
}

export {
    dictAssignHandler, dictDeleteHandler,
    dictDefineHandler, dictMultiDefineHandler
};
