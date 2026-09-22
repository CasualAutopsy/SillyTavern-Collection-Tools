import { STContext as ctx } from "../../../external/st-context.js";

import {
    listIndexCallback,
    listEntriesCallback,
    listForEachCallback,
    listMapCallback, listFlatMapCallback,
    listFilterCallback,
    listReduceCallback, listReduceRightCallback
} from './enum-callbacks.js';

const { EnumProviders } = NoxLib.SlashHandlers;

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

const listAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "array");
const allAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "all");

async function initEnumSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-index',
        callback: listIndexCallback,
        aliases: ['nox-list-index'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to extract the index from',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: listAndShorthands,
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The list of the list\'s indices',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-entries',
        callback: listEntriesCallback,
        aliases: ['nox-list-entries'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to extract the entries from',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: listAndShorthands,
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The list of the list\'s entries',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-for-each',
        callback: listForEachCallback,
        aliases: ['nox-list-for-each'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to iterate over',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: listAndShorthands,
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for each item',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'void',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-map',
        callback: listMapCallback,
        aliases: ['nox-list-map'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to iterate over',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: listAndShorthands,
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'toType',
                description: 'the data type to convert the items to',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                isRequired: false,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for each item',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The mapped list',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-flat-map',
        callback: listFlatMapCallback,
        aliases: ['nox-list-flat-map'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to iterate over',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: listAndShorthands,
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'toType',
                description: 'the data type to convert the items to',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                isRequired: false,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for each item',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The mapped and flattened list',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-filter',
        callback: listFilterCallback,
        aliases: ['nox-list-filter'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to iterate over',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: listAndShorthands,
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for each item',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The filtered list',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-reduce',
        callback: listReduceCallback,
        aliases: ['nox-list-reduce'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to reduce',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: listAndShorthands,
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'initial',
                description: 'the initial value to use for reducing',
                typeList: [
                    ARGUMENT_TYPE.VARIABLE_NAME,
                    ARGUMENT_TYPE.STRING,
                    ARGUMENT_TYPE.NUMBER,
                    ARGUMENT_TYPE.BOOLEAN,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.LIST,
                ],
                enumProvider: allAndShorthands,
                isRequired: false,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for reducing',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The reduced value',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-reduce-right',
        callback: listReduceRightCallback,
        aliases: ['nox-list-reduce-right'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to reduce',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: listAndShorthands,
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'initial',
                description: 'the initial value to use for reducing',
                typeList: [
                    ARGUMENT_TYPE.VARIABLE_NAME,
                    ARGUMENT_TYPE.STRING,
                    ARGUMENT_TYPE.NUMBER,
                    ARGUMENT_TYPE.BOOLEAN,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.LIST,
                ],
                enumProvider: allAndShorthands,
                isRequired: false,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for reducing',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The reduced value',
    }));
}

export default initEnumSlashCMDs;
