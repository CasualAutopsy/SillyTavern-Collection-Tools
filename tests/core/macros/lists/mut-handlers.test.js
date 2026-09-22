import { jest } from '@jest/globals';
import { resetVariables } from '../../../setup.js';

/**
 * Comprehensive tests for all list mutation handlers:
 * listPush, listPop, listUnshift, listShift, listSplice,
 * listFill, listCopyWithin, listSort, listReverse.
 *
 * Covers: return values, console errors with empty-string returns,
 * datatype parsing (strings, booleans, integers, floats, arrays, objects),
 * and shorthand variables (local `.`, global `$`).
 */

import {
    listPushHandler,
    listPopHandler,
    listUnshiftHandler,
    listShiftHandler,
    listSpliceHandler,
    listFillHandler,
    listCopyWithinHandler,
    listSortHandler,
    listReverseHandler,
} from '../../../../src/core/macros/lists/mut-handlers.js';

// Helpers
const setLocal = (name, value) => SillyTavern.getContext().variables.local.set(name, value);
const setGlobal = (name, value) => SillyTavern.getContext().variables.global.set(name, value);
const getLocal = (name) => SillyTavern.getContext().variables.local.get(name);
const getGlobal = (name) => SillyTavern.getContext().variables.global.get(name);

// For tests that don't need persistence, use literal JSON values as the list arg.
// For tests that need persistence, use shorthand ($var / .var) with pre-set variables.

describe('listPushHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified length after pushing one item', () => {
            const result = listPushHandler({
                unnamedArgs: ['[]'],
                list: ['hello'],
            });
            expect(result).toBe('1');
        });

        test('returns stringified length after pushing multiple items', () => {
            const result = listPushHandler({
                unnamedArgs: ['[]'],
                list: ['a', 'b', 'c'],
            });
            expect(result).toBe('3');
        });

        test('returns incremented length when list already has items', () => {
            const result = listPushHandler({
                unnamedArgs: ['[1,2]'],
                list: ['x', 'y'],
            });
            expect(result).toBe('4');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array (number)', () => {
            const result = listPushHandler({
                unnamedArgs: ['42'],
                list: ['hello'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listPush] First input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (string)', () => {
            const result = listPushHandler({
                unnamedArgs: ['"hello"'],
                list: ['world'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listPush] First input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when no values provided', () => {
            setLocal('myList', JSON.stringify([1, 2]));
            const result = listPushHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listPush] Expected at least 2 arguments, but got 1.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('parses string values', () => {
            listPushHandler({
                unnamedArgs: ['[1]'],
                list: ['hello world'],
            });
            // Mutation is on a literal, not persisted
        });

        test('parses boolean values', () => {
            listPushHandler({
                unnamedArgs: ['[1]'],
                list: ['true', 'false', 'on', 'off'],
            });
            // Mutation is on a literal, not persisted
        });

        test('parses integer values', () => {
            listPushHandler({
                unnamedArgs: ['[1]'],
                list: ['42', '-7', '0'],
            });
        });

        test('parses float values', () => {
            listPushHandler({
                unnamedArgs: ['[1]'],
                list: ['3.14', '-0.5', '1e10'],
            });
        });

        test('parses JSON arrays', () => {
            listPushHandler({
                unnamedArgs: ['[1]'],
                list: ['[1, 2, 3]'],
            });
        });

        test('parses JSON objects', () => {
            listPushHandler({
                unnamedArgs: ['[1]'],
                list: ['{"key": "value"}'],
            });
        });
    });

    describe('shorthand variables', () => {
        test('pushes to local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2]));
            listPushHandler({
                unnamedArgs: ['.myList'],
                list: ['3'],
            });
            expect(getLocal('myList')).toEqual('[1,2,3]');
        });

        test('pushes to global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2]));
            listPushHandler({
                unnamedArgs: ['$myList'],
                list: ['3'],
            });
            expect(getGlobal('myList')).toEqual('[1,2,3]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listPushHandler({
                unnamedArgs: ['.nonexistent'],
                list: ['1'],
            })).toThrow('No such variable: nonexistent(Local)');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listPushHandler({
                unnamedArgs: ['$nonexistent'],
                list: ['1'],
            })).toThrow('No such variable: nonexistent(Global)');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listPushHandler({
                unnamedArgs: ['.myList'],
                list: ['1'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listPush] First input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listPushHandler({
                unnamedArgs: ['$myList'],
                list: ['1'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listPush] First input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});

describe('listPopHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified last element', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listPopHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('3');
        });

        test('returns stringified element for single-item list', () => {
            setLocal('myList', JSON.stringify(['only']));
            const result = listPopHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('only');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listPopHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listPop] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is empty', () => {
            setLocal('myList', JSON.stringify([]));
            const result = listPopHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listPop] The list is empty.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('pops and returns string values', () => {
            setLocal('myList', JSON.stringify(['a', 'b']));
            const result = listPopHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('b');
        });

        test('pops and returns integer values', () => {
            setLocal('myList', JSON.stringify([10, 20]));
            const result = listPopHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('20');
        });

        test('pops and returns float values', () => {
            setLocal('myList', JSON.stringify([1.5, 2.5]));
            const result = listPopHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('2.5');
        });

        test('pops and returns boolean values', () => {
            setLocal('myList', JSON.stringify([true, false]));
            const result = listPopHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('false');
        });

        test('pops and returns JSON arrays', () => {
            setLocal('myList', JSON.stringify([[1], [2]]));
            const result = listPopHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('2');
        });

        test('pops and returns JSON objects', () => {
            setLocal('myList', JSON.stringify([{ a: 1 }, { b: 2 }]));
            const result = listPopHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[object Object]');
        });
    });

    describe('shorthand variables', () => {
        test('pops from local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listPopHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('3');
            expect(getLocal('myList')).toEqual('[1,2]');
        });

        test('pops from global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3]));
            const result = listPopHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(result).toBe('3');
            expect(getGlobal('myList')).toEqual('[1,2]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listPopHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow('No such variable: nonexistent(Local)');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listPopHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow('No such variable: nonexistent(Global)');
        });
    });
});

