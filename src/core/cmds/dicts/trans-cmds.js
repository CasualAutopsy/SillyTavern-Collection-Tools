import { STContext as ctx } from '../../../external/st-context.js';

import { fromEntriesCallback } from './trans-callbacks.js';


const { EnumProviders } = NoxLib.SlashHandlers;


const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;


const listAndShorthands = EnumProviders.shorthandAndValue('shorthand-w-scope', 'array');


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
                enumProvider: listAndShorthands,
                forceEnum: true,
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'Dictionary from entries',
    }));
}

export default initTransSlashCMDs;
