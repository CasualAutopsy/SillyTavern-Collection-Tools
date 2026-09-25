import { jest } from '@jest/globals';
import { resetVariables } from '../../../setup.js';

/**
 * Comprehensive tests for all list enum handlers:
 * listIndex, listEntries.
 *
 * Covers: return values, console errors with empty-string returns,
 * datatype parsing (strings, booleans, integers, floats, arrays, objects),
 * and shorthand variables (local `.`, global `$`).
 */

import {
    listIndexHandler,
    listEntriesHandler,
} from '../../../../src/core/macros/lists/enum-handlers.js';

// Helpers
const setLocal = (name, value) => SillyTavern.getContext().variables.local.set(name, value);
const setGlobal = (name, value) => SillyTavern.getContext().variables.global.set(name, value);
const getLocal = (name) => SillyTavern.getContext().variables.local.get(name);
const getGlobal = (name) => SillyTavern.getContext().variables.global.get(name);

describe('listIndexHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified array of indices for a populated list', () => {
            const result = listIndexHandler({
                unnamedArgs: ['[1,2,3]'],
                list: [],
            });
            expect(result).toBe('[0,1,2]');
        });

        test('returns stringified empty array for an empty list', () => {
            const result = listIndexHandler({
                unnamedArgs: ['[]'],
                list: [],
            });
            expect(result).toBe('[]');
        });

        test('returns stringified array with single index for a single-item list', () => {
            const result = listIndexHandler({
                unnamedArgs: ['["only"]'],
                list: [],
            });
            expect(result).toBe('[0]');
        });

        test('returns indices for a sparse-like list with mixed types', () => {
            const result = listIndexHandler({
                unnamedArgs: ['[1,null,"three",true]'],
                list: [],
            });
            expect(result).toBe('[0,1,2,3]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when input is not an array (number)', () => {
            const result = listIndexHandler({
                unnamedArgs: ['42'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIndex] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is not an array (string)', () => {
            const result = listIndexHandler({
                unnamedArgs: ['"hello"'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIndex] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is not an array (object)', () => {
            const result = listIndexHandler({
                unnamedArgs: ['{"key":"value"}'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIndex] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is null', () => {
            const result = listIndexHandler({
                unnamedArgs: ['null'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIndex] Input is not a list.',
            );
            expect(result).toBe('');
        });


    });

    describe('datatype parsing', () => {
        test('handles list of strings', () => {
            const result = listIndexHandler({
                unnamedArgs: ['["a","b","c"]'],
                list: [],
            });
            expect(result).toBe('[0,1,2]');
        });

        test('handles list of booleans', () => {
            const result = listIndexHandler({
                unnamedArgs: ['[true,false,true]'],
                list: [],
            });
            expect(result).toBe('[0,1,2]');
        });

        test('handles list of integers', () => {
            const result = listIndexHandler({
                unnamedArgs: ['[10,20,30]'],
                list: [],
            });
            expect(result).toBe('[0,1,2]');
        });

        test('handles list of floats', () => {
            const result = listIndexHandler({
                unnamedArgs: ['[1.5,2.5,3.5]'],
                list: [],
            });
            expect(result).toBe('[0,1,2]');
        });

        test('handles list of arrays', () => {
            const result = listIndexHandler({
                unnamedArgs: ['[[1],[2],[3]]'],
                list: [],
            });
            expect(result).toBe('[0,1,2]');
        });

        test('handles list of objects', () => {
            const result = listIndexHandler({
                unnamedArgs: ['[{"a":1},{"b":2}]'],
                list: [],
            });
            expect(result).toBe('[0,1]');
        });

        test('handles list with mixed datatypes', () => {
            const result = listIndexHandler({
                unnamedArgs: ['[1,"two",true,null,[3],{"k":"v"}]'],
                list: [],
            });
            expect(result).toBe('[0,1,2,3,4,5]');
        });
    });

    describe('shorthand variables', () => {
        test('gets indices from local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listIndexHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[0,1,2]');
        });

        test('gets indices from global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3]));
            const result = listIndexHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(result).toBe('[0,1,2]');
        });

        test('throws when local variable does not exist', () => {
            expect(() => listIndexHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('throws when global variable does not exist', () => {
            expect(() => listIndexHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listIndexHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIndex] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listIndexHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIndex] Input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});

describe('listEntriesHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified array of [index, value] entries', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['[1,2,3]'],
                list: [],
            });
            expect(result).toBe('[[0,1],[1,2],[2,3]]');
        });

        test('returns stringified empty array for an empty list', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['[]'],
                list: [],
            });
            expect(result).toBe('[]');
        });

        test('returns stringified single entry for a single-item list', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['["only"]'],
                list: [],
            });
            expect(result).toBe('[[0,"only"]]');
        });

        test('returns entries for a list with null values', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['[null,1,null]'],
                list: [],
            });
            expect(result).toBe('[[0,null],[1,1],[2,null]]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when input is not an array (number)', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['42'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listEntries] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is not an array (string)', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['"hello"'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listEntries] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is not an array (object)', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['{"key":"value"}'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listEntries] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is null', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['null'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listEntries] Input is not a list.',
            );
            expect(result).toBe('');
        });


    });

    describe('datatype parsing', () => {
        test('handles list of strings', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['["a","b","c"]'],
                list: [],
            });
            expect(result).toBe('[[0,"a"],[1,"b"],[2,"c"]]');
        });

        test('handles list of booleans', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['[true,false]'],
                list: [],
            });
            expect(result).toBe('[[0,true],[1,false]]');
        });

        test('handles list of integers', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['[10,20]'],
                list: [],
            });
            expect(result).toBe('[[0,10],[1,20]]');
        });

        test('handles list of floats', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['[1.5,2.5]'],
                list: [],
            });
            expect(result).toBe('[[0,1.5],[1,2.5]]');
        });

        test('handles list of arrays', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['[[1],[2]]'],
                list: [],
            });
            expect(result).toBe('[[0,[1]],[1,[2]]]');
        });

        test('handles list of objects', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['[{"a":1},{"b":2}]'],
                list: [],
            });
            expect(result).toBe('[[0,{"a":1}],[1,{"b":2}]]');
        });

        test('handles list with mixed datatypes', () => {
            const result = listEntriesHandler({
                unnamedArgs: ['[1,"two",true,null,[3],{"k":"v"}]'],
                list: [],
            });
            expect(result).toBe('[[0,1],[1,"two"],[2,true],[3,null],[4,[3]],[5,{"k":"v"}]]');
        });
    });

    describe('shorthand variables', () => {
        test('gets entries from local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listEntriesHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(result).toBe('[[0,1],[1,2],[2,3]]');
        });

        test('gets entries from global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3]));
            const result = listEntriesHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(result).toBe('[[0,1],[1,2],[2,3]]');
        });

        test('throws when local variable does not exist', () => {
            expect(() => listEntriesHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('throws when global variable does not exist', () => {
            expect(() => listEntriesHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listEntriesHandler({
                unnamedArgs: ['.myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listEntries] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listEntriesHandler({
                unnamedArgs: ['$myList'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listEntries] Input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});
