// @ts-nocheck
/* eslint-disable no-undef */
const {noxEnumProvider} = (await import(/* webpackIgnore: true */'/scripts/extensions/third-party/STLibs-Nox-Library/scripts/enum-provider.js'));

const {
    SlashCommandArgument, SlashCommandNamedArgument,
    ARGUMENT_TYPE
} = SillyTavern.getContext();

const
    string_type = ARGUMENT_TYPE.STRING,
    number_type = ARGUMENT_TYPE.NUMBER,
    boolean_type = ARGUMENT_TYPE.BOOLEAN,
    list_type = ARGUMENT_TYPE.LIST,
    dict_type = ARGUMENT_TYPE.DICTIONARY,
    var_type = ARGUMENT_TYPE.VARIABLE_NAME;

const
    shorthandAndValueEnum = noxEnumProvider.shorthandAndValue('shorthand-w-scope', 'all'),
    shorthandAndListEnum = noxEnumProvider.shorthandAndValue('shorthand-w-scope', 'array');

// Command configuration constants

// PUSH / POP

export const LIST_PUSH_CONFIG = {
    name: 'list-push',
    aliases: ['arr-push', 'nox-list-push'],
    returns: 'The list with the pushed value(s) || The new list\'s length',
    namedArgumentList: [
        SlashCommandNamedArgument.fromProps({
            name: 'noParse',
            description: "Don't parse values into their appropriate datatypes",
            typeList: [boolean_type],
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'jsReturn',
            aliasList: ['js'],
            description: 'Return the new list length instead of the list itself',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The target list to push to',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
            enumProvider: shorthandAndListEnum,
        }),
        SlashCommandArgument.fromProps({
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
            enumProvider: shorthandAndValueEnum,
        }),
    ],
    splitUnnamedArgument: true,
};

export const LIST_POP_CONFIG = {
    name: 'list-pop',
    aliases: ['arr-pop', 'nox-list-pop'],
    returns: 'The popped value from the list || The list without the popped value',
    namedArgumentList: [
        SlashCommandNamedArgument.fromProps({
            name: 'swapReturn',
            aliasList: ['swap'],
            description: 'Swap the returned value with the value stored in the variable',
            typeList: [boolean_type],
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'jsReturn',
            aliasList: ['js'],
            description: 'Return the popped value instead of the list',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The list to pop from',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
            enumProvider: shorthandAndListEnum,
        }),
    ],
};

// SHIFT / UNSHIFT

export const LIST_UNSHIFT_CONFIG = {
    name: 'list-unshift',
    aliases: ['arr-unshift', 'nox-list-unshift'],
    returns: 'The list with the unshifted value(s) || The new list\'s length',
    namedArgumentList: [
        SlashCommandNamedArgument.fromProps({
            name: 'noParse',
            description: "Don't parse values into their appropriate datatypes",
            typeList: [boolean_type],
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'jsReturn',
            aliasList: ['js'],
            description: 'Return the new list length instead of the list itself',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The target list to unshift to',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
            enumProvider: shorthandAndListEnum,
        }),
        SlashCommandArgument.fromProps({
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
            enumProvider: shorthandAndValueEnum,
        }),
    ],
    splitUnnamedArgument: true,
};

export const LIST_SHIFT_CONFIG = {
    name: 'list-shift',
    aliases: ['arr-shift', 'nox-list-shift'],
    returns: 'The shifted value from the list || The list without the shifted value',
    namedArgumentList: [
        SlashCommandNamedArgument.fromProps({
            name: 'swapReturn',
            aliasList: ['swap'],
            description: 'Swap the returned value with the value stored in the variable',
            typeList: [boolean_type],
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'jsReturn',
            aliasList: ['js'],
            description: 'Return the shifted value instead of the list',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The list to shift from',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
            enumProvider: shorthandAndListEnum,
        }),
    ],
};

// SPLICE

export const LIST_SPLICE_CONFIG = {
    name: 'list-splice',
    aliases: ['arr-splice', 'nox-list-splice'],
    returns: 'The spliced list || The deleted elements',
    namedArgumentList: [
        SlashCommandNamedArgument.fromProps({
            name: 'start',
            description: 'The index to start splicing from',
            typeList: [number_type],
            isRequired: true,
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'del',
            description: 'The number of elements to delete',
            typeList: [number_type],
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'noParse',
            description: "Don't parse values into their appropriate datatypes",
            typeList: [boolean_type],
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'jsReturn',
            aliasList: ['js'],
            description: 'Return the deleted elements instead of the spliced list',
            typeList: [boolean_type],
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'swapReturn',
            aliasList: ['swap'],
            description: 'Swap the returned value with the value stored in the variable',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The target list to splice',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
            enumProvider: shorthandAndListEnum,
        }),
        SlashCommandArgument.fromProps({
            description: 'The value(s) to add to the spliced list',
            typeList: [
                string_type,
                number_type,
                boolean_type,
                list_type,
                dict_type,
            ],
            acceptsMultiple: true,
            enumProvider: shorthandAndValueEnum,
        })
    ],
    splitUnnamedArgument: true,
};

// SORT / REVERSE

export const LIST_SORT_CONFIG = {
    name: 'list-sort',
    aliases: ['arr-sort', 'nox-list-sort'],
    returns: 'The sorted list',
    namedArgumentList: [
        SlashCommandNamedArgument.fromProps({
            name: 'reverse',
            description: 'Sort the list in reverse order',
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The target list to sort',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
            enumProvider: shorthandAndListEnum,
        })
    ],
};

export const LIST_REVERSE_CONFIG = {
    name: 'list-reverse',
    aliases: ['arr-reverse', 'nox-list-reverse'],
    returns: 'The reversed list',
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The target list to reverse',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
            enumProvider: shorthandAndListEnum,
        }),
    ],
};

// FILL / COPYWITHIN

export const LIST_FILL_CONFIG = {
    name: 'list-fill',
    aliases: ['arr-fill', 'nox-list-fill'],
    returns: 'The filled list',
    namedArgumentList: [
        SlashCommandNamedArgument.fromProps({
            name: 'start',
            description: 'The index to start filling from',
            typeList: [number_type],
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'end',
            description: 'The index to end filling at',
            typeList: [number_type],
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'noParse',
            description: "Don't parse values into their appropriate datatypes",
            typeList: [boolean_type],
        }),
    ],
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The target list to fill',
            typeList: [string_type, list_type, var_type],
            isRequired: true,
            enumProvider: shorthandAndListEnum,
        }),
        SlashCommandArgument.fromProps({
            description: 'The value to fill the list with',
            typeList: [
                string_type,
                number_type,
                boolean_type,
                list_type,
                dict_type,
            ],
            isRequired: true,
            enumProvider: shorthandAndValueEnum,
        }),
    ],
    splitUnnamedArgument: true,
    splitUnnamedArgumentCount: 2,
};

export const LIST_COPYWITHIN_CONFIG = {
    name: 'list-copywithin',
    aliases: ['arr-copywithin', 'nox-list-copywithin'],
    returns: 'The list with the copied elements',
    namedArgumentList: [
        SlashCommandNamedArgument.fromProps({
            name: 'target',
            description: 'The index to start copying to',
            typeList: [number_type],
            isRequired: true,
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'start',
            description: 'The index to start copying from',
            typeList: [number_type],
            isRequired: true,
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'end',
            description: 'The index to end copying at',
            typeList: [number_type],
        }),
    ],
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The target list to copy within',
            typeList: [
                string_type,
                list_type,
                var_type,
            ],
            isRequired: true,
            enumProvider: shorthandAndListEnum,
        }),
    ],
};
