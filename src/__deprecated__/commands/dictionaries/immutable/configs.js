const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext()

    , slash_named_arg = context.SlashCommandNamedArgument
    , slash_arg = context.SlashCommandArgument;

const arg_types = context.ARGUMENT_TYPE

    , string_type = arg_types.STRING
    , number_type = arg_types.NUMBER
    , boolean_type = arg_types.BOOLEAN
    , list_type = arg_types.LIST
    , dict_type = arg_types.DICTIONARY
    , var_type = arg_types.VARIABLE_NAME;

export const DICT_AT_CONFIG = {
    name: 'dict-at',
    aliases: ['nox-dict-at'],
    returns: 'The retrieved value',
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The dictionary to retrieve from',
            typeList: [
                dict_type,
                var_type,
            ],
            isRequired: true,
        }),
        slash_arg.fromProps({
            description: 'The paths to the values to retrieve',
            typeList: [
                string_type,
            ],
            acceptsMultiple: true,
            isRequired: true,
        }),
    ],
    splitUnnamedArgument: true,
};

export const DICT_GET_CONFIG = {
    name: 'dict-get',
    aliases: ['nox-dict-get'],
    returns: 'The retrieved values',
    namedArgumentList: [
        slash_named_arg.fromProps({
            name: 'default',
            description: 'The default value to return if the key is not found',
            typeList: [
                string_type,
                number_type,
                boolean_type,
                list_type,
                dict_type,
                var_type,
            ],
        }),
    ],
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The dictionary to retrieve from',
            typeList: [
                dict_type,
                var_type,
            ],
            isRequired: true,
        }),
        slash_arg.fromProps({
            description: 'the path to the value to retrieve',
            typeList: [
                string_type,
            ],
            isRequired: true,
        }),
    ],
    splitUnnamedArgument: true,
};
