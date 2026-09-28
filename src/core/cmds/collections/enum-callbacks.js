import { STPublic as pub } from  '../../../external/st-public.js';


const { flatten, flattenDeep, flattenDepth } = SillyTavern.libs.lodash;

const argH = NoxLib.SlashHandlers.argHandler;


const {
    SlashCommandClosure,
    SlashCommandBreakController,
    SlashCommandNamedArgumentAssignment
} = pub;


/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 * @typedef {import('../../../../../../../slash-commands/SlashCommandClosure.js').SlashCommandClosure} Closure
 */


/**
 * Slash command callback for getting the
 * index/keys, values, or entries of a collection.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {string} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified list.
 */
async function collEntriesCallback(args, val) {
    const coll = argH.parseVar(val, args, 'json');

    if (!Array.isArray(coll)) {
        switch (args.mode) {
            case "keys":
                return JSON.stringify(Object.keys(coll));
            case "values":
                return JSON.stringify(Object.values(coll));
            default:
                return JSON.stringify(Object.entries(coll));
        }
    } else {
        switch (args.mode) {
            case "keys":
                return JSON.stringify([...coll.keys()]);
            case "values":
                return JSON.stringify(coll);
            default:
                return JSON.stringify(coll.map((item, index) => [index, item]));
        }
    }
}

/**
 * Slash command callback for mapping a
 * collection using a closure.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified mapped list.
 */
async function collMapCallback(args, val) {
    const coll = argH.parseVar(args.target, args, 'json');
    const closure = val instanceof SlashCommandClosure
        ? val
        : null;

    const flatten_result = args.flatten == null
        ? false
        : argH.stBoolCoercion(args.flatten);

    const depth = args.depth == null
        ? 0
        : args.depth === 'deep'
            ? args.depth
            : argH.parse(args.depth, 'int');

    if (typeof depth === 'number' && depth < 0) {
        throw new TypeError('[Collection Tools | coll-map] The depth argument must be a positive integer.');
    }

    if (closure == null) {
        throw new TypeError('[Collection Tools | coll-map] Unnamed argument is not a closure.');
    } else {
        closure.breakController = new SlashCommandBreakController();

        if (closure.argumentList.length == 0) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'value';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 1) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'key';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 2) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'collection';
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

    closure.providedArgumentList[2].value = JSON.stringify(coll);
    const coll_enum = Array.isArray(coll)
        ? coll.map((item, index) => [index, item])
        : Object.entries(coll);

    let mapped = [];
    let breaked = false;
    for (const [key, value] of coll_enum) {
        if (closure.argumentList.length > 0) {
            closure.providedArgumentList[0].value = typeof value === 'string'
                ? value
                : typeof value === 'object'
                    ? JSON.stringify(value)
                    : String(value);
        }
        if (closure.argumentList.length > 1) {
            closure.providedArgumentList[1].value = typeof key === 'string'
                ? key
                : String(key);
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

        if (args.toType == null) {
            const parsed_value = argH.parse(closure_result.pipe);
            mapped.push(parsed_value);
        } else if (args.toType === 'string') {
            mapped.push(closure_result.pipe);
        } else {
            const parsed_value = argH.parse(closure_result.pipe, args.toType);
            mapped.push(parsed_value);
        }
    }

    if (breaked) {
        return args._scope.pipe;
    }

    if (flatten_result && (args.toType == null || args.toType === 'json')) {
        if (depth === 0) {
            return JSON.stringify(flatten(mapped));
        } else if (depth === 'deep') {
            return JSON.stringify(flattenDeep(mapped));
        } else {
            return JSON.stringify(flattenDepth(mapped, depth));
        }
    }

    return JSON.stringify(mapped);
}

/**
 * Slash command callback for iterating over
 * a collection and executing a closure for each item.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The previous pipe value.
 */
