import { STContext as ctx } from '../../../external/st-context.js';

import {
    listIndexHandler, listEntriesHandler
} from './enum-handlers.js';

const {
    macros
} = ctx;

async function initEnumMacros() {
    macros.register(
        'listIndex',
        {
            category: 'Collection Tools - List Enumeration',
            description: 'An enumeration macro that gets the index keys of a list and returns them.',
            aliases: [
                {
                    alias: 'noxListIndex',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'the list to extract the index keys from',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: listIndexHandler,
            displayOverride: '{{listIndex::list}}',
            exampleUsage: [
                '{{listIndex::[1, 2, 3]}}',
                '{{listIndex::$globalVar}}',
                '{{listIndex::.localVar}}',
            ],
            returns: 'The list\'s index keys',
        }
    );

    macros.register(
        'listEntries',
        {
            category: 'Collection Tools - List Enumeration',
            description: 'An enumeration macro that gets the zipped indices and values of a list and returns them.',
            aliases: [
                {
                    alias: 'noxListEntries',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'the list to extract the entries from',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: listEntriesHandler,
            displayOverride: '{{listEntries::list}}',
            exampleUsage: [
                '{{listEntries::[1, 2, 3]}}',
                '{{listEntries::$globalVar}}',
                '{{listEntries::.localVar}}',
            ],
            returns: 'The list\'s entries',
        }
    );
}

export default initEnumMacros;
