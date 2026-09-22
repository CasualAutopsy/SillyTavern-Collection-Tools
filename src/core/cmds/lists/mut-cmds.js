import { STContext as ctx } from '../../../external/st-context.js';

import {
    listPopCallback, listPushCallback,
    listUnshiftCallback, listShiftCallback,
    listFillCallback, listCopyWithinCallback,
    listSortCallback, listReverseCallback
} from './mut-callbacks.js';

const { EnumProviders } = NoxLib.SlashHandlers;

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

const listAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "array");

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
                enumProvider: listAndShorthands,
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
                enumProvider: listAndShorthands,
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
                enumProvider: listAndShorthands,
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
                enumProvider: listAndShorthands,
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The shifted value',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-fill',
        callback: listFillCallback,
        aliases: ['nox-list-fill'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'value',
                description: 'the value to fill the list with',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                isRequired: true,
            }),
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
                description: 'the list to fill',
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
        returns: 'The filled list',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-copy-within',
        callback: listCopyWithinCallback,
        aliases: ['nox-list-copy-within'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'target',
                description: 'the target index',
                typeList: [
                    ARGUMENT_TYPE.NUMBER,
                ],
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'start',
                description: 'the start index',
                typeList: [
                    ARGUMENT_TYPE.NUMBER,
                ],
                isRequired: true,
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
                description: 'the list to copy within',
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
        returns: 'The copied within list',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-sort',
        callback: listSortCallback,
        aliases: ['nox-list-sort'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to sort',
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
        returns: 'The sorted list',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-reverse',
        callback: listReverseCallback,
        aliases: ['nox-list-reverse'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to reverse',
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
        returns: 'The reversed list',
    }));
}

export default initMutSlashCMDs;