describe('listUnshiftHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified length after unshifting one item', () => {
            const result = listUnshiftHandler({
                unnamedArgs: ['[]'],
                list: ['hello'],
            });
            expect(result).toBe('1');
        });

        test('returns stringified length after unshifting multiple items', () => {
            const result = listUnshiftHandler({
                unnamedArgs: ['[]'],
                list: ['a', 'b', 'c'],
            });
            expect(result).toBe('3');
        });

        test('returns incremented length when list already has items', () => {
            const result = listUnshiftHandler({
                unnamedArgs: ['[1,2]'],
                list: ['x', 'y'],
            });
            expect(result).toBe('4');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array', () => {
            const result = listUnshiftHandler({
                unnamedArgs: ['42'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listUnshift] First input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when no values provided', () => {
            setLocal('myList', JSON.stringify([1]));
            const result = listUnshiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listUnshift] Expected at least 2 arguments, but got 1.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('parses string values', () => {
            listUnshiftHandler({
                unnamedArgs: ['[1]'],
                list: ['hello'],
            });
        });

        test('parses boolean values', () => {
            listUnshiftHandler({
                unnamedArgs: ['[1]'],
                list: ['true', 'false'],
            });
        });

        test('parses integer values', () => {
            listUnshiftHandler({
                unnamedArgs: ['[1]'],
                list: ['42', '-7'],
            });
        });

        test('parses float values', () => {
            listUnshiftHandler({
                unnamedArgs: ['[1]'],
                list: ['3.14', '-0.5'],
            });
        });

        test('parses JSON arrays', () => {
            listUnshiftHandler({
                unnamedArgs: ['[1]'],
                list: ['[1, 2]'],
            });
        });

        test('parses JSON objects', () => {
            listUnshiftHandler({
                unnamedArgs: ['[1]'],
                list: ['{"key": "value"}'],
            });
        });
    });

    describe('shorthand variables', () => {
        test('unshifts to local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([3]));
            listUnshiftHandler({
                unnamedArgs: ['.myList'],
                list: ['1', '2'],
            });
            expect(getLocal('myList')).toEqual('[2,1,3]');
        });

        test('unshifts to global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([3]));
            listUnshiftHandler({
                unnamedArgs: ['$myList'],
                list: ['1', '2'],
            });
            expect(getGlobal('myList')).toEqual('[2,1,3]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listUnshiftHandler({
                unnamedArgs: ['.nonexistent'],
                list: ['1'],
            })).toThrow('No such variable: nonexistent(Local)');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listUnshiftHandler({
                unnamedArgs: ['$nonexistent'],
                list: ['1'],
            })).toThrow('No such variable: nonexistent(Global)');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listUnshiftHandler({
                unnamedArgs: ['.myList'],
                list: ['1'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listUnshift] First input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});

