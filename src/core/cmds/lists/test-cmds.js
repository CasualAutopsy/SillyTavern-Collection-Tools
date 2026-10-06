import { STContext as ctx } from '../../../external/st-context.js';
import { STPublic as pub } from '../../../external/st-public.js';

import {
    listIncludesCallback,
} from './test-callbacks.js';


const { EnumProviders } = NoxLib.SlashHandlers;


const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

const {
    commonEnumProviders
} = pub;


const quickClosure = EnumProviders.quickClosure();

const stringAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "string");
const listAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "array");

const boolEnumProvider = commonEnumProviders.boolean('trueFalse');


async function initTestSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'list-includes',
        callback: listIncludesCallback,
        aliases: ['nox-list-includes'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'parse',
                description: 'whether to parse the search element\'s data type',
                typeList: [
                    ARGUMENT_TYPE.BOOLEAN,
                ],
                enumProvider: boolEnumProvider,
                forceEnum: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'search',
                description: 'the item to search for',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: stringAndShorthands,
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the list to search in',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: listAndShorthands,
                forceEnum: true,
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'Whether the list includes the item',
    }));
}


export default initTestSlashCMDs;
