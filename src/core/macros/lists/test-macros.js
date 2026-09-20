import { STContext as ctx } from '../../../external/st-context.js';

import {
    listIncludesHandler
} from './test-handlers.js';

const {
    macros
} = ctx;

async function initTestMacros() {
    macros.register(
        'listIncludes',
        {
            category: 'Collection Tools - List Search',
            description: 'A search macro that checks if a list includes an item and returns true or false.',
            aliases: [
                {
                    alias: 'noxListIncludes',
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
            handler: listIncludesHandler,
            displayOverride: '{{listIncludes::list::search::[parse]}}',
            exampleUsage: [
                '{{listIncludes::[1, 2, 3]::1}}',
                '{{listIncludes::$globalVar::2}}',
                '{{listIncludes::.localVar::3}}',
                '{{listIncludes::[1, 2, 3]::1::true}}',
                '{{listIncludes::["1", "2", "3"]::2::false}}',
            ],
            returns: 'Whether the list includes the item',
        }
    );
}

export default initTestMacros;
