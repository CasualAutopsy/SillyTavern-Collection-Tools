import {parseInt} from "lodash-es";

const {parseValue, parseJSON}
    = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js')
    , {macroParseVar, macroMutateVar}
    = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/macro-parsing.js');



export async function registerMutableListMacros() {
    const {registerMacro}
        = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext().macros.registry;

    // PUSH / POP

    // Register 'pushList' macro.
    registerMacro(
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
                const values = valuesRaw.map(item => parseValue(macroParseVar(item, resolve)[0]));
                // Check if the target is a variable.
                const [target, shorthand] = macroParseVar(targetRaw, resolve);

                let list;
                try { // Try to parse the target as JSON.
                    list = parseJSON(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                list.push(...values);

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutateVar(list, resolve, shorthand);
                }

                // Return the updated list as a string.
                return JSON.stringify(list);
            }
        }
    );

    // Register 'popList' macro.
    registerMacro(
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
                const [target, shorthand] = macroParseVar(targetRaw, resolve);

                let list;
                try { // Try to parse the target as JSON.
                    list = parseJSON(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                const popped = list.pop();

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutateVar(list, resolve, shorthand);
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
    registerMacro(
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
                const values = valuesRaw.map(item => parseValue(macroParseVar(item, resolve)[0]));
                // Check if the target is a variable.
                const [target, shorthand] = macroParseVar(targetRaw, resolve);

                let list;
                try { // Try to parse the target as JSON.
                    list = parseJSON(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                list.unshift(...values);

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutateVar(list, resolve, shorthand);
                }

                // Return the updated list as a string.
                return JSON.stringify(list);
            }
        }
    );

    // Register 'shiftList' macro.
    registerMacro(
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
                const [target, shorthand] = macroParseVar(targetRaw, resolve);

                let list;
                try { // Try to parse the target as JSON.
                    list = parseJSON(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                const shifted = list.shift();

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutateVar(list, resolve, shorthand);
                }

                // Return the shifted value as a string.
                return typeof shifted === 'object'
                    ? JSON.stringify(shifted)
                    : String(shifted);
            }
        }
    );

    // SPLICE

    // Register 'spliceList' macro.
    registerMacro(
        'spliceList',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'start',
                    description: 'The index to start splicing at.',
                    optional: false,
                },
                {
                    name: 'delete',
                    description: 'The number of items to delete.',
                    optional: false,
                },
                {
                    name: 'target',
                    description: 'The target list to splice.',
                    optional: false,
                },
            ],
            list: true,
            description: 'Splices values from a list.',
            returns: 'The spliced list. || The deleted values.',
            handler: ({unnamedArgs: [startRaw, deleteRaw, targetRaw], list: [...valuesRaw], resolve}) => {
                // Parse start and delete as integers.
                const startVal = parseInt(startRaw)
                    , deleteVal = parseInt(deleteRaw);
                // Parse raw strings into appropriate types.
                const values = valuesRaw.map(item => parseValue(macroParseVar(item, resolve)[0]));
                // Check if target is a variable.
                const [target, shorthand] = macroParseVar(targetRaw, resolve);

                let list;
                try { // Try to parse target as JSON.
                    list = parseJSON(target);
                } catch { // If it fails, log an error and return an empty string.-
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                list.splice(startVal, deleteVal, ...values);

                if (shorthand) { // if the target is a variable, update it with the new list.
                    macroMutateVar(list, resolve, shorthand);
                }

                // Return the updated list as a string.
                return JSON.stringify(list);
            },
        }
    );

    // SORT / REVERSE

    // Register 'sortList' macro.
    registerMacro(
        'sortList',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The target list to sort.',
                    optional: false,
                },
            ],
            description: 'Sorts values in a list.',
            returns: 'The sorted list.',
            handler: ({unnamedArgs: [targetRaw], resolve}) => {
                // Check if the target is a variable.
                const [target, shorthand] = macroParseVar(targetRaw, resolve);

                let list;
                try { // Try to parse target as JSON.
                    list = parseJSON(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                list.sort();

                if (shorthand) { // if the target is a variable, update it with the new list.
                    macroMutateVar(list, resolve, shorthand);
                }

                // Return the updated list as a string.
                return JSON.stringify(list);
            }
        }
    );

    // Register 'reverseList' macro.
    registerMacro(
        'reverseList',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The target list to reverse.',
                    optional: false,
                },
            ],
            description: 'Reverses the order of values in a list.',
            returns: 'The reversed list.',
            handler: ({unnamedArgs: [targetRaw], resolve}) => {
                // Check if the target is a variable.
                const [target, shorthand] = macroParseVar(targetRaw, resolve);

                let list;
                try { // Try to parse target as JSON.
                    list = parseJSON(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                list.reverse();

                if (shorthand) { // if the target is a variable, update it with the new list.
                    macroMutateVar(list, resolve, shorthand);
                }

                // Return the updated list as a string.
                return JSON.stringify(list);
            }
        }
    );

    // FILL / COPYWITHIN

    // Register 'fillList' macro.
    registerMacro(
        'fillList',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The target list to fill.',
                    optional: false,
                },
                {
                    name: 'value',
                    description: 'The value to fill the list with.',
                    optional: false,
                },
            ],
            description: 'Fills a list with a specified value.',
            returns: 'The filled list.',
            handler: ({unnamedArgs: [targetRaw, valueRaw], resolve}) => {
                // Parse the value into the appropriate type.
                const value = parseValue(macroParseVar(valueRaw, resolve)[0]);
                // Check if the target is a variable.
                const [target, shorthand] = macroParseVar(targetRaw, resolve);

                let list;
                try { // Try to parse the target as JSON.
                    list = parseJSON(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                list.fill(value);

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutateVar(list, resolve, shorthand);
                }

                // Return the updated list as a string.
                return JSON.stringify(list);
            }
        }
    );

    // Register 'fillListRange' macro.
    registerMacro(
        'fillListRange',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'start',
                    description: 'The starting index of the range to fill.',
                    optional: false,
                },
                {
                    name: 'end',
                    description: 'The ending index of the range to fill.',
                    optional: false,
                },
                {
                    name: 'target',
                    description: 'The target list to fill.',
                    optional: false,
                },
                {
                    name: 'value',
                    description: 'The value to fill the list with.',
                    optional: false,
                },
            ],
            description: 'Fills a range of indices in a list with a specified value.',
            returns: 'The filled list.',
            handler: ({unnamedArgs: [startRaw, endRaw, targetRaw, valueRaw], resolve}) => {
                // Parse start and end as integers.
                const start = parseInt(startRaw)
                    , end = parseInt(endRaw);
                // Parse the value into the appropriate type.
                const value = parseValue(macroParseVar(valueRaw, resolve)[0]);
                // Check if the target is a variable.
                const [target, shorthand] = macroParseVar(targetRaw, resolve);

                let list;
                try { // Try to parse the target as JSON.
                    list = parseJSON(target);
                } catch { // If it fails, log an error, and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                list.fill(value, start, end);

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutateVar(list, resolve, shorthand);
                }

                // Return the updated list as a string.
                return JSON.stringify(list);
            }
        }
    );

    // Register 'copyWithinList' macro.
    registerMacro(
        'copyWithinList',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'copyStart',
                    description: 'The index to start copying from.',
                    optional: false,
                },
                {
                    name: 'target',
                    description: 'The target list to copy within.',
                    optional: false,
                },
            ],
            description: 'Copies a portion of a list to another location within the list.',
            returns: 'The list with the copied portion.',
            handler: ({unnamedArgs: [copyStartRaw, targetRaw], resolve}) => {
                // Parse copyStart as an integer.
                const copyStart = parseInt(copyStartRaw);
                // Check if target is a variable.
                const [target, shorthand] = macroParseVar(targetRaw, resolve);

                let list;
                try { // Try to parse the target as JSON.
                    list = parseJSON(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                list.copyWithin(target, copyStart);

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutateVar(list, resolve, shorthand);
                }

                // Return the updated list as a string.
                return JSON.stringify(list);
            }
        }
    );

    // Register 'copyWithinListRange' macro.
    registerMacro(
        'copyWithinListRange',
        {
            category: 'List Utilities',
            unnamedArgs: [
                {
                    name: 'copyStart',
                    description: 'The index to start copying from.',
                    optional: false,
                },
                {
                    name: 'copyEnd',
                    description: 'The index to stop copying at.',
                    optional: false,
                },
                {
                    name: 'target',
                    description: 'The target list to copy within.',
                    optional: false,
                },
            ],
            description: 'Copies a range of elements within a list to another location within the list.',
            returns: 'The list with the copied portion.',
            handler: ({unnamedArgs: [copyStartRaw, copyEndRaw, targetRaw], resolve}) => {
                // Parse copyStart and copyEnd as integers.
                const copyStart = parseInt(copyStartRaw)
                    , copyEnd = parseInt(copyEndRaw);
                // Check if target is a variable.
                const [target, shorthand] = macroParseVar(targetRaw, resolve);

                let list;
                try { // Try to parse target as JSON.
                    list = parseJSON(target);
                } catch { // If it fails, log an error and return an empty string.
                    console.error('[Collection Tools]Invalid JSON: ' + target);
                    return '';
                }

                list.copyWithin(target, copyStart, copyEnd);

                if (shorthand) { // If the target is a variable, update it with the new list.
                    macroMutateVar(list, resolve, shorthand);
                }

                // Return the updated list as a string.
                return JSON.stringify(list);
            }
        }
    );
}
