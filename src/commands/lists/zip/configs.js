const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext()

    , slash_named_arg = context.SlashCommandNamedArgument
    , slash_arg = context.SlashCommandArgument;

const arg_types = context.ARGUMENT_TYPE

    , boolean_type = arg_types.BOOLEAN
    , list_type = arg_types.LIST
    , var_type = arg_types.VARIABLE_NAME;

export const LIST_ZIP_CONFIG = {
    name: 'list-zip',
    aliases: ['nox-list-zip'],
    returns: 'The zipped list',
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target list to zip',
            typeList: [
                list_type,
                var_type,
            ],
            isRequired: true,
        }),
        slash_arg.fromProps({
            description: 'The source lists to zip',
            typeList: [
                list_type,
                var_type,
            ],
            isRequired: true,
            acceptsMultiple: true,
        }),
    ],
    splitUnnamedArgument: true,
};

export const LIST_ZIP_OBJECT_CONFIG = {
    name: 'list-zip-object',
    aliases: ['nox-list-zip-object'],
    returns: 'The zipped object',
    namedArgumentList: [
        slash_named_arg.fromProps({
            name: 'deep',
            description: 'Whether to zip using property paths as keys',
            typeList: [boolean_type],
            isRequired: false,
        }),
    ],
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The key list to zip',
            typeList: [
                list_type,
                var_type
            ],
            isRequired: true,
        }),
        slash_arg.fromProps({
            description: 'The value list to zip',
            typeList: [
                list_type,
                var_type
            ],
            isRequired: true,
        }),
    ],
    splitUnnamedArgument: true,
};
