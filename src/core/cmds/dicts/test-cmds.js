import { STContext as ctx } from '../../../external/st-context.js';

import {
    dictHasOwnCallback
} from './test-callbacks.js';

const { EnumProviders } = NoxLib.SlashHandlers;

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

const dictAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "object");

async function initTestSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'dict-has-own',
        callback: dictHasOwnCallback,
        aliases: ['nox-dict-has-own'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'find',
                description: 'the key to find',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the dictionary to search',
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
        returns: 'Whether the dictionary has the key',
    }));
}

export default initTestSlashCMDs;
