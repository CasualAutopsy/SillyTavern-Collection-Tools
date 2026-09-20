const { SlashCommandClosure } = await import(/* webpackIgnore: true */'/scripts/slash-commands/SlashCommandClosure.js');
const { SlashCommandBreakController } = await import(/* webpackIgnore: true */'/scripts/slash-commands/SlashCommandBreakController.js');
const { SlashCommandNamedArgumentAssignment } = await import(/* webpackIgnore: true */'/scripts/slash-commands/SlashCommandNamedArgumentAssignment.js');

/**
 * @import {} from '../../global'
 */

export const STPublic = {
    SlashCommandClosure,
    SlashCommandBreakController,
    SlashCommandNamedArgumentAssignment
};
