import { STContext as ctx } from '../../../external/st-context.js';
import { STPublic as pub } from '../../../external/st-public.js';

import {
    collEveryCallback, collSomeCallback
} from './test-callbacks.js'


const { EnumProviders } = NoxLib.SlashHandlers;


const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE,
} = ctx;


const collAndShorthands = EnumProviders.shorthandAndValue("shorthand-w-scope", "array", "object");


async function initTestSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'coll-every',
        callback: collEveryCallback,
        aliases: ['nox-coll-every'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'coll',
                description: 'the collection to iterate over',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: collAndShorthands,
                forceEnum: true,
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to test with',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'Whether every item in the collection satisfies the condition',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'coll-some',
        callback: collSomeCallback,
        aliases: ['nox-coll-some'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'coll',
                description: 'the collection to iterate over',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: collAndShorthands,
                forceEnum: true,
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to test with',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'Whether at least one item in the collection satisfies the condition',
    }));
}

export default initTestSlashCMDs;
