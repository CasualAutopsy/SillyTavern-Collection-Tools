const context = (await import(/* webpackIgnore: true */ '/scripts/st-context.js')).getContext();

const slash_arg = context.SlashCommandArgument;

const arg_types = context.ARGUMENT_TYPE;

const number_type = arg_types.NUMBER;
const list_type = arg_types.LIST;
const dict_type = arg_types.DICTIONARY;
const var_type = arg_types.VARIABLE_NAME;



export const COLLECTION_SAMPLE_CONFIG = {
    name: 'collection-sample',
    aliases: ['nox-collection-sample'],
    returns: 'The randomly sampled value',
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target list / variable (. for local | $ for global | no prefix for scope)',
            typeList: [list_type, dict_type, var_type],
            isRequired: true,
        }),
    ],
};

export const COLLECTION_SAMPLE_SIZE_CONFIG = {
    name: 'collection-sample-size',
    aliases: ['nox-collection-sample-size'],
    returns: 'The randomly sampled values',
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target list / variable (. for local | $ for global | no prefix for scope)',
            typeList: [list_type, dict_type, var_type],
            isRequired: true,
        }),
        slash_arg.fromProps({
            description: 'The sample size',
            typeList: [number_type],
            isRequired: true,
        }),
    ],
    splitUnnamedArgument: true,
    splitUnnamedArgumentCount: 2,
};

export const COLLECTION_SHUFFLE_CONFIG = {
    name: 'collection-shuffle',
    aliases: ['nox-collection-shuffle'],
    returns: 'The shuffled values',
    unnamedArgumentList: [
        slash_arg.fromProps({
            description: 'The target list / variable (. for local | $ for global | no prefix for scope)',
            typeList: [list_type, dict_type, var_type],
            isRequired: true,
        }),
    ],
};
