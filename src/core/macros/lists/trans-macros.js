import { STContext as ctx } from '../../../external/st-context.js';

import {
    listSliceHandler,
    listConcatHandler,
    listFlatHandler
} from './trans-handlers.js';

const {
    macros
} = ctx;

async function initTransMacros() {
    macros.register(
        'listSlice',
        {
            category: 'Collection Tools - List Transformation',
            description: 'A transformation macro that slices a list and returns the list of sliced items.',
            aliases: [
                {
                    alias: 'noxListSlice',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to slice.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
            ],
            list: {
                min: 0,
                max: 2,
            },
            handler: listSliceHandler,
            displayOverride: '{{listSlice::list::[start]::[end]}}',
            exampleUsage: [
                '{{listSlice::[1, 2, 3]}}',
                '{{listSlice::$globalVar}}',
                '{{listSlice::[1, 2, 3]::-2}}',
                '{{listSlice::[1, 2, 3]::1::5}}',
            ],
            returns: 'The list of sliced items',
        }
    );

    macros.register(
        'listConcat',
        {
            category: 'Collection Tools - List Transformation',
            description: 'A transformation macro that concatenates lists and returns the new list.',
            aliases: [
                {
                    alias: 'noxListConcat',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to concatenate.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
            ],
            list: {
                min: 1,
            },
            handler: listConcatHandler,
            displayOverride: '{{listConcat::list::list1::[list2]::...}}',
            exampleUsage: [
                '{{listConcat::[1, 2, 3]::[4, 5, 6]}}',
                '{{listConcat::$globalVar::.localVar}}',
                '{{listConcat::[1, 2, 3]::[4, 5, 6]::.localVar}}',
            ],
            returns: 'The new concatenated list',
        }
    );

    macros.register(
        'listFlat',
        {
            category: 'Collection Tools - List Transformation',
            description: 'A transformation macro that flattens a list and returns the new list.',
            aliases: [
                {
                    alias: 'noxListFlat',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to flatten.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'depth',
                    description: 'The depth to flatten to.',
                    sampleValue: '1, 2, 3',
                    optional: true,
                },
            ],
            handler: listFlatHandler,
            displayOverride: '{{listFlat::list::depth}}',
            exampleUsage: [
                '{{listFlat::[1, 2, 3]}}',
                '{{listFlat::$globalVar}}',
                '{{listFlat::.localVar}}',
            ],
            returns: 'The new flattened list',
        }
    );
}

export default initTransMacros;
