import { STContext as ctx } from '../../../external/st-context.js';

import {
    listSliceCallback,
    listConcatCallback,
    listFlatCallback
} from './trans-callbacks.js';

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

async function initTransSlashCMDs() {
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
