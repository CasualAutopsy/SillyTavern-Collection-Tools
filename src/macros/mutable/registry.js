import {macroIsVarCheck, macroMutate, parseValue} from '../../../utils.js';

const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext();

const macros = context.macros;



export async function registerMutableListMacros() {
    // PUSH / POP

    // Register 'pushList' macro.
    macros.registry.registerMacro(
        'pushList',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The target list to push to.',
                    optional: false,
                },
            ],
            list: true,
            description: 'Pushes a value to a list.',
            returns: 'The updated list.',
            handler: ({unnamedArgs: [targetRaw], list: [...valuesRaw], resolve}) => {
                // Parse raw strings into appropriate types.
                const values = valuesRaw.map(item => parseValue(item));
                // Check if the target is a variable.
                const [target, shorthand] = macroIsVarCheck(targetRaw, resolve);

                let list;
                try { // Try to parse the target as JSON.
                    list = JSON.parse(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                list.push(...values);

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutate(list, resolve, shorthand);
                }

                // Return the updated list as a string.
                return JSON.stringify(list);
            }
        }
    );

    // Register 'popList' macro.
    macros.registry.registerMacro(
        'popList',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The target list to pop from.',
                    optional: false,
                },
            ],
            description: 'Pops a value from a list.',
            returns: 'The popped value.',
            handler: ({unnamedArgs: [targetRaw], resolve}) => {
                // Check if the target is a variable.
                const [target, shorthand] = macroIsVarCheck(targetRaw, resolve);

                let list;
                try { // Try to parse the target as JSON.
                    list = JSON.parse(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                const popped = list.pop();

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutate(list, resolve, shorthand);
                }

                // Return the popped value as a string.
                return typeof popped === 'object'
                    ? JSON.stringify(popped)
                    : String(popped);
            }
        }
    );

    // SHIFT / UNSHIFT

    // Register 'unshiftList' macro.
    macros.registry.registerMacro(
        'unshiftList',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The target list to unshift to.',
                    optional: false,
                }
            ],
            list: true,
            description: 'Unshifts a value to a list.',
            returns: 'The updated list.',
            handler: ({unnamedArgs: [targetRaw], list: [...valuesRaw], resolve}) => {
                // Parse raw strings into appropriate types.
                const values = valuesRaw.map(item => parseValue(item));
                // Check if the target is a variable.
                const [target, shorthand] = macroIsVarCheck(targetRaw, resolve);

                let list;
                try { // Try to parse the target as JSON.
                    list = JSON.parse(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                list.unshift(...values);

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutate(list, resolve, shorthand);
                }

                // Return the updated list as a string.
                return JSON.stringify(list);
            }
        }
    );

    // Register 'shiftList' macro.
    macros.registry.registerMacro(
        'shiftList',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The target list to shift from.',
                    optional: false,
                },
            ],
            description: 'Shifts a value from a list.',
            returns: 'The shifted value.',
            handler: ({unnamedArgs: [targetRaw], resolve}) => {
                // Check if the target is a variable.
                const [target, shorthand] = macroIsVarCheck(targetRaw, resolve);

                let list;
                try { // Try to parse the target as JSON.
                    list = JSON.parse(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                const shifted = list.shift();

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutate(list, resolve, shorthand);
                }

                // Return the shifted value as a string.
                return typeof shifted === 'object'
                    ? JSON.stringify(shifted)
                    : String(shifted);
            }
        }
    );
}
