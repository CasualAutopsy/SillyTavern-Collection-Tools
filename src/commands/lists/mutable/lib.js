const {isTrueBoolean}
    = await import(/* webpackIgnore: true */ '/scripts/utils.js');

const {
    parseValueOrVar,
    mutableParseValueOrVar
} = await import(/* webpackIgnore: true */ '/scripts/extensions/third-party/STLibs-Nox-Library/scripts/parsing.js');


/**
 * Handles the /list-push slash command for adding items the end of a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param {[String, *[]]} target - Target list / variable.
 * @returns {Promise<String|Number>} - Updated list or list length.
 */
export async function listPushCMD(args, [target, ...items]) {
    // Keep SillyTavern values 'as-is' if noParse flag is set, otherwise parse values
    // @ts-ignore
    items = !isTrueBoolean(args.noParse)
        ? items.map((item) => {
            return parseValueOrVar(item, args);
        })
        : items;

    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args)
    // @ts-ignore
        , listLength = list.push(...items)

    setList(list); // Mutate variable and return appropriate value down the pipe
    // @ts-ignore
    return isTrueBoolean(args.jsReturn)
        ? listLength
        : JSON.stringify(list);
}

/**
 * Handles the /list-unshift slash command to add items to the beginning of a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param {[String, *[]]} target - Target list / variable.
 * @returns {Promise<String|Number>} - Updated list or list length.
 */
export async function listUnshiftCMD(args, [target, ...items]) {
    // Keep SillyTavern values 'as-is' if noParse flag is set, otherwise parse values
    // @ts-ignore
    items = !isTrueBoolean(args.noParse)
        ? items.map((item) => {
            return parseValueOrVar(item, args);
        })
        : items;

    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args)
    // @ts-ignore
        , listLength = list.unshift(...items);

    setList(list); // Mutate variable and return appropriate value down the pipe
    // @ts-ignore
    return isTrueBoolean(args.jsReturn)
        ? listLength
        : JSON.stringify(list);
}

/**
 * Handles the /list-pop slash command to remove an item from the end of a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param {String} target - Target list / variable.
 * @returns {Promise<String|*>} - Popped item or updated list.
 */
export async function listPopCMD(args, target) {
    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    // @ts-ignore
    const swap = isTrueBoolean(args.swapReturn)
    // @ts-ignore
        , popped = list.pop();

    setList(swap ? popped : list); // Mutate variable and return appropriate value down the pipe
    // @ts-ignore
    return isTrueBoolean(args.jsReturn)
        ? popped
        : JSON.stringify(list);
}

/**
 * Handles the /list-shift slash command to remove an item from the beginning of a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param {String} target - Target list / variable.
 * @returns {Promise<String|*>} - Shifted item or updated list.
 */
export async function listShiftCMD(args, target) {
    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    // @ts-ignore
    const swap = isTrueBoolean(args.swapReturn)
    // @ts-ignore
        , shifted = list.shift();

    setList(swap ? shifted : list); // Mutate variable and return appropriate value down the pipe
    // @ts-ignore
    return isTrueBoolean(args.jsReturn)
        ? shifted
        : JSON.stringify(list);
}

/**
 * Handles the /list-splice slash command to remove/replace items from a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param {[String, *[]]} target - Target list / variable.
 * @returns {Promise<String>} - Spliced items or updated list.
 */
export async function listSpliceCMD(args, [target, ...items]) {
    // Keep SillyTavern values 'as-is' if noParse flag is set, otherwise parse values
    // @ts-ignore
    items = !isTrueBoolean(args.noParse)
        ? items.map((item) => {
            return parseValueOrVar(item, args);
        })
        : items;

    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    // @ts-ignore
    const jsReturn = isTrueBoolean(args.jsReturn)
    // @ts-ignore
        , swapReturn = isTrueBoolean(args.swapReturn)

    // @ts-ignore
        , del_list = list.splice(args.start, args.del, ...items);

    setList(swapReturn? del_list : list); // Mutate variable and return appropriate value down the pipe
    return swapReturn || !jsReturn
        ? JSON.stringify(list)
        : JSON.stringify(del_list);
}

/**
 * Handles the /list-sort slash command to sort a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param {String} target - Target list / variable.
 * @returns {Promise<String>} - Sorted list.
 */
export async function listSortCMD(args, target) {
    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    // @ts-ignore
    list.sort();
    // @ts-ignore
    if (isTrueBoolean(args.reverse)) {
        // @ts-ignore
        list.reverse();
    }

    setList(list); // Mutate variable and return it down the pipe
    return JSON.stringify(list);
}

/**
 * Handles the /list-reverse slash command to reverse a list.
 *
 * @param {Object} args - Slash command arguments.
 * @param {String} target - Target list / variable.
 * @returns {Promise<String>} - Reversed list.
 */
export async function listReverseCMD(args, target) {
    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    // @ts-ignore
    list.reverse();

    setList(list); // Mutate variable and return it down the pipe
    return JSON.stringify(list);
}

/**
 * Handles the /list-fill slash command to fill a list with a single value.
 *
 * @param {Object} args - Slash command arguments.
 * @param {[String, *]} target - Target list / variable.
 * @returns {Promise<String>} - Filled list.
 */
export async function listFillCMD(args, [target, item]) {
    // Keep SillyTavern values 'as-is' if noParse flag is set, otherwise parse values
    // @ts-ignore
    item = !isTrueBoolean(args.noParse)
        ? parseValueOrVar(item, args)
        : item;

    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    // @ts-ignore
    list.fill(item, args.start ? args.start : undefined, args.end ? args.end : undefined);

    setList(list); // Mutate variable and return it down the pipe
    return JSON.stringify(list);
}

/**
 * Handles the /list-copywithin slash command to copy a portion of a list to another location within the list.
 *
 * @param {Object} args - Slash command arguments.
 * @param {String} target - Target list / variable.
 * @returns {Promise<String>} - List with copied values.
 */
export async function listCopyWithinCMD(args, target) {
    // Determine if variable and which type of variable to target
    const { list, setList } = mutableParseValueOrVar(target, args);

    // @ts-ignore
    list.copyWithin(args.target, args.start, args.end ? args.end : undefined);

    setList(list); // Mutate variable and return it down the pipe
    return JSON.stringify(list);
}
