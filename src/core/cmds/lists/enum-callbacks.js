import { STPublic as pub } from '../../../external/st-public.js';


const argH = NoxLib.SlashHandlers.argHandler;

const {
    SlashCommandClosure,
    SlashCommandBreakController,
    SlashCommandNamedArgumentAssignment
} = pub;

/**
 * @import {} from '../../../../global'
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommandClosure.js').SlashCommandClosure} Closure
 */

/**
 * Slash command callback for calling a closure for every item in a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The scope's pipe.
 */
async function listForEachCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-for-each] The list argument is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-for-each] Unnamed arguments is not a closure.');
    } else {
        closure.breakController = new SlashCommandBreakController();

        if (closure.argumentList.length == 0) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'item';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 1) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'index';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 2) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'array';
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
        if (closure.argumentList.length > 2) {
            const ass = new SlashCommandNamedArgumentAssignment();
            ass.name = closure.argumentList[2].name;
            closure.providedArgumentList[2] = ass;
        }
    }

    closure.providedArgumentList[2].value = JSON.stringify(list);
    list = list.map((it, i) => [it, i]);
    for (let [item, index] of list) {
        if (closure.argumentList.length > 0) {
            closure.providedArgumentList[0].value = typeof item === 'string'
                ? item
                : typeof item === 'object'
                    ? JSON.stringify(item)
                    : String(item);
        }
        if (closure.argumentList.length > 1) {
            closure.providedArgumentList[1].value = index.toString();
        }

        const closure_result = await closure.execute();

        if (closure_result.isAborted) {
            break;
        }

        if (closure_result.isBreak) {
            break;
        }
    }

    return args._scope.pipe;
}

/**
 * Slash command callback for mapping a list with a closure.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listMapCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-map] The list argument is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-map] Unnamed arguments is not a closure.');
    } else {
        closure.breakController = new SlashCommandBreakController();

        if (closure.argumentList.length == 0) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'item';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 1) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'index';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 2) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'array';
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
        if (closure.argumentList.length > 2) {
            const ass = new SlashCommandNamedArgumentAssignment();
            ass.name = closure.argumentList[2].name;
            closure.providedArgumentList[2] = ass;
        }
    }

    closure.providedArgumentList[2].value = JSON.stringify(list);
    list = list.map((it, i) => [it, i]);

    let new_list = [];
    for (let [item, index] of list) {
        if (closure.argumentList.length > 0) {
            closure.providedArgumentList[0].value = typeof item === 'string'
                ? item
                : typeof item === 'object'
                    ? JSON.stringify(item)
                    : String(item);
        }
        if (closure.argumentList.length > 1) {
            closure.providedArgumentList[1].value = index.toString();
        }

        const closure_result = await closure.execute();

        if (closure_result.isAborted) {
            break;
        }
        if (closure_result.isBreak) {
            break;
        }

        new_list.push(argH.parse(closure_result.pipe, args.toType));
    }

    return JSON.stringify(new_list);
}

export {
    listForEachCallback,
    listMapCallback
};
