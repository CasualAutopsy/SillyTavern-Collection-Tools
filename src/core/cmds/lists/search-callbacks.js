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
 * Slash command callback for getting an item from a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listAtCallback(args, val) {
    const index = argH.parse(args.index, 'int');
    const list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-at] The input is not a list.');
    }

    const item = list.at(index);

    return typeof item === 'object'
        ? JSON.stringify(item)
        : String(item);
}

/**
 * Slash command callback for getting the index
 * of the first occurrence of an item from a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listIndexOfCallback(args, val) {
    const parse_search_element = args.parse
        ? argH.parse(args.parse, 'bool')
        : true;
    const search_element = parse_search_element
        ? argH.parseVar(args.search, args)
        : args.search;
    const list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-index-of] The input is not a list.');
    }

    return String(list.indexOf(search_element));
}

/**
 * Slash command callback for getting the index
 * of the last occurrence of an item from a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {UnnamedArguments} vals - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listLastIndexOfCallback(args, val) {
    const parse_search_element = args.parse
        ? argH.parse(args.parse, 'bool')
        : true;
    const search_element = parse_search_element
        ? argH.parseVar(args.search, args)
        : args.search;
    const list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-last-index-of] The input is not a list.');
    }

    return String(list.lastIndexOf(search_element));
}

/**
 * Slash command callback for finding the first item
 * in a list that satisfies a condition.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listFindCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-find] The list argument is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-find] Unnamed arguments is not a closure.');
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

    let find_result;
    for (const [item, index] of list) {
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

        if (argH.stBoolCoercion(closure_result.pipe) === true) {
            find_result = item;
            break;
        }
    }

    if (find_result == null) {
        return '';
    } else {
        return typeof find_result === 'object'
            ? JSON.stringify(find_result)
            : String(find_result);
    }
}

/**
 * Slash command callback for finding the last item
 * in a list that satisfies a condition.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listFindLastCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-find-last] The list argument is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-find-last] Unnamed arguments is not a closure.');
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

    let find_result;
    for (const [item, index] of list.reverse()) {
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

        if (argH.stBoolCoercion(closure_result.pipe) === true) {
            find_result = item;
            break;
        }
    }

    if (find_result == null) {
        return '';
    } else {
        return typeof find_result === 'object'
            ? JSON.stringify(find_result)
            : String(find_result);
    }
}

/**
 * Slash command callback for finding the index
 * of the first item in a list that satisfies a condition.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listFindIndexCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-find-index] The list argument is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-find-index] Unnamed arguments is not a closure.');
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

    let find_result;
    for (const [item, index] of list) {
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

        if (argH.stBoolCoercion(closure_result.pipe) === true) {
            find_result = index;
            break;
        }
    }

    if (find_result == null) {
        return '';
    } else {
        return String(find_result);
    }
}

/**
 * Slash command callback for finding the index
 * of the last item in a list that satisfies a condition.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listFindLastIndexCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-find-last-index] The list argument is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-find-last-index] Unnamed arguments is not a closure.');
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

    let find_result;
    for (const [item, index] of list.reverse()) {
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

        if (argH.stBoolCoercion(closure_result.pipe) === true) {
            find_result = index;
            break;
        }
    }

    if (find_result == null) {
        return '';
    } else {
        return String(find_result);
    }
}

export {
    listAtCallback,
    listIndexOfCallback, listLastIndexOfCallback,
    listFindCallback, listFindLastCallback,
    listFindIndexCallback, listFindLastIndexCallback
};
