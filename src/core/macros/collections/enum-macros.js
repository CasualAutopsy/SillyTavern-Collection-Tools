import { STContext as ctx } from '../../../external/st-context.js';

import {
    collEntriesCallback,
} from './enum-handlers.js';


const {
    macros
} = ctx;


async function initEnumMacros() {
    macros.register(
        'collEntries',
        {
            category: 'Collection Tools - Collection Enumeration',
            description: 'An enumeration macro that gets the index keys, values, or entries of a collection and returns them.',
            aliases: [
                {
                    alias: 'noxCollEntries',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'collection',
                    description: 'the collection to extract the index keys, values, or entries from.',
                    sampleValue: '[1, 2, 3], {"a": 1, "b": 2}, .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'mode',
                    description: 'the mode to determine weather to return the keys, values, or entries of the collection. defaults to entries.',
                    sampleValue: 'keys, values, entries',
                    optional: true,
                },
            ],
            handler: collEntriesCallback,
            displayOverride: '{{collEntries::collection::[mode]}}',
            exampleUsage: [
                '{{collEntries::[1, 2, 3]}}',
                '{{collEntries::{"a": 1, "b": 2}::keys}}',
                '{{collEntries::.localVar}}',
                '{{collEntries::$globalVar::values}}',
            ],
        },
    );
}


export default initEnumMacros;
