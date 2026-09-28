import { STContext as ctx } from "../../../external/st-context.js";
import { STPublic as pub } from "../../../external/st-public.js";

import {
    collFindCallback,
} from './search-callbacks.js';


const { EnumProviders } = NoxLib.SlashHandlers;


const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;

const {
    commonEnumProviders
} = pub;


const boolEnumProvider = commonEnumProviders.boolean("trueFalse");

const collAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "array", "object");


async function initSearchSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'coll-find',
        callback: collFindCallback,
        aliases: ['nox-coll-find'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'coll',
                description: 'the collection to search in',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: collAndShorthands,
                forceEnum: true,
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'index',
                description: 'return the index or key instead of the value',
                typeList: [
                    ARGUMENT_TYPE.BOOLEAN,
                ],
                enumProvider: boolEnumProvider,
                forceEnum: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'last',
                description: 'return the last occurrence instead of the first',
                typeList: [
                    ARGUMENT_TYPE.BOOLEAN,
                ],
                enumProvider: boolEnumProvider,
                forceEnum: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for searching',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
                acceptsMultiple: false,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The first or last item that satisfies the condition',
    }));
}

export default initSearchSlashCMDs;
