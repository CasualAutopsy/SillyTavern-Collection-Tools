import {getContext} from '../../../../../st-context.js';

const context = getContext();

const slash_arg = context.SlashCommandArgument;

const arg_types = context.ARGUMENT_TYPE;

const string_type = arg_types.STRING;
const list_type = arg_types.LIST


const LIST_ZIP_CONFIG = {
    name: 'list-zip',
    aliases: ['arr-zip'],
    returns: 'The zipped list',
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The lists to zip',
            typeList: [
                string_type,
                list_type,
            ],
            isRequired: true,
            acceptsMultiple: true,
        }),
    ],
    splitUnnamedArgument: true,
};

const LIST_ZIP_LONGEST_CONFIG = {
    name: 'list-zip-longest',
    aliases: ['arr-zip-longest'],
    returns: 'The zipped list',
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The lists to zip',
            typeList: [
                string_type,
                list_type,
            ],
            isRequired: true,
            acceptsMultiple: true,
        }),
    ],
    splitUnnamedArgument: true,
};


export const list_configs = {
    list_zip: LIST_ZIP_CONFIG,
    list_zip_longest: LIST_ZIP_LONGEST_CONFIG,
}
