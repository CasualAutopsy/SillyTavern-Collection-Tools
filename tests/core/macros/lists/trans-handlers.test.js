import { jest } from '@jest/globals';
import { resetVariables } from '../../../setup.js';

/**
 * Comprehensive tests for all list transformation handlers:
 * listSlice, listConcat, listFlat, listToSplice, listToSort, listToReverse.
 *
 * Covers: return values, console errors with empty-string returns,
 * datatype parsing (strings, booleans, integers, floats, arrays, objects),
 * and shorthand variables (local `.`, global `$`).
 */

import {
    listSliceHandler,
    listConcatHandler,
    listFlatHandler,
    listToSpliceHandler,
    listToSortHandler,
    listToReverseHandler,
} from '../../../../src/core/macros/lists/trans-handlers.js';

// Helpers
const setLocal = (name, value) => SillyTavern.getContext().variables.local.set(name, value);
const setGlobal = (name, value) => SillyTavern.getContext().variables.global.set(name, value);

describe('listSliceHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns full list when no indices provided', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
        });

        test('returns sliced list with start index only', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['2'],
            });
            expect(result).toBe('[3,4,5]');
        });

        test('returns sliced list with start and end indices', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['1', '4'],
            });
            expect(result).toBe('[2,3,4]');
        });

        test('returns empty list when start equals end', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['1', '1'],
            });
            expect(result).toBe('[]');
        });

        test('returns empty list when start is out of bounds', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['10'],
            });
            expect(result).toBe('[]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array (number)', () => {
            const result = listSliceHandler({
                unnamedArgs: ['42'],
                list: ['0', '1'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSlice] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (string)', () => {
            const result = listSliceHandler({
                unnamedArgs: ['"hello"'],
                list: ['0', '1'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSlice] The input is not a list.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('parses string indices', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['1', '3'],
            });
            expect(result).toBe('[2,3]');
        });

        test('parses negative integer indices', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['-2'],
            });
            expect(result).toBe('[4,5]');
        });

        test('slices string values', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['0', '2'],
            });
            expect(result).toBe('["a","b"]');
        });

        test('slices boolean values', () => {
            setLocal('myList', JSON.stringify([true, false, true]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['1'],
            });
            expect(result).toBe('[false,true]');
        });

        test('slices float values', () => {
            setLocal('myList', JSON.stringify([1.1, 2.2, 3.3]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['0', '2'],
            });
            expect(result).toBe('[1.1,2.2]');
        });

        test('slices JSON arrays', () => {
            setLocal('myList', JSON.stringify([[1], [2], [3]]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['1'],
            });
            expect(result).toBe('[[2],[3]]');
        });

        test('slices JSON objects', () => {
            setLocal('myList', JSON.stringify([{ a: 1 }, { b: 2 }]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['0', '1'],
            });
            expect(result).toBe('[{"a":1}]');
        });
    });

    describe('shorthand variables', () => {
        test('slices local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['1', '4'],
            });
            expect(result).toBe('[2,3,4]');
        });

        test('slices global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listSliceHandler({
                unnamedArgs: ['$myList'],
                list: ['1', '4'],
            });
            expect(result).toBe('[2,3,4]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listSliceHandler({
                unnamedArgs: ['.nonexistent'],
                list: ['0'],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listSliceHandler({
                unnamedArgs: ['$nonexistent'],
                list: ['0'],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listSliceHandler({
                unnamedArgs: ['.myList'],
                list: ['0', '1'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSlice] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listSliceHandler({
                unnamedArgs: ['$myList'],
                list: ['0', '1'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSlice] The input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});

describe('listConcatHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns concatenated list with one argument', () => {
            setLocal('myList', JSON.stringify([1, 2]));
            setLocal('otherList', JSON.stringify([3, 4]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['.otherList'],
            });
            expect(result).toBe('[1,2,3,4]');
        });

        test('returns concatenated list with multiple arguments', () => {
            setLocal('myList', JSON.stringify([1]));
            setLocal('a', JSON.stringify([2]));
            setLocal('b', JSON.stringify([3]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['.a', '.b'],
            });
            expect(result).toBe('[1,2,3]');
        });

        test('returns original list when no concatenation arguments provided', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
        });

        test('returns concatenated empty lists', () => {
            setLocal('myList', JSON.stringify([]));
            setLocal('otherList', JSON.stringify([]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['.otherList'],
            });
            expect(result).toBe('[]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when first list is not an array (number)', () => {
            const result = listConcatHandler({
                unnamedArgs: ['42'],
                list: ['[1,2]'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listConcat] First input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when first list is not an array (string)', () => {
            const result = listConcatHandler({
                unnamedArgs: ['"hello"'],
                list: ['[1,2]'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listConcat] First input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when one of the concatenated lists is not an array', () => {
            setLocal('myList', JSON.stringify([1, 2]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['42'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listConcat] One of the inputs is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when second concatenated list is not an array', () => {
            setLocal('myList', JSON.stringify([1]));
            setLocal('otherList', JSON.stringify([2]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['.otherList', '"not a list"'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listConcat] One of the inputs is not a list.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('concatenates string values', () => {
            setLocal('myList', JSON.stringify(['a', 'b']));
            setLocal('otherList', JSON.stringify(['c']));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['.otherList'],
            });
            expect(result).toBe('["a","b","c"]');
        });

        test('concatenates integer values', () => {
            setLocal('myList', JSON.stringify([1, 2]));
            setLocal('otherList', JSON.stringify([3, 4]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['.otherList'],
            });
            expect(result).toBe('[1,2,3,4]');
        });

        test('concatenates float values', () => {
            setLocal('myList', JSON.stringify([1.1]));
            setLocal('otherList', JSON.stringify([2.2]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['.otherList'],
            });
            expect(result).toBe('[1.1,2.2]');
        });

        test('concatenates boolean values', () => {
            setLocal('myList', JSON.stringify([true]));
            setLocal('otherList', JSON.stringify([false]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['.otherList'],
            });
            expect(result).toBe('[true,false]');
        });

        test('concatenates JSON arrays', () => {
            setLocal('myList', JSON.stringify([[1]]));
            setLocal('otherList', JSON.stringify([[2]]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['.otherList'],
            });
            expect(result).toBe('[[1],[2]]');
        });

        test('concatenates JSON objects', () => {
            setLocal('myList', JSON.stringify([{ a: 1 }]));
            setLocal('otherList', JSON.stringify([{ b: 2 }]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['.otherList'],
            });
            expect(result).toBe('[{"a":1},{"b":2}]');
        });
    });

    describe('shorthand variables', () => {
        test('concatenates local variables (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1]));
            setLocal('otherList', JSON.stringify([2]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['.otherList'],
            });
            expect(result).toBe('[1,2]');
        });

        test('concatenates global variables (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1]));
            setGlobal('otherList', JSON.stringify([2]));
            const result = listConcatHandler({
                unnamedArgs: ['$myList'],
                list: ['$otherList'],
            });
            expect(result).toBe('[1,2]');
        });

        test('concatenates mixed local and global variables', () => {
            setLocal('myList', JSON.stringify([1]));
            setGlobal('otherList', JSON.stringify([2]));
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['$otherList'],
            });
            expect(result).toBe('[1,2]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listConcatHandler({
                unnamedArgs: ['.nonexistent'],
                list: ['[1]'],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listConcatHandler({
                unnamedArgs: ['$nonexistent'],
                list: ['[1]'],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listConcatHandler({
                unnamedArgs: ['.myList'],
                list: ['[1]'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listConcat] First input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});

describe('listFlatHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns flattened list with depth 1', () => {
            setLocal('myList', JSON.stringify([[1, 2], [3, 4]]));
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(result).toBe('[1,2,3,4]');
        });

        test('returns flattened list with depth 2', () => {
            setLocal('myList', JSON.stringify([[[1], [2]], [[3], [4]]]));
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '2'],
                list: [],
            });
            expect(result).toBe('[1,2,3,4]');
        });

        test('returns original list when depth is 0', () => {
            setLocal('myList', JSON.stringify([[1, 2], [3, 4]]));
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('[[1,2],[3,4]]');
        });


        test('returns original list for non-nested input', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array (number)', () => {
            const result = listFlatHandler({
                unnamedArgs: ['42', '1'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listFlat] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (string)', () => {
            const result = listFlatHandler({
                unnamedArgs: ['"hello"', '1'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listFlat] Input is not a list.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('flattens string values', () => {
            setLocal('myList', JSON.stringify([['a', 'b'], ['c']]));
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(result).toBe('["a","b","c"]');
        });

        test('flattens integer values', () => {
            setLocal('myList', JSON.stringify([[1, 2], [3]]));
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
        });

        test('flattens float values', () => {
            setLocal('myList', JSON.stringify([[1.1], [2.2]]));
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(result).toBe('[1.1,2.2]');
        });

        test('flattens boolean values', () => {
            setLocal('myList', JSON.stringify([[true], [false]]));
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(result).toBe('[true,false]');
        });

        test('flattens JSON arrays', () => {
            setLocal('myList', JSON.stringify([[[1, 2]], [[3]]]));
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(result).toBe('[[1,2],[3]]');
        });

        test('flattens JSON objects', () => {
            setLocal('myList', JSON.stringify([[{ a: 1 }], [{ b: 2 }]]));
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(result).toBe('[{"a":1},{"b":2}]');
        });
    });

    describe('shorthand variables', () => {
        test('flattens local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([[1, 2], [3, 4]]));
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(result).toBe('[1,2,3,4]');
        });

        test('flattens global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([[1, 2], [3, 4]]));
            const result = listFlatHandler({
                unnamedArgs: ['$myList', '1'],
                list: [],
            });
            expect(result).toBe('[1,2,3,4]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listFlatHandler({
                unnamedArgs: ['.nonexistent', '1'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listFlatHandler({
                unnamedArgs: ['$nonexistent', '1'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listFlatHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listFlat] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listFlatHandler({
                unnamedArgs: ['$myList', '1'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listFlat] Input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});

describe('listToSpliceHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns list after deleting elements', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '1', '2'],
                list: [],
            });
            expect(result).toBe('[1,4,5]');
        });

        test('returns list after inserting elements', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '1', '0', '[99]'],
                list: [],
            });
            expect(result).toBe('[1,99,2,3]');
        });

        test('returns list after deleting and inserting', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4]));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '1', '2', '[99]'],
                list: [],
            });
            expect(result).toBe('[1,99,4]');
        });


        test('returns list when insert is omitted', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4]));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '1', '2'],
                list: [],
            });
            expect(result).toBe('[1,4]');
        });

        test('returns list with negative start index', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4, 5]));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '-2', '1', '[99]'],
                list: [],
            });
            expect(result).toBe('[1,2,3,99,5]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array (number)', () => {
            const result = listToSpliceHandler({
                unnamedArgs: ['42', '0', '1'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSplice] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (string)', () => {
            const result = listToSpliceHandler({
                unnamedArgs: ['"hello"', '0', '1'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSplice] The input is not a list.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('splices string values', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '1', '1', '["x"]'],
                list: [],
            });
            expect(result).toBe('["a","x","c"]');
        });

        test('splices integer values', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '1', '0', '[42]'],
                list: [],
            });
            expect(result).toBe('[1,42,2,3]');
        });

        test('splices float values', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '1', '0', '[3.14]'],
                list: [],
            });
            expect(result).toBe('[1,3.14,2,3]');
        });

        test('splices boolean values', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '1', '0', '[true]'],
                list: [],
            });
            expect(result).toBe('[1,true,2,3]');
        });

        test('splices JSON objects', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '1', '0', '[{"x":1}]'],
                list: [],
            });
            expect(result).toBe('[1,{"x":1},2,3]');
        });

        test('skips invalid JSON insert value', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '1', '1', 'not-json'],
                list: [],
            });
            expect(result).toBe('[1,3]');
        });
    });

    describe('shorthand variables', () => {
        test('splices local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4]));
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '1', '2', '[99]'],
                list: [],
            });
            expect(result).toBe('[1,99,4]');
        });

        test('splices global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3, 4]));
            const result = listToSpliceHandler({
                unnamedArgs: ['$myList', '1', '2', '[99]'],
                list: [],
            });
            expect(result).toBe('[1,99,4]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listToSpliceHandler({
                unnamedArgs: ['.nonexistent', '0', '1'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listToSpliceHandler({
                unnamedArgs: ['$nonexistent', '0', '1'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listToSpliceHandler({
                unnamedArgs: ['.myList', '0', '1'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSplice] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listToSpliceHandler({
                unnamedArgs: ['$myList', '0', '1'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSplice] The input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});

describe('listToSortHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns sorted list of strings', () => {
            setLocal('myList', JSON.stringify(['banana', 'apple', 'cherry']));
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('["apple","banana","cherry"]');
        });

        test('returns sorted list of numbers (lexicographic)', () => {
            setLocal('myList', JSON.stringify([10, 2, 1]));
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[1,10,2]');
        });

        test('returns unchanged single-element list', () => {
            setLocal('myList', JSON.stringify([42]));
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[42]');
        });

        test('returns unchanged empty list', () => {
            setLocal('myList', JSON.stringify([]));
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array (number)', () => {
            const result = listToSortHandler({
                unnamedArgs: ['42'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSort] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (string)', () => {
            const result = listToSortHandler({
                unnamedArgs: ['"hello"'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSort] Input is not a list.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('sorts string values', () => {
            setLocal('myList', JSON.stringify(['c', 'a', 'b']));
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('["a","b","c"]');
        });

        test('sorts integer values', () => {
            setLocal('myList', JSON.stringify([3, 1, 2]));
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
        });

        test('sorts float values', () => {
            setLocal('myList', JSON.stringify([3.5, 1.2, 2.8]));
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[1.2,2.8,3.5]');
        });

        test('sorts boolean values', () => {
            setLocal('myList', JSON.stringify([true, false, false]));
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[false,false,true]');
        });

        test('sorts JSON arrays', () => {
            setLocal('myList', JSON.stringify([[3], [1], [2]]));
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[[1],[2],[3]]');
        });

        test('sorts JSON objects', () => {
            setLocal('myList', JSON.stringify([{ b: 1 }, { a: 2 }]));
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[{"b":1},{"a":2}]');
        });
    });

    describe('shorthand variables', () => {
        test('sorts local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([3, 1, 2]));
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
        });

        test('sorts global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([3, 1, 2]));
            const result = listToSortHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listToSortHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listToSortHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listToSortHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSort] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listToSortHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listSort] Input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});

describe('listToReverseHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns reversed list', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listToReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[3,2,1]');
        });

        test('returns reversed single-item list', () => {
            setLocal('myList', JSON.stringify(['only']));
            const result = listToReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('["only"]');
        });

        test('returns empty list for empty input', () => {
            setLocal('myList', JSON.stringify([]));
            const result = listToReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array (number)', () => {
            const result = listToReverseHandler({
                unnamedArgs: ['42'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listReverse] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (string)', () => {
            const result = listToReverseHandler({
                unnamedArgs: ['"hello"'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listReverse] Input is not a list.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('reverses string values', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listToReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('["c","b","a"]');
        });

        test('reverses integer values', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listToReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[3,2,1]');
        });

        test('reverses float values', () => {
            setLocal('myList', JSON.stringify([1.1, 2.2, 3.3]));
            const result = listToReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[3.3,2.2,1.1]');
        });

        test('reverses boolean values', () => {
            setLocal('myList', JSON.stringify([true, false]));
            const result = listToReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[false,true]');
        });

        test('reverses JSON arrays', () => {
            setLocal('myList', JSON.stringify([[1], [2], [3]]));
            const result = listToReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[[3],[2],[1]]');
        });

        test('reverses JSON objects', () => {
            setLocal('myList', JSON.stringify([{ a: 1 }, { b: 2 }]));
            const result = listToReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[{"b":2},{"a":1}]');
        });
    });

    describe('shorthand variables', () => {
        test('reverses local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listToReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[3,2,1]');
        });

        test('reverses global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3]));
            const result = listToReverseHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(result).toBe('[3,2,1]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listToReverseHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listToReverseHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listToReverseHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listReverse] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listToReverseHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listReverse] Input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});
