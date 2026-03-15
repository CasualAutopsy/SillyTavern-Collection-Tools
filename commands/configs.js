import {
    ARGUMENT_TYPE,
    SlashCommandArgument,
    SlashCommandNamedArgument
} from '../../../../slash-commands/SlashCommandArgument.js';



// Command configuration constants
const LIST_PUSH_CONFIG = {
    name: 'list-push',
    aliases: ['arr-push'],
    returns: 'The list with the pushed value(s) || The new list\'s length',
    namedArgumentList: [
        SlashCommandNamedArgument.fromProps({
            name: 'noParse',
            description: "Don't parse values into their appropriate datatypes",
            typeList: [ARGUMENT_TYPE.BOOLEAN],
        }),
        SlashCommandNamedArgument.fromProps({
            name: 'jsReturn',
            aliasList: ['js'],
            description: 'Return the new list length instead of the list itself',
            typeList: [ARGUMENT_TYPE.BOOLEAN],
        }),
    ],
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The target list to push to',
            typeList: [ARGUMENT_TYPE.STRING, ARGUMENT_TYPE.LIST, ARGUMENT_TYPE.VARIABLE_NAME],
            isRequired: true,
        }),
        SlashCommandArgument.fromProps({
            description: 'The value(s) to push to the list',
            typeList: [ARGUMENT_TYPE.STRING, ARGUMENT_TYPE.NUMBER, ARGUMENT_TYPE.BOOLEAN],
            isRequired: true,
            acceptsMultiple: true,
        }),
    ],
    splitUnnamedArgument: true,
};

const LIST_POP_CONFIG = {
    name: 'list-pop',
    aliases: ['arr-pop'],
    returns: 'The popped value from the list || The list without the popped value',
    namedArgumentList: [
        SlashCommandNamedArgument.fromProps({
            name: 'swapReturn',
            aliasList: ['swap'],
            description: 'Swap the returned value with the value stored in the variable',
            typeList: [ARGUMENT_TYPE.BOOLEAN],
        }),
    ],
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The list to pop from',
            typeList: [ARGUMENT_TYPE.STRING, ARGUMENT_TYPE.LIST, ARGUMENT_TYPE.VARIABLE_NAME],
            isRequired: true,
        }),
    ],
    splitUnnamedArgument: false,
};

export const list_configs = {
    list_push: LIST_PUSH_CONFIG,
    list_pop: LIST_POP_CONFIG,
};
