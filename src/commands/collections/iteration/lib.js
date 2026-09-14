/* eslint-disable no-undef */
// @ts-nocheck
const { SlashCommandClosure } = await import(/* webpackIgnore: true */'/scripts/slash-commands/SlashCommandClosure.js');
const { SlashCommandNamedArgumentAssignment } = await import(/* webpackIgnore: true */'/scripts/slash-commands/SlashCommandNamedArgumentAssignment.js');
const { SlashCommandBreakController } = await import(/* webpackIgnore: true */'/scripts/slash-commands/SlashCommandBreakController.js');

const { shorthandJSONResolver } = NoxLib.CoercionAndShorthand.VarShorthand

/**
 * @typedef {import('/scripts/slash-commands/SlashCommand').NamedArguments} NamedArguments
 * @typedef {import('/scripts/slash-commands/SlashCommand').UnnamedArguments} UnnamedArguments
 *
 * @typedef {import('/scripts/slash-commands/SlashCommandClosure').SlashCommandClosure} SlashCommandClosure
 * @typedef {import('/scripts/slash-commands/SlashCommandClosureResult').SlashCommandClosureResult} SlashCommandClosureResult
 */

/**
 *
 * @param {NamedArguments} args - Named arguments
 * @param {UnnamedArguments} val - Unnamed arguments
 */
export async function forEachCMD(args, val) {
    /** @type {Array<*>} */
    let list;
    /** @type {SlashCommandClosure} */
    let closure;
    /** @type {SlashCommandClosureResult} */
    let closureResult;

    /** @type {String} */
    let result;

    list = shorthandJSONResolver(val[0], args);
    if (val[1] instanceof SlashCommandClosure) {
        closure = /**@type {SlashCommandClosure}*/(val[1]);
    } else {
        throw new TypeError('Argument 2 must be a closure');
    }


    const isList = Array.isArray(list);
    if (isList) {
        list = list.map((it, idx) => [idx, it]);
    } else {
        list = Object.entries(list);
    }

    if (closure.argumentList.length === 0) {
        const arg = new SlashCommandNamedArgumentAssignment();
        arg.name = 'item';
        closure.argumentList.push(arg);
    }
    if (closure.argumentList.length === 1) {
        const arg = new SlashCommandNamedArgumentAssignment();
        arg.name = 'index';
        closure.argumentList.push(arg);
    }

    if (closure.argumentList.length > 0) {
        const ass = new SlashCommandNamedArgumentAssignment();
        ass.name = closure.argumentList[0].name;
        closure.providedArgumentList[0] = ass;
    }
    if (closure.argumentList.length > 1) {
        const ass = new SlashCommandNamedArgumentAssignment();
        ass.name = closure.argumentList[1].name;
        closure.providedArgumentList[1] = ass;
    }

    for (let [index, item] of list) {
        if (typeof item == 'object') {
            item = JSON.stringify(item);
        }

        if (closure.argumentList.length > 0) {
            closure.providedArgumentList[0].value = typeof item == 'string' ? item : JSON.stringify(item);
        }
        if (closure.argumentList.length > 1) {
            closure.providedArgumentList[1].value = index.toString();
        }

        closure.breakController = new SlashCommandBreakController();
        closureResult = (await closure.execute());
        if (closureResult.isAborted) break;
        if (closureResult.isBreak) break;

        result = closureResult.pipe;
    }

    return result;
}
