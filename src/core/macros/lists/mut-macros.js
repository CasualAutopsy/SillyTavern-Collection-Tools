import { STContext as ctx } from '../../../external/st-context.js';

import { listPushHandler, listPopHandler, listUnshiftHandler, listShiftHandler } from './mut-handlers.js';

const {
    macros
} = ctx;

async function initMutMacros() {
    macros.register(
        'listPush',
        {
            category: 'Collection Tools - List Mutation',
            description: 'A mutation macro that pushes items to a list and returns the new list length.',
            aliases: [
                {
                    alias: 'noxListPush',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to push items to.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
            ],
            list: {
                min: 1,
            },
            handler: listPushHandler,
            displayOverride: '{{listPush::list::[item1]::[item2]::...}}',
            exampleUsage: [
                '{{listPush::[1, 2, 3]::4}}',
                '{{listPush::$globalVar::.localVar}}',
            ],
            returns: 'The new length of the list',
        }
    );

    macros.register(
        'listPop',
        {
            category: 'Collection Tools - List Mutation',
            description: 'A mutation macro that pops an item from a list and returns the popped item.',
            aliases: [
                {
                    alias: 'noxListPop',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to pop an item from.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: listPopHandler,
            displayOverride: '{{listPop::list}}',
            exampleUsage: [
                '{{listPop::[1, 2, 3]}}',
                '{{listPop::$globalVar}}',
            ],
            returns: 'The popped item',
        }
    );

    macros.register(
        'listUnshift',
        {
            category: 'Collection Tools - List Mutation',
            description: 'A mutation macro that unshifts items to a list and returns the new list length.',
            aliases: [
                {
                    alias: 'noxListUnshift',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to unshift items to.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
            ],
            list: {
                min: 1,
            },
            handler: listUnshiftHandler,
            displayOverride: '{{listUnshift::list::[item1]::[item2]::...}}',
            exampleUsage: [
                '{{listUnshift::[1, 2, 3]::4}}',
                '{{listUnshift::$globalVar::.localVar}}',
            ],
            returns: 'The new length of the list',
        }
    );

    macros.register(
        'listShift',
        {
            category: 'Collection Tools - List Mutation',
            description: 'A mutation macro that shifts an item from a list and returns the shifted item.',
            aliases: [
                {
                    alias: 'noxListShift',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to shift an item from.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: listShiftHandler,
            displayOverride: '{{listShift::list}}',
            exampleUsage: [
                '{{listShift::[1, 2, 3]}}',
                '{{listShift::$globalVar}}',
            ],
            returns: 'The shifted item',
        }
    );
}

export default initMutMacros;
