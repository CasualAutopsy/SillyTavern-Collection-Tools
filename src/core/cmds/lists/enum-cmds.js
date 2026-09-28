import { STContext as ctx } from '../../../external/st-context.js';

import {
    listZipCallback,
} from './enum-callbacks.js';


const { EnumProviders } = NoxLib.SlashHandlers;


const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;


const listAndShorthands = EnumProviders.shorthandAndValue('shorthand-w-scope', 'array');


async function initEnumSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-zip',
        callback: listZipCallback,
        aliases: ['nox-list-zip'],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the lists to zip',
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
        returns: 'The zipped list',
    }));
}

export default initEnumSlashCMDs;
