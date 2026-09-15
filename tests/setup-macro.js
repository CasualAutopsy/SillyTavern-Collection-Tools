// Jest global setup — macro handler mocks.
// Injects NoxLib.MacroHandlers.argHandler methods, variable stores, and resetVariables into globalThis.

import { jest } from '@jest/globals';

// parseVar mock — mirrors NoxLib.MacroHandlers.argHandler.parseVar behavior.
// Delegates to this.resolve() for shorthand variable expansion before type coercion.
// Returns a jest.fn so tests can still override with mockReturnValue / mockImplementation.
globalThis.NoxLib.MacroHandlers.argHandler.parseVar = jest.fn(function parseVar(arg, toType) {
    const resolved = globalThis.NoxLib.MacroHandlers.argHandler.resolve(arg);

    switch (toType) {
        case 'int': {
            if (/^(?:-?(?:[0-9]+))$/.test(resolved)) return Number(resolved);
            throw new TypeError('[Nox-Lib] Invalid integer: ' + resolved);
        }

        case 'float': {
            if (/^(?:-?(?:Infinity|[0-9]+(?:\.[0-9]+)?(?:e-?[0-9]+)?))$/.test(resolved)) return Number(resolved);
            throw new TypeError('[Nox-Lib] Invalid float: ' + resolved);
        }

        case 'bool': {
            const lower = resolved.toLowerCase();
            if (lower === 'false' || lower === 'off') return false;
            if (lower === 'true' || lower === 'on') return true;
            throw new TypeError('[Nox-Lib] Invalid boolean: ' + resolved);
        }

        case 'json': {
            try {
                return JSON.parse(resolved);
            }
            catch {
                throw new TypeError('[Nox-Lib] Invalid JSON: ' + resolved);
            }
        }

        case 'yaml': {
            // YAML not available in browser test env — fall through to default
            break;
        }

        default: {
            try {
                return JSON.parse(resolved);
            }
            catch {
                const numeric = Number(resolved);
                if (!isNaN(numeric)) return numeric;

                const lower = resolved.toLowerCase();
                if (lower === 'false' || lower === 'off') return false;
                if (lower === 'true' || lower === 'on') return true;

                // YAML fallback skipped — not available in test env
                return resolved;
            }
        }
    }
});

// ── splitList mock — mirrors NoxLib.MacroHandlers.argHandler.splitList behavior ──
// Returns a jest.fn so tests can still override with mockReturnValue / mockImplementation.
globalThis.NoxLib.MacroHandlers.argHandler.splitList = jest.fn(function splitList(list, nSplits) {
    if (!list) throw new TypeError('[Nox-Lib] List is null.');

    if (list.length % nSplits !== 0) throw new Error('[Nox-Lib] List is not divisible by: ' + nSplits);

    const list_splits = Array.from({length: nSplits}, () => []);
    for (let i = 0; i < list.length; i++) {
        list_splits[i % nSplits].push(list[i]);
    }

    return list_splits;
});

// ── zipList mock — mirrors NoxLib.MacroHandlers.argHandler.zipList behavior ──
// Returns a jest.fn so tests can still override with mockReturnValue / mockImplementation.
globalThis.NoxLib.MacroHandlers.argHandler.zipList = jest.fn(function zipList(...lists) {
    const length = Math.min(...lists.map(arr => arr.length));
    const zipped = [];

    let i = 0;
    while (i < length) {
        zipped.push(lists.map(arr => arr[i]));
        i++;
    }

    return zipped;
});

// ── parse mock — mirrors NoxLib.MacroHandlers.argHandler.parse behavior ──
// Parses a macro argument to a specified datatype (default: auto).
// Returns a jest.fn so tests can still override with mockReturnValue / mockImplementation.
globalThis.NoxLib.MacroHandlers.argHandler.parse = jest.fn(function parse(arg, toType) {
    switch (toType) {
        case 'int': {
            if (/^(?:-?(?:[0-9]+))$/.test(arg)) return Number(arg);
            throw new TypeError('[Nox-Lib] Invalid integer: ' + arg);
        }

        case 'float': {
            if (/^(?:-?(?:Infinity|[0-9]+(?:\.[0-9]+)?(?:e-?[0-9]+)?))$/.test(arg)) return Number(arg);
            throw new TypeError('[Nox-Lib] Invalid float: ' + arg);
        }

        case 'bool': {
            const lower = arg.trim().toLowerCase();
            if (lower === 'false' || lower === 'off') return false;
            if (lower === 'true' || lower === 'on') return true;
            throw new TypeError('[Nox-Lib] Invalid boolean: ' + arg);
        }

        case 'json': {
            try {
                return JSON.parse(arg);
            }
            catch {
                throw new TypeError('[Nox-Lib] Invalid JSON: ' + arg);
            }
        }

        case 'yaml': {
            // YAML not available in browser test env — fall through to default
            break;
        }

        default: {
            try {
                return JSON.parse(arg);
            }
            catch {
                const numericParse = Number(arg);
                if (!isNaN(numericParse)) return numericParse;

                const lower = arg?.trim()?.toLowerCase();
                if (lower === 'false' || lower === 'off') return false;
                if (lower === 'true' || lower === 'on') return true;

                // YAML fallback skipped — not available in test env

                return arg;
            }
        }
    }
});

