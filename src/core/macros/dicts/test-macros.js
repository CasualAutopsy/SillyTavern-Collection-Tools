import { STContext as ctx } from '../../../external/st-context.js';

import {
    dictHasOwnHandler
} from './test-handlers.js';

const {
    macros
} = ctx;

async function initTestMacros() {
    macros.register(
        'dictHasOwn',
        {
            category: 'Collection Tools - Dictionary Tests',
            description: 'A predicate macro that checks if a dictionary has a key and returns true or false.',
            aliases: [
                {
                    alias: 'noxDictHasOwn',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'search',
                    description: 'The dictionary to search in.',
                    sampleValue: '{"a": 1, "b": 2}, .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'find',
                    description: 'The key to find.',
                    sampleValue: 'a, .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: dictHasOwnHandler,
            displayOverride: '{{dictHasOwn::search::find}}',
            exampleUsage: [
                '{{dictHasOwn::{"a": 1, "b": 2}::a}}',
                '{{dictHasOwn::.localVar::b}}',
            ],
        },
    );
}

export default initTestMacros;
