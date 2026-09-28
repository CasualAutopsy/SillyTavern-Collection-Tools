import { STPublic as pub } from "../../../external/st-public.js";


const {
    at, get
} = SillyTavern.libs.lodash;

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
 * Slash command callback for finding the
 * first or last occurrence in a collection.
 *
 * @param {NamedArguments} args - Named arguments + slash command scope.
 * @param {Closure} val - Unnamed arguments.
 *
 * @returns {Promise<string>} - The stringified value.
 */
async function collFindCallback(args, val) {
    const coll = argH.parseVar(args.coll, args, 'json');
    const closure = val instanceof SlashCommandClosure
        ? val
        : null;

    if (closure == null) {
        throw new TypeError('[Collection | coll-find-key-index] Unnamed argument is not a closure.');
    } else {
        closure.breakController = new SlashCommandBreakController();

        if (!Array.isArray(coll)) {
            if (closure.argumentList.length === 0) {
                const arg = new SlashCommandNamedArgumentAssignment();
                arg.name = 'value';
                closure.argumentList.push(arg);
            }
            if (closure.argumentList.length === 1) {
                const arg = new SlashCommandNamedArgumentAssignment();
                arg.name = 'key';
                closure.argumentList.push(arg);
            }
            if (closure.argumentList.length === 2) {
                const arg = new SlashCommandNamedArgumentAssignment();
                arg.name = 'dict';
                closure.argumentList.push(arg);
            }
        } else {
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
            if (closure.argumentList.length === 2) {
                const arg = new SlashCommandNamedArgumentAssignment();
                arg.name = 'list';
                closure.argumentList.push(arg);
            }
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
    let coll_enum = Array.isArray(coll)
        ? coll.map((item, index) => [item, index])
        : Object.entries(coll);

    if (args.last) {
        coll_enum.reverse();
    }

    /** @type {any} */
    let find_result = '';
    let breaked = false;
    for (const [k, v] of coll_enum) {
        if (closure.argumentList.length > 0) {
            closure.providedArgumentList[0].value = typeof v === 'string'
                ? v
                : typeof v === 'object'
                    ? JSON.stringify(v)
                    : String(v);
        }
        if (closure.argumentList.length > 1) {
            closure.providedArgumentList[1].value = k;
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
            if (!args.index) {
                find_result = v;
                break;
            } else {
                find_result = k;
                break;
            }
        }
    }

    if (breaked) {
        return args._scope.pipe;
    }

    if (find_result === '') {
        return '';
    } else {
        return typeof find_result === 'object'
            ? JSON.stringify(find_result)
            : String(find_result);
    }
}

export {
    collFindCallback
};
