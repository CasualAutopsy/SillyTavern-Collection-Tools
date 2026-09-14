import { STContext as ctx } from '../../../external/st-context.js';

import { fromEntriesHandler } from './trans-handlers.js';

const {
    macros
} = ctx;

async function initTransMacros() {
    macros.register(
        'dictFromEntries',
        {
            category: 'Collection Tools - Dictionary Transformation',
            description: 'Takes a list of key/value entries and returns a dictionary',
            aliases: [
                {
                    alias: 'noxDictFromEntries',
                    visible: true,
                },
            ],
            unnamedArgs: [
                {
                    name: 'entries',
                    description: 'The list of entries to turn into a dictionary.',
                    sampleValue: '[["a", 1], ["b", 2]], .localVar, $globalVar',
                    optional: true,
                },
            ],
            list: {
                min: 0,
            },
            handler: fromEntriesHandler,
            displayOverride: '{{dictFromEntries::[entries]::[key1]::[value1]::[key2]::[value2]::...}}',
            exampleUsage: [
                '{{dictFromEntries::[["a", 1], ["b", 2]]}}',
                '{{dictFromEntries::::a::1::b::2}}',
                '{{dictFromEntries::.localVar}}',
                '{{dictFromEntries::::local_val::.localVar::global_val::$globalVar}}',
            ],
            returns: 'Dictionary from entries',
        }
    );
}

export default initTransMacros;
