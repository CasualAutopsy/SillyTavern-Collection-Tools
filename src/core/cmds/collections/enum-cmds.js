import { STContext as ctx } from "../../../external/st-context.js";
import { STPublic as pub } from "../../../external/st-public.js";

import {
    collEntriesCallback,
    collMapCallback,
    collForEachCallback,
    collFilterCallback,
} from './enum-callbacks.js';


const { EnumProviders } = NoxLib.SlashHandlers;


const {
    SlashCommandParser, SlashCommand,
    SlashCommandNamedArgument, SlashCommandArgument,
    ARGUMENT_TYPE, SlashCommandEnumValue,
} = ctx;

const { enumIcons, enumTypes } = pub;


const entriesModeEnum = [
    new SlashCommandEnumValue(
        'keys',
        'return the index/keys of the collection',
        enumTypes.enum,
        enumIcons.enum
    ),

    new SlashCommandEnumValue(
        'values',
        'return the values of the collection',
        enumTypes.enum,
        enumIcons.enum
    ),

    new SlashCommandEnumValue(
        'entries',
        'return the entries of the collection',
        enumTypes.enum,
        enumIcons.enum
    ),
];

const toTypeEnum = [
    new SlashCommandEnumValue(
        'string',
        'convert the items to strings',
        enumTypes.enum,
        enumIcons.string,
    ),

    new SlashCommandEnumValue(
        'int',
        'convert the items to integers',
        enumTypes.enum,
        enumIcons.number,
    ),

    new SlashCommandEnumValue(
        'float',
        'convert the items to floats',
        enumTypes.enum,
        enumIcons.number,
    ),

    new SlashCommandEnumValue(
        'bool',
        'convert the items to booleans',
        enumTypes.enum,
        enumIcons.boolean,
    ),

    new SlashCommandEnumValue(
        'json',
        'convert the items to an object or array',
        enumTypes.enum,
        enumIcons.dictionary,
    ),
];

const pos_int_regex = /^\d+$/;
const flattenDepthEnum = [
    new SlashCommandEnumValue(
        'any positive integer',
        'the depth to flatten the mapped collection',
        enumTypes.number,
        enumIcons.number,
        (input) => {
            if (input == '') {
                return true;
            }

            if (input.match(pos_int_regex)) {
                return true;
            } else {
                return false;
            }
        },
    ),

    new SlashCommandEnumValue(
        'deep',
        'flatten the mapped collection to its deepest level',
        enumTypes.enum,
        enumIcons.enum,
    ),
];


const booleanEnum = EnumProviders.valueDatatype('boolean');

const collAndShorthand = EnumProviders.shorthandAndValue('shorthand-w-scope', 'array', 'object');
const allAndShorthand = EnumProviders.shorthandAndValue('shorthand-w-scope', 'all');


async function initEnumSlashCMDs() {
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'coll-entries',
        callback: collEntriesCallback,
        aliases: ['nox-coll-entries'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'mode',
                description: 'the mode to use',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                enumList: entriesModeEnum,
                forceEnum: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the collection to get entries from',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: collAndShorthand,
                forceEnum: true,
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The entries of the collection',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'coll-map',
        callback: collMapCallback,
        aliases: ['nox-coll-map'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'target',
                description: 'the collection to iterate over',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: collAndShorthand,
                forceEnum: true,
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'toType',
                description: 'the data type to convert the items to',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                enumList: toTypeEnum,
                forceEnum: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'flatten',
                description: 'flatten the mapped collection',
                typeList: [
                    ARGUMENT_TYPE.BOOLEAN,
                ],
                enumProvider: booleanEnum,
                forceEnum: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'depth',
                description: 'the depth to flatten the mapped collection',
                typeList: [
                    ARGUMENT_TYPE.NUMBER,
                    ARGUMENT_TYPE.STRING,
                ],
                enumList: flattenDepthEnum,
                forceEnum: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for each item',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The mapped collection',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'coll-for-each',
        callback: collForEachCallback,
        aliases: ['nox-coll-for-each'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'target',
                description: 'the collection to iterate over',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: collAndShorthand,
                forceEnum: true,
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for each item',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'void',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'coll-filter',
        callback: collFilterCallback,
        aliases: ['nox-coll-filter'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'target',
                description: 'the collection to iterate over',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: collAndShorthand,
                forceEnum: true,
                isRequired: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for each item',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The filtered collection',
    }));

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'coll-reduce',
        callback: collReduceCallback,
        aliases: ['nox-coll-reduce'],
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'target',
                description: 'the collection to iterate over',
                typeList: [
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: collAndShorthand,
                forceEnum: true,
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'initial',
                description: 'the initial value to use for the accumulator',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                    ARGUMENT_TYPE.NUMBER,
                    ARGUMENT_TYPE.BOOLEAN,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.VARIABLE_NAME,
                ],
                enumProvider: allAndShorthand,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'reverse',
                description: 'reduce in reverse order',
                typeList: [
                    ARGUMENT_TYPE.BOOLEAN,
                ],
                enumProvider: booleanEnum,
                forceEnum: true,
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'the closure to use for each item',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
                isRequired: true,
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'The reduced value',
    }));
}

export default initEnumSlashCMDs;
