/* eslint-disable no-undef */
// @ts-nocheck
const { SlashCommandArgument, ARGUMENT_TYPE } = SillyTavern.getContext();

/**
 * @typedef {import('/scripts/slash-commands/SlashCommand').SlashCommand} SlashCommand
 */


/** @type {SlashCommand} */
export const COLLECTION_FOREACH_CONFIG = {
    name: 'collection-foreach',
    aliases: ['nox-collection-foreach'],
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'the list or dictionary to iterate over',
            typeList: [
                ARGUMENT_TYPE.LIST,
                ARGUMENT_TYPE.DICTIONARY,
                ARGUMENT_TYPE.VARIABLE_NAME
            ],
            isRequired: true,
        }),
        SlashCommandArgument.fromProps({
            description: 'the closure to execute for each item, with {{var::item}} and {{var::index}} (or the first two closure arguments) placeholders',
            typeList: [
                ARGUMENT_TYPE.CLOSURE,
                ARGUMENT_TYPE.SUBCOMMAND
            ],
            isRequired: true,
        }),
    ],
    splitUnnamedArgument: true,
    returns: 'result of executing the command on the last item',
};

// helpString: help(
//         `
//             Executes the provided command for each item of a list or dictionary, replacing {{var::item}} and {{var::index}} (or the first two closure arguments) with the current item and index.

//             Use <code>/break</code> to break out of the loop early.
//         `,
//         [
//             [
//                 `
//                     /foreach ["A", "B", "C"] {:
//                         /echo Item {{var::index}} is {{var::item}} |
//                         /delay 400 |
//                     :}
//                 `,
//                 '',
//             ],
//             [
//                 `
//                     /let x {"a":"foo","b":"bar"} |
//                     /foreach {{var::x}} {:
//                         /echo Item {{var::index}} is {{var::item}} |
//                         /delay 400 |
//                     :}
//                 `,
//                 '',
//             ],
//             [
//                 `
//                     /foreach ["A", "B", "C"] {: it= i=
//                         /echo Item {{var::it}} is {{var::i}} |
//                         /delay 400 |
//                     :}
//                 `,
//                 'uses custom closure arguments <code>it</code> and <code>i</code> instead of the default <code>item</code> and <code>index</code>.',
//             ],
//             [
//                 `
//                     /foreach ["A", "B", "C"] {: foo= bar=
//                         /echo Item {{var::foo}} is {{var::bar}} |
//                         /delay 400 |
//                     :}
//                 `,
//                 'uses custom closure arguments <code>foo</code> and <code>bar</code> instead of the default <code>item</code> and <code>index</code>.',
//             ],
//         ],
//     ),
