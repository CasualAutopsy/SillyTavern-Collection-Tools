import { jest } from '@jest/globals';
import { resetVariables } from '../../../setup.js';

/**
 * Comprehensive tests for list test handlers:
 * listIncludes.
 *
 * Covers: return values, console errors with empty-string returns,
 * datatype parsing (strings, booleans, integers, floats, arrays, objects),
 * and shorthand variables (local `.`, global `$`).
 */

import {
    listIncludesHandler,
} from '../../../../src/core/macros/lists/test-handlers.js';

// Helpers
const setLocal = (name, value) => SillyTavern.getContext().variables.local.set(name, value);
const setGlobal = (name, value) => SillyTavern.getContext().variables.global.set(name, value);
const getLocal = (name) => SillyTavern.getContext().variables.local.get(name);
const getGlobal = (name) => SillyTavern.getContext().variables.global.get(name);

describe('listIncludesHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns "true" when list includes the search element (parsed)', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['[1, 2, 3]', '2', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('returns "false" when list does not include the search element', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['[1, 2, 3]', '5', 'true'],
                list: [],
            });
            expect(result).toBe('false');
        });

        test('returns "true" for string element in list (parsed)', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['["a", "b", "c"]', '"b"', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('returns "false" for empty list', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['[]', 'anything', 'true'],
                list: [],
            });
            expect(result).toBe('false');
        });

        test('returns "true" when search element is falsy (null)', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['[null, 1, 2]', 'null', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('returns "true" when search element is falsy (0)', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['[0, 1, 2]', '0', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('returns "true" when search element is falsy (false)', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['[false, true]', 'false', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('returns "true" when search element is falsy (empty string)', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['["", "a"]', '""', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('returns "true" for raw string match without parse flag', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['["hello", "world"]', 'hello'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('returns "false" for raw string mismatch without parse flag', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['[1, 2, 3]', '2'],
                list: [],
            });
            expect(result).toBe('false');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array (number)', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['42', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIncludes] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (string)', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['"not a list"', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIncludes] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (object)', () => {
            const result = listIncludesHandler({
                unnamedArgs: ['{"key": "value"}', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIncludes] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('throws TypeError when no list argument provided', () => {
            expect(() => listIncludesHandler({
                unnamedArgs: [],
                list: [],
            })).toThrow("Cannot read properties of undefined (reading 'match')");
        });
    });

    describe('datatype parsing', () => {
        test('parses string search element without parse flag', () => {
            setLocal('myList', JSON.stringify(['hello', 'world']));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', 'hello'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('parses string search element with parse flag off', () => {
            setLocal('myList', JSON.stringify(['hello', 'world']));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', 'hello', 'false'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('parses integer search element with parse flag on', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', '2', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('parses float search element with parse flag on', () => {
            setLocal('myList', JSON.stringify([1.5, 2.5, 3.5]));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', '2.5', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('parses boolean search element with parse flag on', () => {
            setLocal('myList', JSON.stringify([true, false]));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', 'true', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('returns "false" for JSON array search element (reference equality)', () => {
            setLocal('myList', JSON.stringify([[1, 2], [3, 4]]));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', '[1, 2]', 'true'],
                list: [],
            });
            // includes uses ===; parsed [1,2] is a different reference than the one in the list
            expect(result).toBe('false');
        });

        test('returns "false" for JSON object search element (reference equality)', () => {
            setLocal('myList', JSON.stringify([{ a: 1 }, { b: 2 }]));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', '{"a":1}', 'true'],
                list: [],
            });
            // includes uses ===; parsed {a:1} is a different reference than the one in the list
            expect(result).toBe('false');
        });

        test('keeps search element as raw string when parse flag is off', () => {
            setLocal('myList', JSON.stringify(['2', 2]));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', '2', 'false'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('distinguishes parsed vs unparsed search element', () => {
            setLocal('myList', JSON.stringify(['2', '3']));
            // With parse off: searches for string "2"
            const resultUnparsed = listIncludesHandler({
                unnamedArgs: ['.myList', '2', 'false'],
                list: [],
            });
            expect(resultUnparsed).toBe('true');

            // With parse on: searches for number 2
            const resultParsed = listIncludesHandler({
                unnamedArgs: ['.myList', '2', 'true'],
                list: [],
            });
            expect(resultParsed).toBe('false');
        });

        test('returns false when parsed type does not match', () => {
            setLocal('myList', JSON.stringify(['2', '3']));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', '2', 'true'],
                list: [],
            });
            expect(result).toBe('false');
        });

        test('parses negative integer search element', () => {
            setLocal('myList', JSON.stringify([-1, 0, 1]));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', '-1', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('parses scientific notation search element', () => {
            setLocal('myList', JSON.stringify([1e10, 2e10]));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', '1e10', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });
    });

    describe('shorthand variables', () => {
        test('searches in local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', '2', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('searches in global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3]));
            const result = listIncludesHandler({
                unnamedArgs: ['$myList', '2', 'true'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listIncludesHandler({
                unnamedArgs: ['.nonexistent', '1', 'true'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listIncludesHandler({
                unnamedArgs: ['$nonexistent', '1', 'true'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIncludes] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listIncludesHandler({
                unnamedArgs: ['$myList', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIncludes] Input is not a list.',
            );
            expect(result).toBe('');
        });

        test('finds string element in local variable', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', 'b'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('finds string element in global variable', () => {
            setGlobal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listIncludesHandler({
                unnamedArgs: ['$myList', 'b'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('returns false for missing element in local variable', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listIncludesHandler({
                unnamedArgs: ['.myList', '99', 'true'],
                list: [],
            });
            expect(result).toBe('false');
        });

        test('returns false for missing element in global variable', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3]));
            const result = listIncludesHandler({
                unnamedArgs: ['$myList', '99', 'true'],
                list: [],
            });
            expect(result).toBe('false');
        });
    });
});
