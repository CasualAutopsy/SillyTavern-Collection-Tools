const getLocalVariable = (await import(/* webpackIgnore: true */ '/scripts/variables.js')).getLocalVariable;
const setLocalVariable = (await import(/* webpackIgnore: true */ '/scripts/variables.js')).setLocalVariable;
const getGlobalVariable = (await import(/* webpackIgnore: true */ '/scripts/variables.js')).getGlobalVariable;
const setGlobalVariable = (await import(/* webpackIgnore: true */ '/scripts/variables.js')).setGlobalVariable;


/**
 * Checks if the scope variable exists and returns it.
 *
 * @param {String} varName - Variable name.
 * @param {Object} args - Slash command arguments.
 * @returns {Object} - Variable JSON Value.
 */
function getScopeVar(varName, args) {
    if (args._scope.existsVariable(varName)) {
        try { // Attempt to parse the variable as JSON
            return JSON.parse(args._scope.getVariable(varName));
        } catch { // If it fails, throw an error
            throw new TypeError('Invalid JSON: ' + args._scope.getVariable(varName));
        }
    } else { // If the variable doesn't exist, throw an error
        throw new TypeError('No such variable: ' + varName + '(Scope)');
    }
}

/**
 * Checks if the local variable exists and returns it.
 *
 * @param {String} varName - Variable name.
 * @returns {Object} - Variable JSON Value.
 */
function getLocalVar(varName) {
    const value = getLocalVariable(varName);

    if (value !== '') {
        try { // Attempt to parse the variable as JSON
            return JSON.parse(value);
        } catch { // If it fails, throw an error
            throw new TypeError('Invalid JSON: ' + value);
        }
    } else { // If the variable is empty / doesn't exist, throw an error
        throw new TypeError('No such variable: ' + varName + '(Local)');
    }
}

/**
 * Checks if the global variable exists and returns it.
 *
 * @param {String} varName - Variable name.
 * @returns {Object} - Variable JSON Value.
 */
function getGlobalVar(varName) {
    const value = getGlobalVariable(varName);

    if (value !== '') {
        try { // Attempt to parse the variable as JSON
            return JSON.parse(value);
        } catch { // If it fails, throw an error
            throw new TypeError('Invalid JSON: ' + value);
        }
    } else { // If the variable is empty / doesn't exist, throw an error
        throw new TypeError('No such variable: ' + varName + '(Global)');
    }
}


/**
 * Checks if the scope variable exists and returns it along with a mutation function.
 *
 * @param {string} varName - Variable name.
 * @param {Object} args - Slash command arguments.
 * @returns {{list: {}[], setList: function({}[]): string}} - Variable JSON value and a mutation function.
 */
function getMutableScopeVar(varName, args) {
    if (args._scope.existsVariable(varName)) {
        try { // Attempt to parse the variable as JSON and create a mutation function
            const get = () => args._scope.getVariable(varName);
            const set = (list) => args._scope.setVariable(varName, JSON.stringify(list));
            return { list: get(), setList: set };
        } catch { // If it fails, throw an error
            throw new TypeError('Invalid JSON: ' + args._scope.getVariable(varName));
        }
    } else { // If the variable doesn't exist, throw an error
        throw new TypeError('No such variable: ' + varName + '(Scope)');
    }
}

/**
 * Checks if the local variable exists and returns it along with a mutation function.
 *
 * @param varName - Variable name.
 * @returns {{list: {}[], setList: function({}[]): string}} - Variable JSON value and a mutation function.
 */
function getMutableLocalVar(varName) {
    const value = getLocalVariable(varName);

    if (value !== '') {
        try { // Attempt to parse the variable as JSON and create a mutation function
            const get = () => JSON.parse(value);
            const set = (list) => setLocalVariable(varName, JSON.stringify(list));
            return { list: get(), setList: set };
        } catch { // If it fails, throw an error
            throw new TypeError('Invalid JSON: ' + value);
        }
    } else { // If the variable doesn't exist, throw an error
        throw new TypeError('No such variable: ' + varName + '(Local)');
    }
}

/**
 * Checks if the global variable exists and returns it along with a mutation function.
 *
 * @param varName - Variable name.
 * @returns {{list: {}[], setList: function({}[]): string}} - Variable JSON value and a mutation function.
 */
function getMutableGlobalVar(varName) {
    const value = getGlobalVariable(varName);

    if (value !== '') {
        try { // Attempt to parse the variable as JSON and create a mutation function
            const get = () => JSON.parse(value);
            const set = (list) => setGlobalVariable(varName, JSON.stringify(list));
            return { list: get(), setList: set };
        } catch { // If it fails, throw an error
            throw new TypeError('Invalid JSON: ' + value);
        }
    } else { // If the variable doesn't exist, throw an error
        throw new TypeError('No such variable: ' + varName + '(Global)');
    }
}



