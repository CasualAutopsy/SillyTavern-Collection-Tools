import { STContext as ctx } from '../../../external/st-context.js';

import {
    dictAssignCallback, dictDeleteCallback,
    dictDefineCallback, dictMultiDefineCallback
} from './mut-callbacks.js';

const { EnumProviders } = NoxLib.SlashHandlers;

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

const dictAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "object");
const allAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "all");

async function initMutSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'dict-assign',
        callback: dictAssignCallback,
        aliases: ['nox-dict-assign'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'target',
                description: 'the dictionary to assign to',
                typeList: [
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: dictAndShorthands,
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the dictionary to assign from',
                typeList: [
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: dictAndShorthands,
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The dictionary with assigned values',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'dict-delete',
        callback: dictDeleteCallback,
        aliases: ['nox-dict-delete'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'key',
                description: 'the key to delete',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the dictionary to delete from',
                typeList: [
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: dictAndShorthands,
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The dictionary with deleted key',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'dict-define',
        callback: dictDefineCallback,
        aliases: ['nox-dict-define'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'key',
                description: 'the key to define',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'value',
                description: 'the value to define',
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
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the dictionary to define a property in',
                typeList: [
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE,
                ],
                enumProvider: dictAndShorthands,
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The dictionary with defined property',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'dict-multi-define',
        callback: dictMultiDefineCallback,
        aliases: ['nox-dict-multi-define'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'target',
                description: 'the dictionary to define properties in',
                typeList: [
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: dictAndShorthands,
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the dictionary of properties to define',
                typeList: [
                    ARGUMENT_TYPE.DICTIONARY,
                ],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The dictionary with defined properties',
    }));
}

export default initMutSlashCMDs;
