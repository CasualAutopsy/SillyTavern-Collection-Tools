import { STContext as ctx } from '../../../external/st-context.js';

import {
    listPushHandler, listPopHandler,
    listUnshiftHandler, listShiftHandler,
    listFillHandler, listCopyWithinHandler,
    listSortHandler, listReverseHandler
} from './mut-handlers.js';

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

    macros.register(
        'listFill',
        {
            category: 'Collection Tools - List Mutation',
            description: 'A mutation macro that fills a list with a value and returns the new list.',
            aliases: [
                {
                    alias: 'noxListFill',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to fill.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'value',
                    description: 'The value to fill the list with.',
                    sampleValue: '42, "hello", .localVar, $globalVar',
                    optional: false,
                },
            ],
            list: {
                min: 0,
                max: 2,
            },
            handler: listFillHandler,
            displayOverride: '{{listFill::list::value::[start]::[end]}}',
            exampleUsage: [
                '{{listFill::[1, 2, 3]::42}}',
                '{{listFill::$globalVar::.localVar}}',
                '{{listFill::[1, 2, 3]::42::-2}}',
                '{{listFill::[1, 2, 3]::42::1::5}}',
            ],
            returns: 'The new list',
        }
    );

    macros.register(
        'listCopyWithin',
        {
            category: 'Collection Tools - List Mutation',
            description: 'A mutation macro that copies within a list and returns the new list.',
            aliases: [
                {
                    alias: 'noxListCopyWithin',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to copy within.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
            ],
            list: {
                min: 2,
                max: 3,
            },
            handler: listCopyWithinHandler,
            displayOverride: '{{listCopyWithin::list::target::start::[end]}}',
            exampleUsage: [
                '{{listCopyWithin::[1, 2, 3]::0::1}}',
                '{{listCopyWithin::$globalVar::0::1}}',
                '{{listCopyWithin::[1, 2, 3]::0::1::2}}'
            ],
            returns: 'The new list',
        }
    );

    macros.register(
        'listSort',
        {
            category: 'Collection Tools - List Mutation',
            description: 'A mutation macro that sorts a list and returns the new list.',
            aliases: [
                {
                    alias: 'noxListSort',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to sort.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: listSortHandler,
            displayOverride: '{{listSort::list}}',
            exampleUsage: [
                '{{listSort::[1, 2, 3]}}',
                '{{listSort::.globalVar}}',
            ],
            returns: 'The new list',
        }
    );

    macros.register(
        'listReverse',
        {
            category: 'Collection Tools - List Mutation',
            description: 'A mutation macro that reverses a list and returns the new list.',
            aliases: [
                {
                    alias: 'noxListReverse',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'list',
                    description: 'The list to reverse.',
                    sampleValue: '[1, 2, 3], .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: listReverseHandler,
            displayOverride: '{{listReverse::list}}',
            exampleUsage: [
                '{{listReverse::[1, 2, 3]}}',
                '{{listReverse::$globalVar}}',
            ],
            returns: 'The new list',
        }
    );
}

export default initMutMacros;
