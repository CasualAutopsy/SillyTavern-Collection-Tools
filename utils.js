const getLocalVariable = (await import(/* webpackIgnore: true */ '/scripts/variables.js')).getLocalVariable;
const setLocalVariable = (await import(/* webpackIgnore: true */ '/scripts/variables.js')).setLocalVariable;
const getGlobalVariable = (await import(/* webpackIgnore: true */ '/scripts/variables.js')).getGlobalVariable;
const setGlobalVariable = (await import(/* webpackIgnore: true */ '/scripts/variables.js')).setGlobalVariable;

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