/**
 * Checks if the target value is a variable name and returns the associated value.
 *
 * @param {String} target - Target value.
 * @param {Object} args - Slash command arguments.
 * @returns {Object} - Variable JSON Value.
 */
export function isVarCheck(target, args) {
    // Check if the target is a variable name
    const [, prefix, varName] = target.match(/^([.$])?([-_a-zA-Z]+)$/);

    if (!varName) { // If it isn't, try to parse it as JSON

        try { // Attempt to parse the target as JSON
            return JSON.parse(target);
        } catch { // If it fails, throw an error
            throw new TypeError('Invalid JSON: ' + target);
        }

    } else if (!prefix) { // If it is a variable name, check if it has a prefix
        return getScopeVar(varName, args);
    } else { // If it does, check if it's a local or global variable
        return prefix === '.'
            ? getLocalVar(varName)
            : getGlobalVar(varName);
    }
}


/**
 * Checks if the target value is a variable name and returns the associated value along with a mutation function.
 *
 * @param {String} target - Target value.
 * @param {Object} args - Slash command arguments.
 * @returns {{list: {}[], setList: function({}[]): string}} - Variable value and a mutation function.
 */
export function isMutableVarCheck(target, args) {
    // Check if the target is a variable name
    const [, prefix, varName] = target.match(/^([.$])?([-_a-zA-Z]+)$/);

    if (!varName) { // If it isn't, try to parse it as JSON and create an empty mutation function

        try { // Attempt to parse the variable as JSON and create an empty mutation function
            const get = () => JSON.parse(target);
            const set = () => {};
            return { list: get(), setList: set };
        } catch { // If it fails, throw an error
            throw new TypeError('Invalid JSON: ' + target);
        }

    } else if (!prefix) { // If it is a variable name, check if it has a prefix
        return getMutableScopeVar(varName, args);
    } else { // If it does, check if it's a local or global variable
        return prefix === '.'
            ? getMutableLocalVar(varName)
            : getMutableGlobalVar(varName);
    }
}

export function macroIsVarCheck(target, resolve) {
    let varArg = resolve(target);

    const shorthandMatch = varArg.match(/^([.$])?([-_a-zA-Z]+)$/);
    if (shorthandMatch) {
        const [, prefix, varName] = shorthandMatch;

        const varMacro = prefix === '.'
            ? 'getvar'
            : 'getglobalvar';
        varArg = resolve(`{{${varMacro}::${varName}}}`);
    }

    return [varArg, shorthandMatch];
}

export function macroMutate(value, resolve, shorthand) {
    const [, prefix, varName] = shorthand;

    const varMacro = prefix === '.'
        ? 'setvar'
        : 'setglobalvar';

    resolve(`{{${varMacro}::${varName}::${value}}}`);
}

export function getStorageType(target, args) {
    // Scoped variable: parse on read, stringify on write
    if (args._scope.existsVariable(target)) {
        const get = () => JSON.parse(args._scope.getVariable(target));
        const set = (list) => args._scope.setVariable(target, JSON.stringify(list));
        return { list: get(), setList: set };
    }

    // Local variable storage
    if (getLocalVariable(target) !== '') {
        const get = () => JSON.parse(getLocalVariable(target));
        const set = (list) => setLocalVariable(target, JSON.stringify(list));
        return { list: get(), setList: set };
    }

    // Global variable storage
    if (getGlobalVariable(target) !== '') {
        const get = () => JSON.parse(getGlobalVariable(target));
        const set = (list) => setGlobalVariable(target, JSON.stringify(list));
        return { list: get(), setList: set };
    }

    // Inline list: parse target as JSON, no persistence
    const get = () => JSON.parse(target);
    const set = () => {};
    return { list: get(), setList: set };
}

/**
 * Parses a value string into its appropriate JavaScript type.
 * Attempts JSON parsing first, then numeric conversion, then boolean strings.
 * @param {string} value - The value string to parse
 * @returns {*} - The parsed value in its appropriate type
 */
export function parseValue(value) {
    // Try JSON parsing first (handles objects, arrays, numbers, booleans, null)
    try {
        return JSON.parse(value);
    } catch {
        // Try numeric conversion for plain numbers
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
            return numericValue;
        }
        // Handle boolean strings
        if (value === 'true' || value === 'false') {
            return isTrueBoolean(value);
        }
        // Return as string if no other conversion succeeds
        return value;
    }
}