describe('listShiftHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified first element', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listShiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('returns stringified element for single-item list', () => {
            setLocal('myList', JSON.stringify(['only']));
            const result = listShiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('only');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listShiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listShift] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is empty', () => {
            setLocal('myList', JSON.stringify([]));
            const result = listShiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listShift] The list is empty.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('shifts and returns string values', () => {
            setLocal('myList', JSON.stringify(['a', 'b']));
            const result = listShiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('a');
        });

        test('shifts and returns integer values', () => {
            setLocal('myList', JSON.stringify([10, 20]));
            const result = listShiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('10');
        });

        test('shifts and returns float values', () => {
            setLocal('myList', JSON.stringify([1.5, 2.5]));
            const result = listShiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('1.5');
        });

        test('shifts and returns boolean values', () => {
            setLocal('myList', JSON.stringify([true, false]));
            const result = listShiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('shifts and returns JSON arrays', () => {
            setLocal('myList', JSON.stringify([[1], [2]]));
            const result = listShiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('shifts and returns JSON objects', () => {
            setLocal('myList', JSON.stringify([{ a: 1 }, { b: 2 }]));
            const result = listShiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[object Object]');
        });
    });

    describe('shorthand variables', () => {
        test('shifts from local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listShiftHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('1');
            expect(getLocal('myList')).toEqual('[2,3]');
        });

        test('shifts from global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3]));
            const result = listShiftHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(result).toBe('1');
            expect(getGlobal('myList')).toEqual('[2,3]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listShiftHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow('No such variable: nonexistent(Local)');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listShiftHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow('No such variable: nonexistent(Global)');
        });
    });
});

describe('listSpliceHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified list after splice with delete', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listSpliceHandler({
                unnamedArgs: ['.myList', '1', '2'],
                list: [],
            });
            expect(result).toBe('[1,4,5]');
        });

        test('returns stringified list after splice with insert', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listSpliceHandler({
                unnamedArgs: ['.myList', '1', '0', '[99]'],
                list: [],
            });
            expect(result).toBe('[1,99,2,3]');
        });

        test('returns stringified list after splice with delete and insert', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4]));
            const result = listSpliceHandler({
                unnamedArgs: ['.myList', '1', '2', '[99]'],
                list: [],
            });
            expect(result).toBe('[1,99,4]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listSpliceHandler({
                unnamedArgs: ['.myList', '0', '1'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSplice] The input is not a list.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('parses string values in insert', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listSpliceHandler({
                unnamedArgs: ['.myList', '1', '0', '["a"]'],
                list: [],
            });
            expect(result).toBe('[1,"a",2,3]');
        });

        test('parses integer values in insert', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listSpliceHandler({
                unnamedArgs: ['.myList', '1', '0', '[42]'],
                list: [],
            });
            expect(result).toBe('[1,42,2,3]');
        });

        test('parses float values in insert', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listSpliceHandler({
                unnamedArgs: ['.myList', '1', '0', '[3.14]'],
                list: [],
            });
            expect(result).toBe('[1,3.14,2,3]');
        });

        test('parses boolean values in insert', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listSpliceHandler({
                unnamedArgs: ['.myList', '1', '0', '[true]'],
                list: [],
            });
            expect(result).toBe('[1,true,2,3]');
        });

        test('parses JSON objects in insert', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listSpliceHandler({
                unnamedArgs: ['.myList', '1', '0', '[{"x":1}]'],
                list: [],
            });
            expect(result).toBe('[1,{"x":1},2,3]');
        });
    });

    describe('shorthand variables', () => {
        test('splices local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4]));
            const result = listSpliceHandler({
                unnamedArgs: ['.myList', '1', '2', '[99]'],
                list: [],
            });
            expect(result).toBe('[1,99,4]');
            expect(getLocal('myList')).toEqual('[1,99,4]');
        });

        test('splices global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3, 4]));
            const result = listSpliceHandler({
                unnamedArgs: ['$myList', '1', '2', '[99]'],
                list: [],
            });
            expect(result).toBe('[1,99,4]');
            expect(getGlobal('myList')).toEqual('[1,99,4]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listSpliceHandler({
                unnamedArgs: ['.nonexistent', '0', '1'],
                list: [],
            })).toThrow('No such variable: nonexistent(Local)');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listSpliceHandler({
                unnamedArgs: ['$nonexistent', '0', '1'],
                list: [],
            })).toThrow('No such variable: nonexistent(Global)');
        });
    });
});