async function collForEachCallback(args, val) {
    const coll = argH.parseVar(args.target, args, 'json');
    const closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (closure == null) {
        throw new TypeError('[Collection Tools | coll-for-each] Unnamed argument is not a closure.');
    } else {
        closure.breakController = new SlashCommandBreakController();

        if (closure.argumentList.length == 0) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'value';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 1) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'key';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 2) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'collection';
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

    closure.providedArgumentList[2].value = JSON.stringify(coll);
    const coll_enum = Array.isArray(coll)
        ? coll.map((item, index) => [index, item])
        : Object.entries(coll);

    for (let [key, value] of coll_enum) {
        if (closure.argumentList.length > 0) {
            closure.providedArgumentList[0].value = typeof value === 'string'
                ? value
                : typeof value === 'object'
                    ? JSON.stringify(value)
                    : String(value);
        }
        if (closure.argumentList.length > 1) {
            closure.providedArgumentList[1].value = typeof key === 'string'
                ? key
                : String(key);
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
 * Slash command callback for filtering a collection with a closure.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The filtered collection.
 */
async function collFilterCallback(args, val) {
    const coll = argH.parseVar(args.target, args, 'json');
    const closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (closure == null) {
        throw new TypeError('[Collection Tools | coll-filter] Unnamed argument is not a closure.');
    } else {
        closure.breakController = new SlashCommandBreakController();

        if (closure.argumentList.length == 0) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'key';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 1) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'value';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 2) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'collection';
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

    closure.providedArgumentList[2].value = JSON.stringify(coll);
    const coll_enum = Array.isArray(coll)
        ? coll.map((item, index) => [index, item])
        : Object.entries(coll);

    let filtered = [];
    let breaked = false;
    for (let [key, value] of coll_enum) {
        if (closure.argumentList.length > 0) {
            closure.providedArgumentList[0].value = typeof value === 'string'
                ? value
                : typeof value === 'object'
                    ? JSON.stringify(value)
                    : String(value);
        }
        if (closure.argumentList.length > 1) {
            closure.providedArgumentList[1].value = typeof key === 'string'
                ? key
                : String(key);
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

        if (argH.stBoolCoercion(closure_result.pipe)) {
            filtered.push(value);
        }
    }

    if (breaked) {
        return args._scope.pipe;
    }

    return JSON.stringify(filtered);
}

/**
 * Slash command callback for reducing a collection
 * using a closure to iterate each item with.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The reduced collection.
 */
async function collReduceCallback(args, val) {
    const coll = argH.parseVar(args.coll, args, 'json');
    const closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (closure == null) {
        throw new TypeError('[Collection Tools | coll-reduce] Unnamed argument is not a closure.');
    } else {
        closure.breakController = new SlashCommandBreakController();

        if (closure.argumentList.length == 0) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'accumulator';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 1) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'value';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 2) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'key';
            closure.argumentList.push(arg);
        }
        if (closure.argumentList.length == 3) {
            const arg = new SlashCommandNamedArgumentAssignment();
            arg.name = 'collection';
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

    closure.providedArgumentList[3].value = JSON.stringify(coll);
    const coll_enum = Array.isArray(coll)
        ? coll.map((item, index) => [index, item])
        : Object.entries(coll);

    if (args.reverse) {
        coll_enum.reverse();
    }

    let reduce_result = args.initial;
    let breaked = false;
    for (const [key, value] of coll_enum) {
        if (closure.argumentList.length > 0) {
            closure.providedArgumentList[0].value = typeof reduce_result === 'string'
                ? reduce_result
                : typeof reduce_result === 'object'
                    ? JSON.stringify(reduce_result)
                    : String(reduce_result);
        }
        if (closure.argumentList.length > 1) {
            closure.providedArgumentList[1].value = typeof value === 'string'
                ? value
                : typeof value === 'object'
                    ? JSON.stringify(value)
                    : String(value);
        }
        if (closure.argumentList.length > 2) {
            closure.providedArgumentList[2].value = typeof key === 'string'
                ? key
                : String(key);
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
    collEntriesCallback,
    collMapCallback,
    collForEachCallback,
    collFilterCallback,
    collReduceCallback,
};
