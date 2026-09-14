import { STContext as ctx } from '../../../external/st-context.js';

import { fromEntriesCallback } from './trans-callbacks.js';

const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

async function initTransSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'dict-from-entries',
        callback: fromEntriesCallback,
        aliases: ['nox-dict-from-entries'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list of entries to turn into a dictionary',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME
                ],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'Dictionary from entries',
    }));
}

export default initTransSlashCMDs;
