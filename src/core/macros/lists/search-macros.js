import { STContext as ctx } from '../../../external/st-context.js';

import {
    listAtHandler,
    listIndexOfHandler, listLastIndexOfHandler
} from './search-handlers.js';

const {
    macros
} = ctx;

async function initSearchMacros() {
    macros.register(
        'listAt',
        {
            category: 'Collection Tools - List Search',
            description: 'A search macro that gets an item from a list and returns it.',
            aliases: [
                {
                    alias: 'noxListAt',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to get the item from.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'index',
                    description: 'The index of the item to get.',
                    sampleValue: '0, 1, 2',
                    optional: false,
                },
            ],
            handler: listAtHandler,
            displayOverride: '{{listAt::list::index}}',
            exampleUsage: [
                '{{listAt::[1, 2, 3]::0}}',
                '{{listAt::$globalVar::1}}',
                '{{listAt::.localVar::2}}',
            ],
            returns: 'The item at the index',
        }
    );

    macros.register(
        'listIndexOf',
        {
            category: 'Collection Tools - List Search',
            description: 'A search macro that gets the index of the first occurrence of an item from a list and returns it.',
            aliases: [
                {
                    alias: 'noxListIndexOf',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to search in.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'search',
                    description: 'The item to search for.',
                    sampleValue: '1, 2, 3',
                    optional: false,
                },
                {
                    name: 'parse',
                    description: 'Whether to parse the search element\'s data type.',
                    sampleValue: 'true, false, 1, 0, on, off',
                    defaultValue: 'true',
                    optional: true,
                },
            ],
            handler: listIndexOfHandler,
            displayOverride: '{{listIndexOf::list::search::[parse]}}',
            exampleUsage: [
                '{{listIndexOf::[1, 2, 3]::1}}',
                '{{listIndexOf::$globalVar::2}}',
                '{{listIndexOf::.localVar::3}}',
                '{{listIndexOf::[1, 2, 3]::1::true}}',
                '{{listIndexOf::["1", "2", "3"]::2::false}}',
            ],
            returns: 'The index of the first occurrence of the item',
        }
    );

    macros.register(
        'listLastIndexOf',
        {
            category: 'Collection Tools - List Search',
            description: 'A search macro that gets the index of the last occurrence of an item from a list and returns it.',
            aliases: [
                {
                    alias: 'noxListLastIndexOf',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to search in.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'search',
                    description: 'The item to search for.',
                    sampleValue: '1, 2, 3',
                    optional: false,
                },
                {
                    name: 'parse',
                    description: 'Whether to parse the search element\'s data type.',
                    sampleValue: 'true, false, 1, 0, on, off',
                    defaultValue: 'true',
                    optional: true,
                },
            ],
            handler: listLastIndexOfHandler,
            displayOverride: '{{listLastIndexOf::list::search::[parse]}}',
            exampleUsage: [
                '{{listLastIndexOf::[1, 2, 3]::1}}',
                '{{listLastIndexOf::$globalVar::2}}',
                '{{listLastIndexOf::.localVar::3}}',
                '{{listLastIndexOf::[1, 2, 3]::1::true}}',
                '{{listLastIndexOf::["1", "2", "3"]::2::false}}',
            ],
            returns: 'The index of the last occurrence of the item',
        }
    );
}

export default initSearchMacros;
