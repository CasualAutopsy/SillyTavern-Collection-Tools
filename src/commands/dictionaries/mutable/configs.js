const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext()

    , slash_arg = context.SlashCommandArgument;

const arg_types = context.ARGUMENT_TYPE

    , string_type = arg_types.STRING
    , dict_type = arg_types.DICTIONARY;

export const DICT_ASSIGN_CONFIG = {
    name: 'dict-assign',
    aliases: ['nox-dict-assign'],
    returns: 'The updated dictionary',
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target dictionary to assign to',
            typeList: [string_type, dict_type],
            isRequired: true,
        }),
        slash_arg.fromProps({
            description: 'The source dictionaries to assign from',
            typeList: [string_type, dict_type],
            isRequired: true,
            acceptsMultiple: true,
        }),
    ],
    splitUnnamedArgument: true,
};
