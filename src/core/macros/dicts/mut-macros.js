import { STContext as ctx } from '../../../external/st-context.js';

import {
    dictAssignHandler, dictDeleteHandler,
    dictDefineHandler, dictMultiDefineHandler
} from './mut-handlers.js';

const {
    macros
} = ctx;

async function initMutMacros() {
    macros.register(
        'dictAssign',
        {
            category: 'Collection Tools - Dictionary Mutation',
            description: 'A mutation macro that assigns a dictionary to another dictionary and returns the new dictionary.',
            aliases: [
                {
                    alias: 'noxDictAssign',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The dictionary to assign to.',
                    sampleValue: '{"a": 1, "b": 2}, .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'source',
                    description: 'The dictionary to assign from.',
                    sampleValue: '{"a": 1, "b": 2}, .localVar, $globalVar',
                    optional: false
                },
            ],
            handler: dictAssignHandler,
            displayOverride: '{{dictAssign::target::source}}',
            exampleUsage: [
                '{{dictAssign::{"a": 1, "b": 2}::{"a": 3, "b": 4, "c": 5}}}',
                '{{dictAssign::.localVar::{"a": 3, "b": 4, "c": 5}}}',
                '{{dictAssign::$globalVar::{"a": 3, "b": 4, "c": 5}}}',
            ],
            returns: 'The new dictionary',
        }
    );

    macros.register(
        'dictDelete',
        {
            category: 'Collection Tools - Dictionary Mutation',
            description: 'A mutation macro that deletes a key from a dictionary and returns the new dictionary.',
            aliases: [
                {
                    alias: 'noxDictDelete',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The dictionary to delete from.',
                    sampleValue: '{"a": 1, "b": 2}, .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'key',
                    description: 'The key to delete.',
                    sampleValue: 'a, .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: dictDeleteHandler,
            displayOverride: '{{dictDelete::target::key}}',
            exampleUsage: [
                '{{dictDelete::{"a": 1, "b": 2}::a}}',
                '{{dictDelete::.localVar::b}}',
                '{{dictDelete::$globalVar::c}}',
            ],
            returns: 'The new dictionary',
        }
    );

    macros.register(
        'dictDefine',
        {
            category: 'Collection Tools - Dictionary Mutation',
            description: 'A mutation macro that defines a key on a dictionary and returns the new dictionary.',
            aliases: [
                {
                    alias: 'noxDictDefine',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The dictionary to define the key on.',
                    sampleValue: '{"a": 1, "b": 2}, .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'key',
                    description: 'The key to define.',
                    sampleValue: 'a, .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'value',
                    description: 'The value to define the key with.',
                    sampleValue: '1, true, hello world!, .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: dictDefineHandler,
            displayOverride: '{{dictDefine::target::key::value}}',
            exampleUsage: [
                '{{dictDefine::{"a": 1, "b": 2}::a::1}}',
                '{{dictDefine::.localVar::b::true}}',
                '{{dictDefine::$globalVar::c::hello world!}}',
            ],
            returns: 'The new dictionary',
        }
    );

    macros.register(
        'dictMultiDefine',
        {
            category: 'Collection Tools - Dictionary Mutation',
            description: 'A mutation macro that defines multiple keys on a dictionary and returns the new dictionary.',
            aliases: [
                {
                    alias: 'noxDictMultiDefine',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'target',
                    description: 'The dictionary to define the keys on.',
                    sampleValue: '{"a": 1, "b": 2}, .localVar, $globalVar',
                    optional: false,
                },
                {
                    name: 'prop_map',
                    description: 'The key/value pairs to define.',
                    sampleValue: '{"a": 1, "b": 2}, .localVar, $globalVar',
                    optional: false,
                },
            ],
            handler: dictMultiDefineHandler,
            displayOverride: '{{dictMultiDefine::target::prop_map}}',
            exampleUsage: [
                '{{dictMultiDefine::{"a": 1, "b": 2}::{"a": {"value": 1}, "b": {"value": 2}}}}',
                '{{dictMultiDefine::.localVar::{"a": {"value": 1}, "b": {"value": 2}}}}',
                '{{dictMultiDefine::$globalVar::{"a": {"value": 1}, "b": {"value": 2}}}}',
            ],
            returns: 'The new dictionary',
        }
    );
}

export default initMutMacros;
