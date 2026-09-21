import { STContext as ctx } from '../../../external/st-context.js';

import {
    listIncludesCallback,
    listEveryCallback,
    listSomeCallback
} from './test-callbacks.js';

const { EnumProviders } = NoxLib.SlashHandlers;

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

const listAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "array");

async function initTestSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-includes',
        callback: listIncludesCallback,
        aliases: ['nox-list-includes'],
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
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: listAndShorthands,
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
                enumProvider: listAndShorthands,
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'Whether the list includes the item',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-every',
        callback: listEveryCallback,
        aliases: ['nox-list-every'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to test against',
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
                description: 'the closure to test with',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'Whether every item in the list satisfies the condition',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-some',
        callback: listSomeCallback,
        aliases: ['nox-list-some'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to test against',
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
                description: 'the closure to test with',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'Whether any item in the list satisfies the condition',
    }));
}

export default initTestSlashCMDs;
