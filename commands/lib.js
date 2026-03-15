import {isTrueBoolean} from '../../../../utils.js';

import {
    getLocalVariable,
    setLocalVariable,
    getGlobalVariable,
    setGlobalVariable
} from '../../../../variables.js';



/**
 * Parses a value string into its appropriate JavaScript type.
 * Attempts JSON parsing first, then numeric conversion, then boolean strings.
 * @param {string} value - The value string to parse
 * @returns {*} - The parsed value in its appropriate type
 */
function parseValue(value) {
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

/**
 * Serializes a value for storage: objects become JSON strings, primitives stay as-is.
 * @param {*} value - The value to serialize
 * @returns {string|*} - Serialized value
 */
function serializeForStorage(value) {
    return typeof value === 'object' ? JSON.stringify(value) : value;
}

/**
 * Determines storage scope for a list and returns getter/setter functions.
 * Priority order: scoped variable → local variable → global variable → inline JSON.
 * @param {string} target - The list identifier (variable name or JSON string)
 * @returns {{ list: Array, setList: Function }} - List and persistence function
 */
function getStorageScope(target, args) {
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
 * Handles the /list-push slash command to add items to a list.
 * Supports scoped, local, global, or inline list targets.
 * @param {Object} args - Command arguments including flags like noParse, jsReturn
 * @param {Array} [target, ...items] - Target list identifier and items to push
 */
async function listPushCMD(args, [target, ...items]) {
    // Parse items to appropriate types unless noParse flag is set
    if (!isTrueBoolean(args.noParse)) {
        items = items.map(item => parseValue(item));
    }

    // Determine storage scope and get list
    const { list, setList } = getStorageScope(target, args);

    // Retrieve list, push items, persist changes
    list.push(...items);
    setList(list);

    // Return either the full list (default) or just the new length (jsReturn flag)
    return isTrueBoolean(args.jsReturn)
        ? list.length
        : JSON.stringify(list);
}

/**
 * Handles the /list-pop slash command to remove and return items from a list.
 * Supports scoped, local, global, or inline list targets.
 * @param {Object} args - Command arguments including flags like swapReturn
 * @param {string} target - The list identifier (variable name or JSON string)
 * @returns {*} - Either the popped item or remaining list (based on swapReturn flag)
 */
async function listPopCMD(args, target) {
    // Determine storage scope and get list
    const { list, setList } = getStorageScope(target, args);

    const popped = list.pop();

    // swapReturn flag determines what gets persisted and what gets returned
    // Default: persist remaining list, return popped item
    // With swapReturn: persist popped item, return remaining list
    if (!isTrueBoolean(args.swapReturn)) {
        setList(list);
        return serializeForStorage(popped);
    } else {
        setList(popped);
        return serializeForStorage(list);
    }
}

export const list_callbacks = {
    list_push: listPushCMD,
    list_pop: listPopCMD,
}
