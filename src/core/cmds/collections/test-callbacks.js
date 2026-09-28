import { STPublic as pub } from '../../../external/st-public.js';


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
 * Slash command callback for checking if
 * every item in a collection satisfies a condition.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified boolean result.
 */
async function collEveryCallback(args, val) {
    const coll = argH.parseVar(args.coll, args, 'json');
    const closure = val instanceof SlashCommandClosure
        ? val
        : new SlashCommandClosure(val);

    if (closure == null) {
        throw new TypeError('[Collection Tools | coll-every] Unnamed argument is not a closure.');
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

    let breaked = false;
    let every_result = true;
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

        if (!argH.stBoolCoercion(closure_result.pipe)) {
            every_result = false;
            break;
        }
    }

    if (breaked) {
        return args._scope.pipe;
    }

    return String(every_result);
}

/**
 * Slash command callback for checking if
 * a single item in a collection satisfies a condition.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified boolean result.
 */
async function collSomeCallback(args, val) {
    const coll = argH.parseVar(args.coll, args, 'json');
    const closure = val instanceof SlashCommandClosure
        ? val
        : new SlashCommandClosure(val);

    if (closure == null) {
        throw new TypeError('[Collection Tools | coll-some] Unnamed argument is not a closure.');
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

    let breaked = false;
    let some_result = false;
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

        if (argH.stBoolCoercion(closure_result.pipe)) {
            some_result = true;
            break;
        }
    }

    if (breaked) {
        return args._scope.pipe;
    }

    return String(some_result);
}

export {
    collEveryCallback, collSomeCallback
};
