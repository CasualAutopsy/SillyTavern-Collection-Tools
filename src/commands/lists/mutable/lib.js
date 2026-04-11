const isTrueBoolean = (await import(/* webpackIgnore: true */ '/scripts/utils.js')).isTrueBoolean;

const {
    parseValueOrVar,
    mutableParseValueOrVar
} = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js');


/**
 * Handles the /list-push slash command for adding items the end of a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param target - Target list / variable.
 * @param items - Items to push.
 * @returns {number|Array} - Updated list or list length.
 */
export async function listPushCMD(args, [target, ...items]) {
    // Keep SillyTavern values 'as-is' if noParse flag is set, otherwise parse values
    items = !isTrueBoolean(args.noParse)
        ? items.map((item) => {
            return parseValueOrVar(item, args);
        })
        : items;

    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    const listLength = list.push(...items)

    setList(list); // Mutate variable and return appropriate value down the pipe
    return isTrueBoolean(args.jsReturn)
        ? listLength
        : JSON.stringify(list);
}

/**
 * Handles the /list-unshift slash command to add items to the beginning of a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param target - Target list / variable.
 * @param items - Items to unshift.
 * @returns {number|Array} - Updated list or list length.
 */
export async function listUnshiftCMD(args, [target, ...items]) {
    // Keep SillyTavern values 'as-is' if noParse flag is set, otherwise parse values
    items = !isTrueBoolean(args.noParse)
        ? items.map((item) => {
            return parseValueOrVar(item, args);
        })
        : items;

    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    const listLength = list.unshift(...items);

    setList(list); // Mutate variable and return appropriate value down the pipe
    return isTrueBoolean(args.jsReturn)
        ? listLength
        : JSON.stringify(list);
}

/**
 * Handles the /list-pop slash command to remove an item from the end of a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param target - Target list / variable.
 * @returns {*|Array} - Popped item or updated list.
 */
export async function listPopCMD(args, target) {
    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    const swap = isTrueBoolean(args.swapReturn);
    const popped = list.pop();

    setList(swap ? popped : list); // Mutate variable and return appropriate value down the pipe
    return isTrueBoolean(args.jsReturn)
        ? popped
        : JSON.stringify(list);
}

/**
 * Handles the /list-shift slash command to remove an item from the beginning of a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param target - Target list / variable.
 * @returns {*|Array} - Shifted item or updated list.
 */
export async function listShiftCMD(args, target) {
    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    const swap = isTrueBoolean(args.swapReturn);
    const shifted = list.shift();

    setList(swap ? shifted : list); // Mutate variable and return appropriate value down the pipe
    return isTrueBoolean(args.jsReturn)
        ? shifted
        : JSON.stringify(list);
}

/**
 * Handles the /list-splice slash command to remove/replace items from a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param target - Target list / variable.
 * @param items - Items to add to the list.
 * @returns {*|Array} - Spliced items or updated list.
 */
export async function listSpliceCMD(args, [target, ...items]) {
    // Keep SillyTavern values 'as-is' if noParse flag is set, otherwise parse values
    items = !isTrueBoolean(args.noParse)
        ? items.map((item) => {
            return parseValueOrVar(item, args);
        })
        : items;

    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    const jsReturn = isTrueBoolean(args.jsReturn);
    const swapReturn = isTrueBoolean(args.swapReturn);

    const del_list = list.splice(args.start, args.del, ...items);

    setList(swapReturn? del_list : list); // Mutate variable and return appropriate value down the pipe
    return swapReturn || !jsReturn
        ? JSON.stringify(list)
        : JSON.stringify(del_list);
}

/**
 * Handles the /list-sort slash command to sort a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param target - Target list / variable.
 * @returns {Array} - Sorted list.
 */
export async function listSortCMD(args, target) {
    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    list.sort();
    if (isTrueBoolean(args.reverse)) {
        list.reverse();
    }

    setList(list); // Mutate variable and return it down the pipe
    return JSON.stringify(list);
}

/**
 * Handles the /list-reverse slash command to reverse a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param target - Target list / variable.
 * @returns {Array} - Reversed list.
 */
export async function listReverseCMD(args, target) {
    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    list.reverse();

    setList(list); // Mutate variable and return it down the pipe
    return JSON.stringify(list);
}

/**
 * Handles the /list-fill slash command to fill a list with a single value.
 *
 * @param {Object} args - Slash command arguments.
 * @param target - Target list / variable.
 * @param item - Item to fill the list with.
 * @returns {*} - Filled list.
 */
export async function listFillCMD(args, [target, item]) {
    // Keep SillyTavern values 'as-is' if noParse flag is set, otherwise parse values
    item = !isTrueBoolean(args.noParse)
        ? parseValueOrVar(item, args)
        : item;

    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    list.fill(item, args.start ? args.start : undefined, args.end ? args.end : undefined);

    setList(list); // Mutate variable and return it down the pipe
    return JSON.stringify(list);
}

/**
 * Handles the /list-copywithin slash command to copy a portion of a list to another location within the list.
 *
 * @param {Object} args - Slash command arguments.
 * @param target - Target list / variable.
 * @returns {Array} - List with copied values.
 */
export async function listCopyWithinCMD(args, target) {
    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    list.copyWithin(args.target, args.start, args.end ? args.end : undefined);

    setList(list); // Mutate variable and return it down the pipe
    return JSON.stringify(list);
}
