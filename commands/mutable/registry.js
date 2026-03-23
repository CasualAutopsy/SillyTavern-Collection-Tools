import {getContext} from '../../../../../st-context.js';

import {list_configs} from "./configs.js";
import {list_docs} from "./docs.js";

import  {list_callbacks} from './lib.js';


const context = getContext();

const slash_parser = context.slash_parser;
const slash_command = context.slash_command;


export function registerMutableslash_commands() {
    // PUSH / POP

    // Register list-push command
    slash_parser.addCommandObject(slash_command.fromProps({
        ...list_configs.list_push,
        callback: list_callbacks.list_push_unshift,
        helpString: list_docs.list_push,
    }));

    // Register list-pop command
    slash_parser.addCommandObject(slash_command.fromProps({
        ...list_configs.list_pop,
        callback: list_callbacks.list_pop_shift,
        helpString: list_docs.list_pop,
    }));

    // SHIFT / UNSHIFT

    // Register list-unshift command
    slash_parser.addCommandObject(slash_command.fromProps({
        ...list_configs.list_unshift,
        callback: (args, value) => {
            return list_callbacks.list_push_unshift(args, value, true);
        },
        helpString: list_docs.list_unshift,
    }));

    // Register list-shift command
    slash_parser.addCommandObject(slash_command.fromProps({
        ...list_configs.list_shift,
        callback: (args, value) => {
            return list_callbacks.list_pop_shift(args, value, true)
        },
        helpString: list_docs.list_shift,
    }));

    // SPLICE

    // Register list-splice command
    slash_parser.addCommandObject(slash_command.fromProps({
        ...list_configs.list_splice,
        callback: list_callbacks.list_splice,
        helpString: list_docs.list_splice,
    }));

    // SORT / REVERSE

    // Register list-sort command
    slash_parser.addCommandObject(slash_command.fromProps({
        ...list_configs.list_sort,
        callback: list_callbacks.list_sort_reverse,
        helpString: list_docs.list_sort,
    }));

    // Register list-reverse command
    slash_parser.addCommandObject(slash_command.fromProps({
        ...list_configs.list_reverse,
        callback: (args, value) => {
            return list_callbacks.list_sort_reverse(args, value, true);
        },
        helpString: list_docs.list_reverse,
    }));

    // FILL / COPYWITHIN

    // Register list-fill command
    slash_parser.addCommandObject(slash_command.fromProps({
        ...list_configs.list_fill,
        callback: list_callbacks.list_fill,
        helpString: list_docs.list_fill,
    }));

    // Register list-copywithin command
    slash_parser.addCommandObject(slash_command.fromProps({
        ...list_configs.list_copywithin,
        callback: list_callbacks.list_copywithin,
        helpString: list_docs.list_copywithin,
    }));
}
