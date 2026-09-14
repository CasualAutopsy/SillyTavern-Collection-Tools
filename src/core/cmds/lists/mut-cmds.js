import { STContext as ctx } from '../../../external/st-context.js';

import {
    listPopCallback, listPushCallback,
    listUnshiftCallback, listShiftCallback
} from './mut-callbacks.js';

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

async function initMutSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-push',
        callback: listPushCallback,
        aliases: ['nox-list-push'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to push items to',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
            SlashCommandArgument.fromProps({
                description: 'the items to push to the list',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                isRequired: true,
                acceptsMultiple: true,
            }),
        ],
        splitUnnamedArgument: true,
        helpString: '',
        returns: 'The new length of the list',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-pop',
        callback: listPopCallback,
        aliases: ['nox-list-pop'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to pop items from',
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
        returns: 'The popped value',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-unshift',
        callback: listUnshiftCallback,
        aliases: ['nox-list-unshift'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to unshift items to',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
            SlashCommandArgument.fromProps({
                description: 'the items to unshift to the list',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                isRequired: true,
                acceptsMultiple: true,
            }),
        ],
        splitUnnamedArgument: true,
        helpString: '',
        returns: 'The new length of the list',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-shift',
        callback: listShiftCallback,
        aliases: ['nox-list-shift'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to shift items from',
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
        returns: 'The shifted value',
    }));
}

export default initMutSlashCMDs;
