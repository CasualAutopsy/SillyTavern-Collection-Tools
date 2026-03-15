import {SlashCommandParser} from '../../../../slash-commands/SlashCommandParser.js';
import {SlashCommand} from '../../../../slash-commands/SlashCommand.js';

import {list_docs} from "./docs.js";
import {list_configs} from "./configs.js";

import  {list_callbacks} from './lib.js'



export function registerSlashCommands() {
    // Register list-push command
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        ...list_configs.list_push,
        callback: list_callbacks.list_push,
        helpString: list_docs.list_push,
    }));

    // Register list-pop command
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        ...list_configs.list_pop,
        callback: list_callbacks.list_pop,
        helpString: list_docs.list_pop,
    }));
}
