const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext();

const slash_named_arg = context.SlashCommandNamedArgument;
const slash_arg = context.SlashCommandArgument;

const arg_types = context.ARGUMENT_TYPE;

const string_type = arg_types.STRING;
const number_type = arg_types.NUMBER;
const boolean_type = arg_types.BOOLEAN;
const list_type = arg_types.LIST;
const dict_type = arg_types.DICTIONARY;
const var_type = arg_types.VARIABLE_NAME;



// Command configuration constants

// PUSH / POP

const LIST_PUSH_CONFIG = {
    name: 'list-push',
    aliases: ['arr-push', 'nox-list-push'],
    returns: 'The list with the pushed value(s) || The new list\'s length',
    namedArgumentList: [
        slash_named_arg.fromProps({
            name: 'noParse',
            description: "Don't parse values into their appropriate datatypes",
            typeList: [boolean_type],
        }),
        slash_named_arg.fromProps({
            name: 'jsReturn',
            aliasList: ['js'],
            description: 'Return the new list length instead of the list itself',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target list to push to',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
        }),
        slash_arg.fromProps({
            description: 'The value(s) to push to the list',
            typeList: [
                string_type,
                number_type,
                boolean_type,
                list_type,
                dict_type,
            ],
            isRequired: true,
            acceptsMultiple: true,
        }),
    ],
    splitUnnamedArgument: true,
};

const LIST_POP_CONFIG = {
    name: 'list-pop',
    aliases: ['arr-pop', 'nox-list-pop'],
    returns: 'The popped value from the list || The list without the popped value',
    namedArgumentList: [
        slash_named_arg.fromProps({
            name: 'swapReturn',
            aliasList: ['swap'],
            description: 'Swap the returned value with the value stored in the variable',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The list to pop from',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
        }),
    ],
};

// SHIFT / UNSHIFT

const LIST_UNSHIFT_CONFIG = {
    name: 'list-unshift',
    aliases: ['arr-unshift', 'nox-list-unshift'],
    returns: 'The list with the unshifted value(s) || The new list\'s length',
    namedArgumentList: [
        slash_named_arg.fromProps({
            name: 'noParse',
            description: "Don't parse values into their appropriate datatypes",
            typeList: [boolean_type],
        }),
        slash_named_arg.fromProps({
            name: 'jsReturn',
            aliasList: ['js'],
            description: 'Return the new list length instead of the list itself',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target list to unshift to',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
        }),
        slash_arg.fromProps({
            description: 'The value(s) to unshift to the list',
            typeList: [
                string_type,
                number_type,
                boolean_type,
                list_type,
                dict_type,
            ],
            isRequired: true,
            acceptsMultiple: true,
        }),
    ],
    splitUnnamedArgument: true,
};

const LIST_SHIFT_CONFIG = {
    name: 'list-shift',
    aliases: ['arr-shift', 'nox-list-shift'],
    returns: 'The shifted value from the list || The list without the shifted value',
    namedArgumentList: [
        slash_named_arg.fromProps({
            name: 'swapReturn',
            aliasList: ['swap'],
            description: 'Swap the returned value with the value stored in the variable',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The list to shift from',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
        }),
    ],
};

// SPLICE

const LIST_SPLICE_CONFIG = {
    name: 'list-splice',
    aliases: ['arr-splice', 'nox-list-splice'],
    returns: 'The spliced list || The deleted elements',
    namedArgumentList: [
        slash_named_arg.fromProps({
            name: 'start',
            description: 'The index to start splicing from',
            typeList: [number_type],
            isRequired: true,
        }),
        slash_named_arg.fromProps({
            name: 'del',
            description: 'The number of elements to delete',
            typeList: [number_type],
        }),
        slash_named_arg.fromProps({
            name: 'noParse',
            description: "Don't parse values into their appropriate datatypes",
            typeList: [boolean_type],
        }),
        slash_named_arg.fromProps({
            name: 'jsReturn',
            aliasList: ['js'],
            description: 'Return the deleted elements instead of the spliced list',
            typeList: [boolean_type],
        }),
        slash_named_arg.fromProps({
            name: 'swapReturn',
            aliasList: ['swap'],
            description: 'Swap the returned value with the value stored in the variable',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target list to splice',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
        }),
        slash_arg.fromProps({
            description: 'The value(s) to add to the spliced list',
            typeList: [
                string_type,
                number_type,
                boolean_type,
                list_type,
                dict_type,
            ],
            acceptsMultiple: true,
        })
    ],
    splitUnnamedArgument: true,
};

// SORT / REVERSE

const LIST_SORT_CONFIG = {
    name: 'list-sort',
    aliases: ['arr-sort', 'nox-list-sort'],
    returns: 'The sorted list',
    namedArgumentList: [
        slash_named_arg.fromProps({
            name: 'reverse',
            description: 'Sort the list in reverse order',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target list to sort',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
        })
    ],
};

const LIST_REVERSE_CONFIG = {
    name: 'list-reverse',
    aliases: ['arr-reverse', 'nox-list-reverse'],
    returns: 'The reversed list',
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target list to reverse',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
        }),
    ],
};

// FILL / COPYWITHIN

const LIST_FILL_CONFIG = {
    name: 'list-fill',
    aliases: ['arr-fill', 'nox-list-fill'],
    returns: 'The filled list',
    namedArgumentList: [
        slash_named_arg.fromProps({
            name: 'start',
            description: 'The index to start filling from',
            typeList: [number_type],
        }),
        slash_named_arg.fromProps({
            name: 'end',
            description: 'The index to end filling at',
            typeList: [number_type],
        }),
        slash_named_arg.fromProps({
            name: 'noParse',
            description: "Don't parse values into their appropriate datatypes",
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target list to fill',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
        }),
        slash_arg.fromProps({
            description: 'The value to fill the list with',
            typeList: [
                string_type,
                number_type,
                boolean_type,
                list_type,
                dict_type,
            ],
            isRequired: true,
        }),
    ],
    splitUnnamedArgument: true,
    splitUnnamedArgumentCount: 2,
};

const LIST_COPYWITHIN_CONFIG = {
    name: 'list-copywithin',
    aliases: ['arr-copywithin', 'nox-list-copywithin'],
    returns: 'The list with the copied elements',
    namedArgumentList: [
        slash_named_arg.fromProps({
            name: 'target',
            description: 'The index to start copying to',
            typeList: [number_type],
            isRequired: true,
        }),
        slash_named_arg.fromProps({
            name: 'start',
            description: 'The index to start copying from',
            typeList: [number_type],
            isRequired: true,
        }),
        slash_named_arg.fromProps({
            name: 'end',
            description: 'The index to end copying at',
            typeList: [number_type],
        }),
    ],
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target list to copy within',
            typeList: [
                string_type,
                list_type,
                var_type,
            ],
            isRequired: true,
        }),
    ],
};

export const list_configs = {
    list_push: LIST_PUSH_CONFIG,
    list_pop: LIST_POP_CONFIG,
    list_unshift: LIST_UNSHIFT_CONFIG,
    list_shift: LIST_SHIFT_CONFIG,
    list_splice: LIST_SPLICE_CONFIG,
    list_sort: LIST_SORT_CONFIG,
    list_reverse: LIST_REVERSE_CONFIG,
    list_fill: LIST_FILL_CONFIG,
    list_copywithin: LIST_COPYWITHIN_CONFIG
};
