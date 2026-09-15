// Jest global setup — slash command handler mocks.
// Injects NoxLib.SlashHandlers.argHandler methods and NamedArguments into globalThis.

import { jest } from '@jest/globals';

globalThis.SillyTavern = { getContext: jest.fn() };

globalThis.NoxLib = {
    SlashHandlers: { argHandler: {} },
    MacroHandlers: { argHandler: {} },
};

// ── parseVar mock — mirrors NoxLib.SlashHandlers.argHandler.parseVar behavior ──
// Delegates to this.resolve() for shorthand variable expansion before type coercion.
// Returns a jest.fn so tests can still override with mockReturnValue / mockImplementation.
globalThis.NoxLib.SlashHandlers.argHandler.parseVar = jest.fn(function parseVar(arg, slashScope, toType) {
    const resolved = globalThis.NoxLib.SlashHandlers.argHandler.resolve(arg, slashScope);

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

                return resolved;
            }
        }
    }
});

// ── parse mock — mirrors NoxLib.SlashHandlers.argHandler.parse behavior ──
// Parses a slash command argument to a specified datatype (default: auto).
globalThis.NoxLib.SlashHandlers.argHandler.parse = jest.fn(function parse(arg, toType) {
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

                    return arg;
                }
            }
        }
});

// ── varScope — slash command shorthand scope detection ──

/**
 * Determine the shorthand variable scope if a shorthand exists.
 *
 * @param {string} arg - The argument to scan for a shorthand var.
 * @returns {[string, string]|null} The variable scope tuple or null if no shorthand found.
 */
globalThis.NoxLib.SlashHandlers.argHandler.varScope = jest.fn(function varScope(arg) {
    const [, prefix, varName] = arg.match(/^([@.$])?([-_a-zA-Z]+)$/) || [null, null, null];

    if (!prefix || !varName) return null;

    return prefix === '@'
        ? ['scope', varName]
        : prefix === '.'
            ? ['local', varName]
            : ['global', varName];
});

// ── resolve — slash command shorthand variable resolution ──

/**
 * Resolves a shorthand variable to its string value.
 *
 * @param {string} arg - The argument to resolve.
 * @param {NamedArguments|null} slashScope - Slash command scope (for @ prefix).
 * @returns {string} The resolved argument.
 */
globalThis.NoxLib.SlashHandlers.argHandler.resolve = jest.fn(function resolve(arg, slashScope) {
    const shorthand = globalThis.NoxLib.SlashHandlers.argHandler.varScope(arg);

    if (!shorthand) return arg;


    return shorthand[0] === 'scope'
        ? String(slashScope._scope.getVariable(shorthand[1]))
        : shorthand[0] === 'local'
            ? String(variables.local.get(shorthand[1]))
            : String(variables.global.get(shorthand[1]));
});

// ── parseMut mock — mirrors NoxLib.SlashHandlers.argHandler.parseMut behavior ──
// Resolves a shorthand variable and parses it to a specified datatype, returning the value
// with a setter function for mutability. Supports @scope, .local, $global, and bare-arg scopes.
globalThis.NoxLib.SlashHandlers.argHandler.parseMut = jest.fn(function parseMut(arg, slashScope, toType) {
    const [scope, varName] = globalThis.NoxLib.SlashHandlers.argHandler.varScope(arg) || [null, null];

    switch (scope) {
        case 'scope': {
            if (slashScope._scope.existsVariable(varName)) {
                const get = () => globalThis.NoxLib.SlashHandlers.argHandler.parse(slashScope._scope.getVariable(varName), toType),
                    set = (val) => slashScope._scope.setVariable(varName, typeof val === 'object' ? JSON.stringify(val) : val);

                return { var: get(), setVar: set };
            } else {
                throw new Error('No such variable: ' + varName + '(Scope)');
            }
        }

        case 'local': {
            if (globalThis.variables.local.has(varName)) {
                const get = () => globalThis.NoxLib.SlashHandlers.argHandler.parse(globalThis.variables.local.get(varName), toType),
                    set = (val) => globalThis.variables.local.set(varName, typeof val === 'object' ? JSON.stringify(val) : val);

                return { var: get(), setVar: set };
            } else {
                throw new Error('No such variable: ' + varName + '(Local)');
            }
        }

        case 'global': {
            if (globalThis.variables.global.has(varName)) {
                const get = () => globalThis.NoxLib.SlashHandlers.argHandler.parse(globalThis.variables.global.get(varName), toType),
                    set = (val) => globalThis.variables.global.set(varName, typeof val === 'object' ? JSON.stringify(val) : val);

                return { var: get(), setVar: set };
            } else {
                throw new Error('No such variable: ' + varName + '(Global)');
            }
        }

        default: {
            const get = () => globalThis.NoxLib.SlashHandlers.argHandler.parse(arg, toType),
                set = () => {};

            return { var: get(), setVar: set };
        }
    }
});

// ── NamedArguments mock — slash command scope variable tracking ──

/**
 * Mock NamedArguments class for slash command scope variable tracking.
 * Provides _scope with existsVariable, getVariable, and setVariable methods.
 */
globalThis.NamedArguments = class NamedArguments {
    /**
     * @param {Record<string, unknown>} [initialScope={}] - Initial variable key-value pairs.
     */
    constructor(initialScope = {}) {
        /** @type {{ existsVariable: (name: string) => boolean; getVariable: (name: string) => unknown; setVariable: (name: string, value: unknown) => void }} */
        this._scope = {
            existsVariable(name) {
                return name in initialScope;
            },
            getVariable(name) {
                return initialScope[name];
            },
            setVariable(name, value) {
                initialScope[name] = value;
            },
        };
    }
};