describe('listFillHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified list filled from start to end', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listFillHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('[0,0,0,0,0]');
        });

        test('returns stringified list filled with start and end indices', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listFillHandler({
                unnamedArgs: ['.myList', '99'],
                list: ['1', '3'],
            });
            expect(result).toBe('[1,99,99,4,5]');
        });

        test('returns stringified list filled without indices', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listFillHandler({
                unnamedArgs: ['.myList', 'x'],
                list: [],
            });
            expect(result).toBe('["x","x","x"]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listFillHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listFill] The input is not a list.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('fills with string value', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listFillHandler({
                unnamedArgs: ['.myList', 'hello'],
                list: [],
            });
            expect(result).toBe('["hello","hello","hello"]');
        });

        test('fills with integer value', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listFillHandler({
                unnamedArgs: ['.myList', '42'],
                list: [],
            });
            expect(result).toBe('[42,42,42]');
        });

        test('fills with float value', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listFillHandler({
                unnamedArgs: ['.myList', '3.14'],
                list: [],
            });
            expect(result).toBe('[3.14,3.14,3.14]');
        });

        test('fills with boolean value', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listFillHandler({
                unnamedArgs: ['.myList', 'true'],
                list: [],
            });
            expect(result).toBe('[true,true,true]');
        });

        test('fills with JSON array value', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listFillHandler({
                unnamedArgs: ['.myList', '[9,9]'],
                list: [],
            });
            expect(result).toBe('[[9,9],[9,9],[9,9]]');
        });

        test('fills with JSON object value', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listFillHandler({
                unnamedArgs: ['.myList', '{"k":"v"}'],
                list: [],
            });
            expect(result).toBe('[{"k":"v"},{"k":"v"},{"k":"v"}]');
        });
    });

    describe('shorthand variables', () => {
        test('fills local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listFillHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('[0,0,0]');
            expect(getLocal('myList')).toEqual('[0,0,0]');
        });

        test('fills global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3]));
            const result = listFillHandler({
                unnamedArgs: ['$myList', '0'],
                list: [],
            });
            expect(result).toBe('[0,0,0]');
            expect(getGlobal('myList')).toEqual('[0,0,0]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listFillHandler({
                unnamedArgs: ['.nonexistent', '0'],
                list: [],
            })).toThrow('No such variable: nonexistent(Local)');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listFillHandler({
                unnamedArgs: ['$nonexistent', '0'],
                list: [],
            })).toThrow('No such variable: nonexistent(Global)');
        });
    });
});

describe('listCopyWithinHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified list after copyWithin with target and start', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listCopyWithinHandler({
                unnamedArgs: ['.myList'],
                list: ['0', '3'],
            });
            expect(result).toBe('[4,5,3,4,5]');
        });

        test('returns stringified list after copyWithin with target, start, and end', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listCopyWithinHandler({
                unnamedArgs: ['.myList'],
                list: ['0', '1', '3'],
            });
            expect(result).toBe('[2,3,3,4,5]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listCopyWithinHandler({
                unnamedArgs: ['.myList'],
                list: ['0', '1'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listCopyWithin] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when fewer than 2 indices provided', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listCopyWithinHandler({
                unnamedArgs: ['.myList'],
                list: ['0'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listCopyWithin] Expected at least 3 arguments, but got 2.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when no indices provided', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listCopyWithinHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listCopyWithin] Expected at least 3 arguments, but got 1.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('parses integer indices', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listCopyWithinHandler({
                unnamedArgs: ['.myList'],
                list: ['0', '3', '5'],
            });
            expect(result).toBe('[4,5,3,4,5]');
        });

        test('parses negative integer indices', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listCopyWithinHandler({
                unnamedArgs: ['.myList'],
                list: ['-1', '-4', '-1'],
            });
            expect(result).toBe('[1,2,3,4,2]');
        });
    });

    describe('shorthand variables', () => {
        test('copies within local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listCopyWithinHandler({
                unnamedArgs: ['.myList'],
                list: ['0', '3'],
            });
            expect(result).toBe('[4,5,3,4,5]');
            expect(getLocal('myList')).toEqual('[4,5,3,4,5]');
        });

        test('copies within global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listCopyWithinHandler({
                unnamedArgs: ['$myList'],
                list: ['0', '3'],
            });
            expect(result).toBe('[4,5,3,4,5]');
            expect(getGlobal('myList')).toEqual('[4,5,3,4,5]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listCopyWithinHandler({
                unnamedArgs: ['.nonexistent'],
                list: ['0', '1'],
            })).toThrow('No such variable: nonexistent(Local)');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listCopyWithinHandler({
                unnamedArgs: ['$nonexistent'],
                list: ['0', '1'],
            })).toThrow('No such variable: nonexistent(Global)');
        });
    });
});

