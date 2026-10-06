import yaml from 'yaml';
import lodash from 'lodash';


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
        yaml,
        lodash,
    },
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
    const { SlashArgClass } = await import('../../STLibs-Nox-Library/libs/core/cmds/arg-handling.js');
    const { MacroHandlers } = await import('../../STLibs-Nox-Library/libs/core/macros/index.js');
    const { Utilities } = await import('../../STLibs-Nox-Library/libs/core/utils/index.js');

    globalThis.NoxLib = {
        SlashHandlers: {
            argHandler: SlashArgClass,
        },
        MacroHandlers: MacroHandlers,
        Utilities: Utilities,
    };
})();


// ============================================================================
// Mock: SillyTavern SlashCommandClosure system
// ============================================================================
//
// Purpose
// -------
// Replaces SillyTavern's STscript-based `SlashCommandClosure` with a minimal
// test double that accepts a plain function. The function signature is:
//
//     (arg0: string, arg1?: string, arg2?: string, ...argN?: string) => string
//
// The callbacks in this project populate `argumentList` (parameter names) and
// `providedArgumentList` (parameter values) before calling `execute()`. The
// mock invokes the stored function with those values and returns a result
// object whose shape matches `SlashCommandClosureResult`.
//
// Source: <SillyTavern dir>/public/scripts/slash-commands/SlashCommandClosure.js
// ============================================================================


/**
 * @class SlashCommandBreakController
 *
 * @description
 * Minimal mock of SillyTavern's `SlashCommandBreakController`.
 * Tracks whether execution was broken via the `/break` command.
 *
 * Source: <SillyTavern dir>/public/scripts/slash-commands/SlashCommandBreakController.js
 */
export class SlashCommandBreakController {
    /** @type {boolean} */
    isBreak = false;

    /**
     * Signals that execution should break.
     */
    break() {
        this.isBreak = true;
    }
}


/**
 * @class SlashCommandNamedArgumentAssignment
 *
 * @description
 * Minimal mock of SillyTavern's `SlashCommandNamedArgumentAssignment`.
 * Holds a parameter name and its assigned string value.
 *
 * Source: <SillyTavern dir>/public/scripts/slash-commands/SlashCommandNamedArgumentAssignment.js
 */
export class SlashCommandNamedArgumentAssignment {
    /** @type {number} */
    start;

    /** @type {number} */
    end;

    /** @type {string} */
    name;

    /** @type {string} */
    value;
}


/**
 * @class SlashCommandClosure
 *
 * @description
 * Minimal mock of SillyTavern's `SlashCommandClosure`.
 *
 * Instead of parsing STscript text (`{:/...:/}`), this mock wraps a
 * plain function. The function receives the argument values in order
 * and must return a string.
 *
 * Usage pattern (mirrors the real callbacks):
 *
 *   1. Create:   const closure = new SlashCommandClosure(fn);
 *   2. Set params: closure.argumentList.push({name: 'value'});
 *   3. Set values: closure.providedArgumentList[0].value = '42';
 *   4. Execute:  const result = await closure.execute();
 *   5. Read:     result.pipe   // string output
 *                result.isBreak // boolean
 *                result.isAborted // boolean
 *
 * The constructor also accepts a second `options` object for advanced
 * control:
 *
 *   - options.breakOnCondition: (argValues: string[]) => boolean
 *       If the function returns true, execute() sets isBreak = true
 *       without invoking the wrapped function.
 *
 * Source: <SillyTavern dir>/public/scripts/slash-commands/SlashCommandClosure.js
 */
export class SlashCommandClosure {
    /** @type {(arg0: string, ...args: string[]) => string} */
    #fn;

    /** @type {SlashCommandNamedArgumentAssignment[]} */
    argumentList = [];

    /** @type {SlashCommandNamedArgumentAssignment[]} */
    providedArgumentList = [];

    /** @type {SlashCommandBreakController} */
    breakController = new SlashCommandBreakController();

    /** @type {{breakOnCondition?: (argValues: string[]) => boolean} | null} */
    #options;

    /**
     * @param {(arg0: string, ...args: string[]) => string} fn - The function to invoke on execute().
     * @param {{breakOnCondition?: (argValues: string[]) => boolean} | null} [options] - Optional configuration.
     */
    constructor(fn, options = null) {
        this.#fn = fn;
        this.#options = options;
    }

    /**
     * Executes the wrapped function with the provided argument values.
     *
     * @returns {Promise<{pipe: string, isBreak: boolean, isAborted: boolean}>}
     */
    async execute() {
        if (this.breakController?.isBreak) {
            return {
                pipe: '',
                isBreak: true,
                isAborted: false,
            };
        }

        if (this.#options?.breakOnCondition) {
            const argValues = this.providedArgumentList.map(a => a.value);

            if (this.#options.breakOnCondition(argValues)) {
                this.breakController.break();

                return {
                    pipe: '',
                    isBreak: true,
                    isAborted: false,
                };
            }
        }

        const argValues = this.providedArgumentList.map(a => a.value);

        const result = this.#fn(...argValues);

        return {
            pipe: result,
            isBreak: false,
            isAborted: false,
        };
    }
}
