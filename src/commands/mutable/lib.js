const isTrueBoolean = (await import(/* webpackIgnore: true */ '/scripts/utils.js')).isTrueBoolean;

import {getStorageType, parseValue} from '../../../utils.js';

/**
 * Handles the /list-push slash command to add items to a list.
 *
 * @param {Object} args - Command arguments including flags like noParse, jsReturn
 * @param {Array} [target, ...items] - Target list identifier and items to push
 * @param {boolean} [isShift=false] - If true, uses unshift instead of push (adds to beginning)
 * @returns {number|string} - List length if jsReturn is true, otherwise JSON string of the list
 */
async function listPushUnshiftCMD(args, [target, ...items], isShift = false) {
    // Keep SillyTavern values 'as-is' if noParse flag is set, otherwise parse values
    items = !isTrueBoolean(args.noParse)
        ? items.map(item => parseValue(item))
        : items;

    // Use varType to determine which variable type gets targeted.
    const { list, setList } = getStorageType(target, args)

    const listLength = isShift
        ? list.unshift(...items)
        : list.push(...items);

    setList(list);
    return isTrueBoolean(args.jsReturn)
        ? listLength
        : JSON.stringify(list);
}

/**
 * Handles the /list-pop slash command to remove and return items from a list.
 *
 * @param {Object} args - Command arguments including flags like swapReturn
 * @param {string} target - The list identifier (variable name or JSON string)
 * @param {boolean} [isShift=false] - If true, removes from beginning (shift), otherwise from end (pop)
 * @returns {*} - Either the popped item or remaining list (based on swapReturn flag)
 */
async function listPopShiftCMD(args, target, isShift = false) {
    // Use varType to determine which variable type gets targeted.
    const { list, setList } = getStorageType(target, args);

    const swap = isTrueBoolean(args.swapReturn);
    const popped = isShift
        ? list.shift()
        : list.pop();

    setList(swap ? popped : list);
    return swap
        ? JSON.stringify(list)
        : popped;
}

/**
 * Handles the /list-splice slash command to replace/remove items from a list.
 *
 * @param {Object} args - Command arguments including flags like noParse, jsReturn, swapReturn
 * @param {Array} [target, ...items] - Target list, items to insert
 * @returns {*} - Deleted items or remaining list based on flags
 */
async function listSpliceCMD(args, [target, ...items]) {
    // Keep SillyTavern values 'as-is' if noParse flag is set, otherwise parse values
    items = !isTrueBoolean(args.noParse)
        ? items.map(item => parseValue(item))
        : items;

    // Use varType to determine which variable type gets targeted.
    const { list, setList } = getStorageType(target, args);

    const jsReturn = isTrueBoolean(args.jsReturn);
    const swapReturn = isTrueBoolean(args.swapReturn);

    const del_list = list.splice(args.start, args.del, ...items);

    setList(swapReturn? del_list : list);
    return swapReturn || !jsReturn
        ? JSON.stringify(list)
        : JSON.stringify(del_list);
}

/**
 * Handles the /list-sort and /list-reverse slash command to sort or reverse a list.
 *
 * @param {Object} args - Command arguments including flags like swapReturn
 * @param {string} target - The list identifier (variable name or JSON string)
 * @param {boolean} [isReverse=false] - Reverse the list instead of sorting if true
 * @returns {*} - The new sorted or reversed list
 */
async function listSortReverseCMD(args, target, isReverse = false) {
    // Use varType to determine which variable type gets targeted.
    const { list, setList } = getStorageType(target, args);


    if (!isReverse) {
        list.sort();
    }
    if (isTrueBoolean(args.reverse) || isReverse) {
        list.reverse();
    }

    setList(list);
    return JSON.stringify(list);
}

/**
 * Handles the /list-fill slash command to fill a list with a single value.
 *
 * @param {Object} args - Command arguments including flags
 * @param {Array} [target, item] - Target list and value to fill with
 * @returns {*} - The new filled list
 */
async function listFillCMD(args, [target, item]) {
    // Keep SillyTavern values 'as-is' if noParse flag is set, otherwise parse values
    item = !isTrueBoolean(args.noParse)
        ? parseValue(item)
        : item;

    // Determine storage scope and get list
    const { list, setList } = getStorageType(target, args);

    list.fill(item, args.start ? args.start : undefined, args.end ? args.end : undefined);

    setList(list);
    return JSON.stringify(list);
}

/**
 * Handles the /list-copywithin slash command to copy elements within a list.
 *
 * @param {Object} args - Command arguments including flags
 * @param {Array} target - Target list
 * @returns {*} - The new list with copied elements
 */
async function listCopyWithinCMD(args, target) {
    // Determine storage scope and get list
    const { list, setList } = getStorageType(target, args);

    list.copyWithin(args.target, args.start, args.end ? args.end : undefined);

    setList(list);
    return JSON.stringify(list);
}



export const list_callbacks = {
    list_push_unshift: listPushUnshiftCMD,
    list_pop_shift: listPopShiftCMD,
    list_splice: listSpliceCMD,
    list_sort_reverse: listSortReverseCMD,
    list_fill: listFillCMD,
    list_copywithin: listCopyWithinCMD,
};
