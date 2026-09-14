import { STContext as ctx } from '../../../external/st-context.js';

import { getKeysHandler, getValuesHandler, getEntriesHandler } from './enum-handlers.js';

const {
    macros
} = ctx;

async function initEnumMacros() {
    macros.register(
        'getDictKeys',
        {
            category: 'Collection Tools - Dictionary Enumeration',
            description: 'Takes a dictionary and returns a list of its keys',
            aliases: [
                {
                    alias: 'noxGetDictKeys',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'dictionary',
                    description: 'The dictionary to get keys from.',
                    sampleValue: '{"a": 1, "b": 2}, .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: getKeysHandler,
            displayOverride: '{{getDictKeys::dictionary}}',
            exampleUsage: [
                '{{getDictKeys::{"a": 1, "b": 2}}}',
                '{{getDictKeys::.localVar}}',
                '{{getDictKeys::$globalVar}}',
            ],
            returns: 'Stringified list of dict keys',
        }
    );

    macros.register(
        'getDictValues',
        {
            category: 'Collection Tools - Dictionary Enumeration',
            description: 'Takes a dictionary and returns a list of its values',
            aliases: [
                {
                    alias: 'noxGetDictValues',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'dictionary',
                    description: 'The dictionary to get values from.',
                    sampleValue: '{"a": 1, "b": 2}, .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: getValuesHandler,
            displayOverride: '{{getDictValues::dictionary}}',
            exampleUsage: [
                '{{getDictValues::{"a": 1, "b": 2}}}',
                '{{getDictValues::.localVar}}',
                '{{getDictValues::$globalVar}}',
            ],
            returns: 'Stringified list of dict values',
        }
    );

    macros.register(
        'getDictEntries',
        {
            category: 'Collection Tools - Dictionary Enumeration',
            description: 'Takes a dictionary and returns a list of its key/value entries',
            aliases: [
                {
                    alias: 'noxGetDictEntries',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'dictionary',
                    description: 'The dictionary to get entries from.',
                    sampleValue: '{"a": 1, "b": 2}, .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: getEntriesHandler,
            displayOverride: '{{getDictEntries::dictionary}}',
            exampleUsage: [
                '{{getDictEntries::{"a": 1, "b": 2}}}',
                '{{getDictEntries::.localVar}}',
                '{{getDictEntries::$globalVar}}',
            ],
            returns: 'Stringified list of dict key/value entries',
        }
    );
}

export default initEnumMacros;
