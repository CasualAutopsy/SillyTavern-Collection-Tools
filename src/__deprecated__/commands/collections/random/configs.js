/* eslint-disable no-undef */
// @ts-nocheck
const { SlashCommandArgument, ARGUMENT_TYPE } = SillyTavern.getContext();




/**
 * Collection - Sample method config
 */
export const COLLECTION_SAMPLE_CONFIG = {
    name: 'collection-sample',
    aliases: ['nox-collection-sample'],
    returns: 'The randomly sampled value',
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The target list / variable (. for local | $ for global | no prefix for scope)',
            typeList: [
                ARGUMENT_TYPE.LIST,
                ARGUMENT_TYPE.DICTIONARY,
                ARGUMENT_TYPE.VARIABLE_NAME
            ],
            isRequired: true,
        }),
    ],
};


/**
 * Collection - Sample size method config
 */
export const COLLECTION_SAMPLE_SIZE_CONFIG = {
    name: 'collection-sample-size',
    aliases: ['nox-collection-sample-size'],
    returns: 'The randomly sampled values',
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The target list / variable (. for local | $ for global | no prefix for scope)',
            typeList: [
                ARGUMENT_TYPE.LIST,
                ARGUMENT_TYPE.DICTIONARY,
                ARGUMENT_TYPE.VARIABLE_NAME
            ],
            isRequired: true,
        }),
        SlashCommandArgument.fromProps({
            description: 'The sample size',
            typeList: [ARGUMENT_TYPE.NUMBER],
            isRequired: true,
        }),
    ],
    splitUnnamedArgument: true,
    splitUnnamedArgumentCount: 2,
};

/**
 * Collection - Shuffle method config
 */
export const COLLECTION_SHUFFLE_CONFIG = {
    name: 'collection-shuffle',
    aliases: ['nox-collection-shuffle'],
    returns: 'The shuffled values',
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The target list / variable (. for local | $ for global | no prefix for scope)',
            typeList: [
                ARGUMENT_TYPE.LIST,
                ARGUMENT_TYPE.DICTIONARY,
                ARGUMENT_TYPE.VARIABLE_NAME
            ],
            isRequired: true,
        }),
    ],
};
