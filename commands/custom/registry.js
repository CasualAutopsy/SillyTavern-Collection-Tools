import {getContext} from '../../../../../st-context.js';

import {list_configs} from "./configs.js";
// import {list_docs} from "./docs.js";

import  {list_callbacks} from './lib.js';


const context = getContext();

const slash_parser = context.SlashCommandParser;
const slash_command = context.SlashCommand;


export function registerCustomSlashCommands() {
    slash_parser.addCommandObject(slash_command.fromProps({
        ...list_configs.list_zip,
        callback: list_callbacks.list_zip,
        // helpString: list_docs.list_push,
    }));

    slash_parser.addCommandObject(slash_command.fromProps({
        ...list_configs.list_zip_longest,
        callback: list_callbacks.list_zip_longest,
    }));
}
