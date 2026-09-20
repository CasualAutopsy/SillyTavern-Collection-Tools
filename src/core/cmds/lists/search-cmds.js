import { STContext as ctx } from '../../../external/st-context.js';

import {
    listAtCallback,
    listIndexOfCallback, listLastIndexOfCallback,
    listFindCallback, listFindLastCallback,
    listFindIndexCallback, listFindLastIndexCallback
} from './search-callbacks.js';

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

async function initSearchSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-at',
        callback: listAtCallback,
        aliases: ['nox-list-at'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'index',
                description: 'the index of the item to get',
                typeList: [
                    ARGUMENT_TYPE.NUMBER,
                ],
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to get the item from',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The item at the index',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-index-of',
        callback: listIndexOfCallback,
        aliases: ['nox-list-index-of'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'parse',
                description: 'whether to parse the search element\'s data type',
                typeList: [
                    ARGUMENT_TYPE.BOOLEAN,
                ],
                isRequired: false,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'search',
                description: 'the item to search for',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to search in',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The index of the first occurrence of the item',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-last-index-of',
        callback: listLastIndexOfCallback,
        aliases: ['nox-list-last-index-of'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'parse',
                description: 'whether to parse the search element\'s data type',
                typeList: [
                    ARGUMENT_TYPE.BOOLEAN,
                ],
                isRequired: false,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'search',
                description: 'the item to search for',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to search in',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The index of the last occurrence of the item',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-find',
        callback: listFindCallback,
        aliases: ['nox-list-find'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to search in',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for searching',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The first item that satisfies the condition',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-find-last',
        callback: listFindLastCallback,
        aliases: ['nox-list-find-last'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to search in',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for searching',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The last item that satisfies the condition',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-find-index',
        callback: listFindIndexCallback,
        aliases: ['nox-list-find-index'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to search in',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for searching',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The index of the first item that satisfies the condition',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-find-last-index',
        callback: listFindLastIndexCallback,
        aliases: ['nox-list-find-last-index'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to search in',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for searching',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The index of the last item that satisfies the condition',
    }));
}

export default initSearchSlashCMDs;