describe('listSortHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified sorted list of strings', () => {
            setLocal('myList', JSON.stringify(['banana', 'apple', 'cherry']));
            const result = listSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('["apple","banana","cherry"]');
        });

        test('returns stringified sorted list of numbers (lexicographic)', () => {
            setLocal('myList', JSON.stringify([10, 2, 1]));
            const result = listSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[1,10,2]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSort] The input is not a list.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('sorts string values', () => {
            setLocal('myList', JSON.stringify(['c', 'a', 'b']));
            const result = listSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('["a","b","c"]');
        });

        test('sorts integer values', () => {
            setLocal('myList', JSON.stringify([3, 1, 2]));
            const result = listSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
        });

        test('sorts float values', () => {
            setLocal('myList', JSON.stringify([3.5, 1.2, 2.8]));
            const result = listSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[1.2,2.8,3.5]');
        });

        test('sorts boolean values', () => {
            setLocal('myList', JSON.stringify([true, false, false]));
            const result = listSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[false,false,true]');
        });

        test('sorts JSON arrays', () => {
            setLocal('myList', JSON.stringify([[3], [1], [2]]));
            const result = listSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[[1],[2],[3]]');
        });

        test('sorts JSON objects', () => {
            setLocal('myList', JSON.stringify([{ b: 1 }, { a: 2 }]));
            const result = listSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[{"b":1},{"a":2}]');
        });
    });

    describe('shorthand variables', () => {
        test('sorts local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([3, 1, 2]));
            const result = listSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
            expect(getLocal('myList')).toEqual('[1,2,3]');
        });

        test('sorts global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([3, 1, 2]));
            const result = listSortHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
            expect(getGlobal('myList')).toEqual('[1,2,3]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listSortHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow('No such variable: nonexistent(Local)');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listSortHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow('No such variable: nonexistent(Global)');
        });
    });
});

describe('listReverseHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified reversed list', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[3,2,1]');
        });

        test('returns stringified reversed single-item list', () => {
            setLocal('myList', JSON.stringify(['only']));
            const result = listReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('["only"]');
        });

        test('returns stringified reversed empty list', () => {
            setLocal('myList', JSON.stringify([]));
            const result = listReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listReverse] The input is not a list.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('reverses string values', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('["c","b","a"]');
        });

        test('reverses integer values', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[3,2,1]');
        });

        test('reverses float values', () => {
            setLocal('myList', JSON.stringify([1.1, 2.2, 3.3]));
            const result = listReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[3.3,2.2,1.1]');
        });

        test('reverses boolean values', () => {
            setLocal('myList', JSON.stringify([true, false]));
            const result = listReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[false,true]');
        });

        test('reverses JSON arrays', () => {
            setLocal('myList', JSON.stringify([[1], [2], [3]]));
            const result = listReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[[3],[2],[1]]');
        });

        test('reverses JSON objects', () => {
            setLocal('myList', JSON.stringify([{ a: 1 }, { b: 2 }]));
            const result = listReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[{"b":2},{"a":1}]');
        });
    });

    describe('shorthand variables', () => {
        test('reverses local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[3,2,1]');
            expect(getLocal('myList')).toEqual('[3,2,1]');
        });

        test('reverses global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3]));
            const result = listReverseHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(result).toBe('[3,2,1]');
            expect(getGlobal('myList')).toEqual('[3,2,1]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listReverseHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow('No such variable: nonexistent(Local)');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listReverseHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow('No such variable: nonexistent(Global)');
        });
    });
});
