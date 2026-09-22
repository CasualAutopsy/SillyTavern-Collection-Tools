import { STContext as ctx } from '../../../external/st-context.js';

import {
    listWithCallback,
    listSliceCallback,
    listConcatCallback,
    listFlatCallback
} from './trans-callbacks.js';

const { EnumProviders } = NoxLib.SlashHandlers;

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

const listAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "array");
const allAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "all");

async function initTransSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-with',
        callback: listWithCallback,
        aliases: ['nox-list-with'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'index',
                description: 'the index of the item to replace',
                typeList: [
                    ARGUMENT_TYPE.NUMBER,
                ],
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'list',
                description: 'the list to replace an item from',
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
                description: 'the value to replace the item with',
                typeList: [
                    ARGUMENT_TYPE.VARIABLE_NAME,
                    ARGUMENT_TYPE.STRING,
                    ARGUMENT_TYPE.NUMBER,
                    ARGUMENT_TYPE.BOOLEAN,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.LIST,
                ],
                enumProvider: allAndShorthands,
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The list with the replaced item',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-slice',
        callback: listSliceCallback,
        aliases: ['nox-list-slice'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'start',
                description: 'the start index',
                typeList: [
                    ARGUMENT_TYPE.NUMBER,
                ],
                isRequired: false,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'end',
                description: 'the end index',
                typeList: [
                    ARGUMENT_TYPE.NUMBER,
                ],
                isRequired: false,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to slice',
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
        returns: 'The sliced values',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-concat',
        callback: listConcatCallback,
        aliases: ['nox-list-concat'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to concatenate',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: listAndShorthands,
                isRequired: true,
                acceptsMultiple: true,
            }),
        ],
        splitUnnamedArgument: true,
        helpString: '',
        returns: 'The concatenated list',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-flat',
        callback: listFlatCallback,
        aliases: ['nox-list-flat'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'depth',
                description: 'the depth to flatten to',
                typeList: [
                    ARGUMENT_TYPE.NUMBER,
                ],
                isRequired: false,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to flatten',
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
        returns: 'The flattened list',
    }));
}

export default initTransSlashCMDs;
