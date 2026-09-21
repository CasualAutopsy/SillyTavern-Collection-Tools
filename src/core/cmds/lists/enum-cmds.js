import { STContext as ctx } from "../../../external/st-context.js";

import {
    listForEachCallback,
    listMapCallback
} from './enum-callbacks.js';

const { EnumProviders } = NoxLib.SlashHandlers;

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

const listAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "array");

async function initEnumSlashCMDs() {
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
}

export default initEnumSlashCMDs;
