import { STPublic as pub } from '../../../external/st-public.js';

const argH = NoxLib.SlashHandlers.argHandler;

const {
    SlashCommandClosure,
    SlashCommandBreakController,
    SlashCommandNamedArgumentAssignment
} = pub;

/**
 * @import {} from '../../../../global.js'
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommandClosure.js').SlashCommandClosure} Closure
 */

/**
 * Slash command callback for checking if a list includes an item.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listIncludesCallback(args, val) {

    if (typeof args.parse !== 'string') {
        throw new TypeError('[Collection Tools | list-includes] Expected \'parse\' to be a value. Got a closure instead.');
    }

    if (typeof args.search !== 'string') {
        throw new TypeError('[Collection Tools | list-includes] Expected \'search\' to be a value. Got a closure instead.');
    }

    const parse_search_element = args.parse
        ? argH.parse(args.parse, 'bool')
        : true;
    const search_element = parse_search_element
        ? argH.parseVar(args.search, args)
        : args.search;
    const list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-includes] The input is not a list.');
    }

    return String(list.includes(search_element));
}

/**
 * Slash command callback for checking if every item in a list satisfies a condition.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listEveryCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-every] The list argument is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-every] Unnamed argument is not a closure.');
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

    let test_result = true;
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
            test_result = false;
            break;
        }
        if (closure_result.isBreak) {
            test_result = false;
            break;
        }

        if (argH.stBoolCoercion(closure_result.pipe) === false) {
            test_result = false;
        }
    }

    return String(test_result);
}

/**
 * Slash command callback for checking if any item in a list satisfies a condition.
 *
 * @param {UnnamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listSomeCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-some] The list argument is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-some] Unnamed argument is not a closure.');
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

    let test_result = false;
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
            test_result = false;
            break;
        }
        if (closure_result.isBreak) {
            test_result = false;
            break;
        }

        if (argH.stBoolCoercion(closure_result.pipe) === true) {
            test_result = true;
            break;
        }
    }

    return String(test_result);
}

export {
    listIncludesCallback,
    listEveryCallback,
    listSomeCallback
};
