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
 * Slash command callback for getting the index keys of a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The list's stringified index.
 */
async function listIndexCallback(args, val) {
    let list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-keys] The argument is not a list.');
    }

    return JSON.stringify(list.keys());
}

/**
 * Slash command callback for getting the zipped indices and values of a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The list's stringified index.
 */
async function listEntriesCallback(args, val) {
    let list = argH.parseVar(val, args, 'json');

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-entries] The argument is not a list.');
    }

    return JSON.stringify(list.entries());
}

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
    let breaked = false;
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
            breaked = true;
            break;
        }
        if (closure_result.isBreak) {
            breaked = true;
            break;
        }

        if (args.toType === null) {
            const parsed_value = argH.parse(closure_result.pipe);
            new_list.push(parsed_value);
        } else if (args.toType === 'string') {
            new_list.push(closure_result.pipe);
        } else {
            const parsed_value = argH.parse(closure_result.pipe, args.toType);
            new_list.push(parsed_value);
        }
    }

    if (breaked) {
        return args._scope.pipe;
    }

    return JSON.stringify(new_list);
}

/**
 * Slash command callback for mapping then flattening a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified list.
 */
async function listFlatMapCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-flat-map] Input is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-flat-map] Unnamed arguments is not a closure.');
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
    let breaked = false;
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
            breaked = true;
            break;
        }

        if (closure_result.isBreak) {
            breaked = true;
            break;
        }

        if (args.toType === null) {
            const parsed_value = argH.parse(closure_result.pipe);
            new_list.push(parsed_value);
        } else if (args.toType === 'string') {
            new_list.push(closure_result.pipe);
        } else {
            const parsed_value = argH.parse(closure_result.pipe, args.toType);
            new_list.push(parsed_value);
        }
    }

    if (breaked) {
        return args._scope.pipe;
    }

    new_list.flat(1);

    return JSON.stringify(new_list);
}

async function listFilterCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-filter] Input is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-filter] Unnamed arguments is not a closure.');
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
    let breaked = false;
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
            breaked = true;
            break;
        }

        if (closure_result.isBreak) {
            breaked = true;
            break;
        }

        if (argH.stBoolCoercion(closure_result.pipe) === true) {
            new_list.push(item);
        }
    }

    if (breaked) {
        return args._scope.pipe;
    }

    return JSON.stringify(new_list);
}

/**
 * Slash command callback for reducing a list.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listReduceCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-reduce] Input is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-reduce] Unnamed arguments is not a closure.');
    } else {
        closure.breakController = new SlashCommandBreakController();

        if (closure.argumentList.length == 0) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'acc';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 1) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'curr';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 2) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'index';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 3) {
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
        if (closure.argumentList.length > 3) {
            const ass = new SlashCommandNamedArgumentAssignment();
            ass.name = closure.argumentList[3].name;
            closure.providedArgumentList[3] = ass;
        }
    }

    closure.providedArgumentList[3].value = JSON.stringify(list);
    list = list.map((it, i) => [it, i]);

    let reduce_result;
    let breaked = false;
    for (let [item, index] of list) {
        if (closure.argumentList.length > 0) {
            closure.providedArgumentList[0].value = typeof reduce_result === 'string'
                ? reduce_result
                : typeof reduce_result === 'object'
                    ? JSON.stringify(reduce_result)
                    : String(reduce_result);
        }
        if (closure.argumentList.length > 1) {
            closure.providedArgumentList[1].value = typeof item === 'string'
                ? item
                : typeof item === 'object'
                    ? JSON.stringify(item)
                    : String(item);
        }
        if (closure.argumentList.length > 2) {
            closure.providedArgumentList[2].value = index.toString();
        }

        const closure_result = await closure.execute();

        if (closure_result.isAborted) {
            breaked = true;
            break;
        }

        if (closure_result.isBreak) {
            breaked = true;
            break;
        }

        reduce_result = argH.parse(closure_result.pipe);
    }

    if (breaked) {
        return args._scope.pipe;
    }

    return typeof reduce_result === 'string'
        ? reduce_result
        : typeof reduce_result === 'object'
            ? JSON.stringify(reduce_result)
            : String(reduce_result);
}

/**
 * Slash command callback for reducing a list in reverse order.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function listReduceRightCallback(args, val) {
    let list = argH.parseVar(args.list, args, 'json');
    let closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (!Array.isArray(list)) {
        throw new TypeError('[Collection Tools | list-reduce-right] Input is not a list.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | list-reduce-right] Unnamed arguments is not a closure.');
    } else {
        closure.breakController = new SlashCommandBreakController();

        if (closure.argumentList.length == 0) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'acc';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 1) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'curr';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 2) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'index';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 3) {
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
        if (closure.argumentList.length > 3) {
            const ass = new SlashCommandNamedArgumentAssignment();
            ass.name = closure.argumentList[3].name;
            closure.providedArgumentList[3] = ass;
        }
    }

    closure.providedArgumentList[3].value = JSON.stringify(list);
    list = list.map((it, i) => [it, i]);

    let reduce_result = args.initial != null
        ? argH.parse(args.initial)
        : '';
    let breaked = false;
    for (let [item, index] of list.reverse()) {
        if (closure.argumentList.length > 0) {
            closure.providedArgumentList[0].value = typeof reduce_result === 'string'
                ? reduce_result
                : typeof reduce_result === 'object'
                    ? JSON.stringify(reduce_result)
                    : String(reduce_result);
        }
        if (closure.argumentList.length > 1) {
            closure.providedArgumentList[1].value = typeof item === 'string'
                ? item
                : typeof item === 'object'
                    ? JSON.stringify(item)
                    : String(item);
        }
        if (closure.argumentList.length > 2) {
            closure.providedArgumentList[2].value = index.toString();
        }

        const closure_result = await closure.execute();

        if (closure_result.isAborted) {
            breaked = true;
            break;
        }

        if (closure_result.isBreak) {
            breaked = true;
            break;
        }

        reduce_result = argH.parse(closure_result.pipe);
    }

    if (breaked) {
        return args._scope.pipe;
    }

    return typeof reduce_result === 'string'
        ? reduce_result
        : typeof reduce_result === 'object'
            ? JSON.stringify(reduce_result)
            : String(reduce_result);
}

export {
    listIndexCallback,
    listEntriesCallback,
    listForEachCallback,
    listMapCallback, listFlatMapCallback,
    listFilterCallback,
    listReduceCallback, listReduceRightCallback
};
