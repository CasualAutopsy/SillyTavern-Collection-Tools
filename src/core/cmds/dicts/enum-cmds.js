import { STContext as ctx } from '../../../external/st-context.js';

import { getKeysCallback, getValuesCallback, getEntriesCallback } from './enum-callbacks.js';

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

async function initEnumSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'dict-get-keys',
        callback: getKeysCallback,
        aliases: ['nox-dict-get-keys'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the dictionary to get keys from',
                typeList: [
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME
                ],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'List of dict keys',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'dict-get-values',
        callback: getValuesCallback,
        aliases: ['nox-dict-get-values'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the dictionary to get values from',
                typeList: [
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME
                ],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'List of dict values',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'dict-get-entries',
        callback: getEntriesCallback,
        aliases: ['nox-dict-get-entries'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the dictionary to get entries from',
                typeList: [
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME
                ],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'List of dict key/value entries',
    }));
}

export default initEnumSlashCMDs;
