

import yaml from 'yaml';

import { jest } from '@jest/globals';



const _varStore = {
    scope: new Map(),
    local: new Map(),
    global: new Map(),
};

const variables = {
    local: {
        has(name) { return _varStore.local.has(name); },
        get(name) { return _varStore.local.get(name); },
        set(name, value) { _varStore.local.set(name, value); },
    },
    global: {
        has(name) { return _varStore.global.has(name); },
        get(name) { return _varStore.global.get(name); },
        set(name, value) { _varStore.global.set(name, value); },
    },
};


globalThis.SillyTavern = {
    getContext: () => ({
        variables,
    }),

    libs: {
        yaml
    }
};


export const _scope = {
    existsVariable(name) { return _varStore.scope.has(name); },
    getVariable(name) { return _varStore.scope.get(name); },
    setVariable(name, value) { _varStore.scope.set(name, value); },
};

export function resetVariables() {
    _varStore.scope.clear();
    _varStore.local.clear();
    _varStore.global.clear();
}


await (async () => {
    const { MacroHandlers } = await import('../../STLibs-Nox-Library/libs/core/macros/index.js');
    globalThis.NoxLib = { MacroHandlers: MacroHandlers };
})();

/**
 * @class MacroArgClass
 * ====================
 * @method varScope
 *
 * @param {string} arg - The argument to scan for a shorthand var.
 *
 * @returns {[string, string]|null} The variable scope or null if no shorthand var is found.
 *
 * @description
 * A method for determining the shorthand variables scope if a shorthand exists.
 * The relative file path to the method is:
 * `/home/casauto/ML/Text/SillyTavern-Launcher/SillyTavern/public/scripts/extensions/third-party/STLibs-Nox-Library/libs/core/macros/arg-handling.js`
 *
 * ---
 *
 * @method resolve
 *
 * @param {string} arg - The argument to resolve.
 *
 * @returns {string} The resolved argument.
 *
 * @description
 * A method for resolving a shorthand variable to its value.
 * The relative file path to the method is:
 * `/home/casauto/ML/Text/SillyTavern-Launcher/SillyTavern/public/scripts/extensions/third-party/STLibs-Nox-Library/libs/core/macros/arg-handling.js`
 *
 * ---
 *
 * @method parse
 *
 * @param {string} arg - The argument to parse.
 * @param {undefined|"int"|"float"|"bool"|"json"|"yaml"} toType - The datatype to parse the arg to. (Default: `undefined`)
 *
 * @returns {any} The parsed resolved shorthand.
 *
 * @description
 * A method for resolving a shorthand variable and parsing it to a specified datatype.
 * The relative file path to the method is:
 * `/home/casauto/ML/Text/SillyTavern-Launcher/SillyTavern/public/scripts/extensions/third-party/STLibs-Nox-Library/libs/core/macros/arg-handling.js`
 *
 * ---
 *
 * @method parseVar
 *
 * @param {string} arg - The argument to parse.
 * @param {undefined|"int"|"float"|"bool"|"json"|"yaml"} toType - The datatype to parse the arg to. (Default: `undefined`)
 *
 * @returns {any} The parsed resolved shorthand.
 *
 * @throws {TypeError} - Throws a TypeError if the argument is not parsable to the specified datatype.
 *
 * @description
 * A method for resolving a shorthand variable and parsing it to a specified datatype.
 * The relative file path to the method is:
 * `/home/casauto/ML/Text/SillyTavern-Launcher/SillyTavern/public/scripts/extensions/third-party/STLibs-Nox-Library/libs/core/macros/arg-handling.js`
 *
 * ---
 *
 * @method parseMut
 *
 * @param {string} arg - The argument to parse.
 * @param {undefined|"int"|"float"|"bool"|"json"|"yaml"} toType - The datatype to parse the arg to. (Default: `undefined`)
 *
 * @returns {{var: any, setVar: (val: any) => void}} The parsed resolved shorthand and a function for mutability.
 *
 * @throws {Error} - Throws an Error if the variable does not exist within the shorthand scope.
 *
 * @description
 * A method for resolving a shorthand variable and parsing it to a specified datatype and returns it with a function for mutability.
 * The relative file path to the method is:
 * `/home/casauto/ML/Text/SillyTavern-Launcher/SillyTavern/public/scripts/extensions/third-party/STLibs-Nox-Library/libs/core/macros/arg-handling.js`
 *
 * ---
 *
 * @method stBoolCoercion
 *
 * @param {string} arg - The argument to parse.
 *
 * @returns {boolean} The coerced boolean value.
 *
 * @description
 * A method for coercing any SillyTavern string value into a SillyTavern bool datatype.
 * The relative file path to the method is:
 * `/home/casauto/ML/Text/SillyTavern-Launcher/SillyTavern/public/scripts/extensions/third-party/STLibs-Nox-Library/libs/core/macros/arg-handling.js`
 */