// ── Variable scope tracking for macro argument resolution ──

/**
 * Internal Map-backed stores for variable scope tracking.
 * @internal
 */
const _varStores = {
    /** @type {Map<string, unknown>} */
    local: new Map(),
    /** @type {Map<string, unknown>} */
    global: new Map(),
};

/**
 * Variable scope stores exposed for test setup.
 * Each scope provides `has(name)`, `get(name)`, and `set(name, value)`.
 */
globalThis.variables = {
    /** @type {{ has: (name: string) => boolean; get: (name: string) => unknown; set: (name: string, value: unknown) => void }} */
    local: {
        has(name) { return _varStores.local.has(name); },
        get(name) { return _varStores.local.get(name); },
        set(name, value) { _varStores.local.set(name, value); },
    },
    /** @type {{ has: (name: string) => boolean; get: (name: string) => unknown; set: (name: string, value: unknown) => void }} */
    global: {
        has(name) { return _varStores.global.has(name); },
        get(name) { return _varStores.global.get(name); },
        set(name, value) { _varStores.global.set(name, value); },
    },
};

/**
 * Reset all tracked variables to empty state.
 * Call in beforeEach to isolate tests.
 */
globalThis.resetVariables = function resetVariables() {
    _varStores.local.clear();
    _varStores.global.clear();
};

// ── varScope — macro shorthand scope detection ──

/**
 * Determine the shorthand variable scope if a shorthand exists.
 *
 * @param {string} arg - The argument to scan for a shorthand var.
 * @returns {string[]|null} The variable scope or null if no shorthand var is found.
 */
globalThis.NoxLib.MacroHandlers.argHandler.varScope = function varScope(arg) {
    const [, prefix, varName] = arg.match(/^([.$])?([-_a-zA-Z]+)$/) || [null, null, null];

    if (!prefix || !varName) return null;

    return prefix === '.'
        ? ['local', varName]
        : ['global', varName];
};

// ── resolve — macro shorthand variable resolution ──

/**
 * Resolves a shorthand variable to its value.
 *
 * @param {string} arg - The argument to resolve.
 * @returns {string} The resolved argument.
 */
globalThis.NoxLib.MacroHandlers.argHandler.resolve = function resolve(arg) {
    const shorthand = globalThis.NoxLib.MacroHandlers.argHandler.varScope(arg);

    if (!shorthand) return arg;

    return shorthand[0] === 'local'
        ? String(globalThis.variables.local.get(shorthand[1]))
        : String(globalThis.variables.global.get(shorthand[1]));
};

// ── parseMut mock — mirrors NoxLib.MacroHandlers.argHandler.parseMut behavior ──
// Resolves a shorthand variable and parses it to a specified datatype, returning the value
// with a setter function for mutability.
globalThis.NoxLib.MacroHandlers.argHandler.parseMut = jest.fn(function parseMut(arg, toType) {
    const [scope, varName] = globalThis.NoxLib.MacroHandlers.argHandler.varScope(arg) || [null, null];

    switch (scope) {
        case 'local': {
            if (globalThis.variables.local.has(varName)) {
                const get = () => globalThis.NoxLib.MacroHandlers.argHandler.parse(String(globalThis.variables.local.get(varName)), toType),
                    set = (val) => globalThis.variables.local.set(varName, typeof val === 'object' ? JSON.stringify(val) : val);

                return { var: get(), setVar: set };
            } else {
                throw new Error('No such variable: ' + varName + '(Local)');
            }
        }

        case 'global': {
            if (globalThis.variables.global.has(varName)) {
                const get = () => globalThis.NoxLib.MacroHandlers.argHandler.parse(String(globalThis.variables.global.get(varName)), toType),
                    set = (val) => globalThis.variables.global.set(varName, typeof val === 'object' ? JSON.stringify(val) : val);

                return { var: get(), setVar: set };
            } else {
                throw new Error('No such variable: ' + varName + '(Global)');
            }
        }

        default: {
            const get = () => globalThis.NoxLib.MacroHandlers.argHandler.parse(arg, toType),
                set = () => {};

            return { var: get(), setVar: set };
        }
    }
});
