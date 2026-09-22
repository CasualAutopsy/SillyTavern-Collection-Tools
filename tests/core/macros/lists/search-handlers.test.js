import { jest } from '@jest/globals';
import { resetVariables } from '../../../setup.js';

/**
 * Comprehensive tests for all list search handlers:
 * listAt, listIndexOf, listLastIndexOf.
 *
 * Covers: return values, console errors with empty-string returns,
 * datatype parsing (strings, booleans, integers, floats, arrays, objects),
 * and shorthand variables (local `.`, global `$`).
 */

import {
    listAtHandler,
    listIndexOfHandler,
    listLastIndexOfHandler,
} from '../../../../src/core/macros/lists/search-handlers.js';

// Helpers
const setLocal = (name, value) => SillyTavern.getContext().variables.local.set(name, value);
const setGlobal = (name, value) => SillyTavern.getContext().variables.global.set(name, value);

// For tests that don't need persistence, use literal JSON values as the list arg.
// For tests that need persistence, use shorthand ($var / .var) with pre-set variables.

describe('listAtHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified element at positive index', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(result).toBe('b');
        });

        test('returns stringified element at index 0', () => {
            setLocal('myList', JSON.stringify(['first']));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('first');
        });

        test('returns stringified element at last index', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '2'],
                list: [],
            });
            expect(result).toBe('3');
        });

        test('returns stringified element at negative index', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '-1'],
                list: [],
            });
            expect(result).toBe('3');
        });

        test('returns stringified element at negative index -2', () => {
            setLocal('myList', JSON.stringify([1, 2, 3, 4]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '-2'],
                list: [],
            });
            expect(result).toBe('3');
        });

        test('returns "undefined" for out-of-bounds positive index', () => {
            setLocal('myList', JSON.stringify([1, 2]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '5'],
                list: [],
            });
            expect(result).toBe('undefined');
        });

        test('returns "undefined" for out-of-bounds negative index', () => {
            setLocal('myList', JSON.stringify([1, 2]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '-5'],
                list: [],
            });
            expect(result).toBe('undefined');
        });

        test('returns "undefined" for empty list', () => {
            setLocal('myList', JSON.stringify([]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('undefined');
        });

        test('returns "undefined" for null element', () => {
            setLocal('myList', JSON.stringify([null, 1]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('null');
        });

        test('returns "false" for false element', () => {
            setLocal('myList', JSON.stringify([false, true]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('false');
        });

        test('returns "0" for zero element', () => {
            setLocal('myList', JSON.stringify([0, 1]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('returns empty string for "" element', () => {
            setLocal('myList', JSON.stringify(['', 'a']));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array (number)', () => {
            const result = listAtHandler({
                unnamedArgs: ['42', '0'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listAt] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (string)', () => {
            const result = listAtHandler({
                unnamedArgs: ['"hello"', '0'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listAt] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (object)', () => {
            const result = listAtHandler({
                unnamedArgs: ['{"key": "value"}', '0'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listAt] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('throws TypeError when no list argument provided', () => {
            expect(() => listAtHandler({
                unnamedArgs: [],
                list: [],
            })).toThrow("Cannot read properties of undefined (reading 'match')");
        });
    });

    describe('datatype parsing', () => {
        test('returns stringified string element', () => {
            setLocal('myList', JSON.stringify(['hello', 'world']));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('hello');
        });

        test('returns stringified integer element', () => {
            setLocal('myList', JSON.stringify([42, -7, 0]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('42');
        });

        test('returns stringified float element', () => {
            setLocal('myList', JSON.stringify([3.14, -0.5, 1e10]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('3.14');
        });

        test('returns stringified boolean element', () => {
            setLocal('myList', JSON.stringify([true, false]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('true');
        });

        test('returns JSON stringified array element', () => {
            setLocal('myList', JSON.stringify([[1, 2], [3, 4]]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('[1,2]');
        });

        test('returns JSON stringified object element', () => {
            setLocal('myList', JSON.stringify([{ a: 1 }, { b: 2 }]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('{"a":1}');
        });

        test('parses negative index as integer', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '-1'],
                list: [],
            });
            expect(result).toBe('c');
        });

        test('parses index "0" correctly', () => {
            setLocal('myList', JSON.stringify(['zero']));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(result).toBe('zero');
        });
    });

    describe('shorthand variables', () => {
        test('accesses local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([10, 20, 30]));
            const result = listAtHandler({
                unnamedArgs: ['.myList', '1'],
                list: [],
            });
            expect(result).toBe('20');
        });

        test('accesses global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([10, 20, 30]));
            const result = listAtHandler({
                unnamedArgs: ['$myList', '1'],
                list: [],
            });
            expect(result).toBe('20');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listAtHandler({
                unnamedArgs: ['.nonexistent', '0'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listAtHandler({
                unnamedArgs: ['$nonexistent', '0'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listAtHandler({
                unnamedArgs: ['.myList', '0'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listAt] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listAtHandler({
                unnamedArgs: ['$myList', '0'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listAt] The input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});

describe('listIndexOfHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns "0" when element is at index 0', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '"a"', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('returns index of element in middle', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '"b"', 'true'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('returns index of element at end', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '"c"', 'true'],
                list: [],
            });
            expect(result).toBe('2');
        });

        test('returns "-1" when element not found', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '5', 'true'],
                list: [],
            });
            expect(result).toBe('-1');
        });

        test('returns index of first occurrence when duplicates exist', () => {
            setLocal('myList', JSON.stringify([1, 2, 1, 3]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '1', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('returns "-1" for empty list', () => {
            setLocal('myList', JSON.stringify([]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', 'anything', 'true'],
                list: [],
            });
            expect(result).toBe('-1');
        });

        test('returns "0" for null element found', () => {
            setLocal('myList', JSON.stringify([null, 1, 2]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', 'null', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('returns "0" for false element found', () => {
            setLocal('myList', JSON.stringify([false, true]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', 'false', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('returns "0" for 0 element found', () => {
            setLocal('myList', JSON.stringify([0, 1, 2]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '0', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('returns "0" for empty string element found', () => {
            setLocal('myList', JSON.stringify(['', 'a']));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '""', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('returns index with raw string match (no parse)', () => {
            setLocal('myList', JSON.stringify(['2', 2]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '2'],
                list: [],
            });
            expect(result).toBe('0');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array (number)', () => {
            const result = listIndexOfHandler({
                unnamedArgs: ['42', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIndexOf] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (string)', () => {
            const result = listIndexOfHandler({
                unnamedArgs: ['"not a list"', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIndexOf] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (object)', () => {
            const result = listIndexOfHandler({
                unnamedArgs: ['{"key": "value"}', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIndexOf] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('throws TypeError when no list argument provided', () => {
            expect(() => listIndexOfHandler({
                unnamedArgs: [],
                list: [],
            })).toThrow("Cannot read properties of undefined (reading 'match')");
        });
    });

    describe('datatype parsing', () => {
        test('finds string element with parse flag', () => {
            setLocal('myList', JSON.stringify(['hello', 'world']));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '"hello"', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('finds integer element with parse flag', () => {
            setLocal('myList', JSON.stringify([10, 20, 30]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '20', 'true'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('finds float element with parse flag', () => {
            setLocal('myList', JSON.stringify([1.5, 2.5, 3.5]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '2.5', 'true'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('finds boolean element with parse flag', () => {
            setLocal('myList', JSON.stringify([true, false]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', 'true', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('returns "-1" for JSON array element (reference equality)', () => {
            setLocal('myList', JSON.stringify([[1, 2], [3, 4]]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '[1, 2]', 'true'],
                list: [],
            });
            // indexOf uses ===; parsed [1,2] is a different reference
            expect(result).toBe('-1');
        });

        test('returns "-1" for JSON object element (reference equality)', () => {
            setLocal('myList', JSON.stringify([{ a: 1 }, { b: 2 }]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '{"a":1}', 'true'],
                list: [],
            });
            // indexOf uses ===; parsed {a:1} is a different reference
            expect(result).toBe('-1');
        });

        test('distinguishes parsed vs unparsed search element', () => {
            setLocal('myList', JSON.stringify(['2', '3']));
            // With parse off: searches for string "2"
            const resultUnparsed = listIndexOfHandler({
                unnamedArgs: ['.myList', '2'],
                list: [],
            });
            expect(resultUnparsed).toBe('0');

            // With parse on: searches for number 2
            const resultParsed = listIndexOfHandler({
                unnamedArgs: ['.myList', '2', 'true'],
                list: [],
            });
            expect(resultParsed).toBe('-1');
        });

        test('finds negative integer with parse flag', () => {
            setLocal('myList', JSON.stringify([-1, 0, 1]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '-1', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('finds scientific notation with parse flag', () => {
            setLocal('myList', JSON.stringify([1e10, 2e10]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '1e10', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });
    });

    describe('shorthand variables', () => {
        test('searches in local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '2', 'true'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('searches in global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3]));
            const result = listIndexOfHandler({
                unnamedArgs: ['$myList', '2', 'true'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listIndexOfHandler({
                unnamedArgs: ['.nonexistent', '1', 'true'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listIndexOfHandler({
                unnamedArgs: ['$nonexistent', '1', 'true'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listIndexOfHandler({
                unnamedArgs: ['.myList', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIndexOf] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listIndexOfHandler({
                unnamedArgs: ['$myList', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listIndexOf] The input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});

describe('listLastIndexOfHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns "0" when element is at index 0', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '"a"', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('returns index of element in middle', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '"b"', 'true'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('returns index of element at end', () => {
            setLocal('myList', JSON.stringify(['a', 'b', 'c']));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '"c"', 'true'],
                list: [],
            });
            expect(result).toBe('2');
        });

        test('returns "-1" when element not found', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '5', 'true'],
                list: [],
            });
            expect(result).toBe('-1');
        });

        test('returns index of last occurrence when duplicates exist', () => {
            setLocal('myList', JSON.stringify([1, 2, 1, 3, 1]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '1', 'true'],
                list: [],
            });
            expect(result).toBe('4');
        });

        test('returns "-1" for empty list', () => {
            setLocal('myList', JSON.stringify([]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', 'anything', 'true'],
                list: [],
            });
            expect(result).toBe('-1');
        });

        test('returns index of last null element', () => {
            setLocal('myList', JSON.stringify([null, 1, null]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', 'null', 'true'],
                list: [],
            });
            expect(result).toBe('2');
        });

        test('returns index of last false element', () => {
            setLocal('myList', JSON.stringify([false, true, false]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', 'false', 'true'],
                list: [],
            });
            expect(result).toBe('2');
        });

        test('returns index of last 0 element', () => {
            setLocal('myList', JSON.stringify([0, 1, 0]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '0', 'true'],
                list: [],
            });
            expect(result).toBe('2');
        });

        test('returns index of last empty string element', () => {
            setLocal('myList', JSON.stringify(['', 'a', '']));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '""', 'true'],
                list: [],
            });
            expect(result).toBe('2');
        });

        test('returns index with raw string match (no parse)', () => {
            setLocal('myList', JSON.stringify(['2', 2, '2']));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '2'],
                list: [],
            });
            expect(result).toBe('2');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when list is not an array (number)', () => {
            const result = listLastIndexOfHandler({
                unnamedArgs: ['42', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listLastIndexOf] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (string)', () => {
            const result = listLastIndexOfHandler({
                unnamedArgs: ['"not a list"', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listLastIndexOf] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when list is not an array (object)', () => {
            const result = listLastIndexOfHandler({
                unnamedArgs: ['{"key": "value"}', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listLastIndexOf] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('throws TypeError when no list argument provided', () => {
            expect(() => listLastIndexOfHandler({
                unnamedArgs: [],
                list: [],
            })).toThrow("Cannot read properties of undefined (reading 'match')");
        });
    });

    describe('datatype parsing', () => {
        test('finds string element with parse flag', () => {
            setLocal('myList', JSON.stringify(['hello', 'world']));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '"hello"', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('finds integer element with parse flag', () => {
            setLocal('myList', JSON.stringify([10, 20, 30]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '20', 'true'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('finds float element with parse flag', () => {
            setLocal('myList', JSON.stringify([1.5, 2.5, 3.5]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '2.5', 'true'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('finds boolean element with parse flag', () => {
            setLocal('myList', JSON.stringify([true, false]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', 'true', 'true'],
                list: [],
            });
            expect(result).toBe('0');
        });

        test('returns "-1" for JSON array element (reference equality)', () => {
            setLocal('myList', JSON.stringify([[1, 2], [3, 4]]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '[1, 2]', 'true'],
                list: [],
            });
            // lastIndexOf uses ===; parsed [1,2] is a different reference
            expect(result).toBe('-1');
        });

        test('returns "-1" for JSON object element (reference equality)', () => {
            setLocal('myList', JSON.stringify([{ a: 1 }, { b: 2 }]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '{"a":1}', 'true'],
                list: [],
            });
            // lastIndexOf uses ===; parsed {a:1} is a different reference
            expect(result).toBe('-1');
        });

        test('distinguishes parsed vs unparsed search element', () => {
            setLocal('myList', JSON.stringify(['2', '3', '2']));
            // With parse off: searches for string "2"
            const resultUnparsed = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '2'],
                list: [],
            });
            expect(resultUnparsed).toBe('2');

            // With parse on: searches for number 2
            const resultParsed = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '2', 'true'],
                list: [],
            });
            expect(resultParsed).toBe('-1');
        });

        test('finds negative integer with parse flag', () => {
            setLocal('myList', JSON.stringify([-1, 0, -1]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '-1', 'true'],
                list: [],
            });
            expect(result).toBe('2');
        });

        test('finds scientific notation with parse flag', () => {
            setLocal('myList', JSON.stringify([1e10, 2e10, 1e10]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '1e10', 'true'],
                list: [],
            });
            expect(result).toBe('2');
        });
    });

    describe('shorthand variables', () => {
        test('searches in local variable (dot prefix)', () => {
            setLocal('myList', JSON.stringify([1, 2, 3]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '2', 'true'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('searches in global variable (dollar prefix)', () => {
            setGlobal('myList', JSON.stringify([1, 2, 3]));
            const result = listLastIndexOfHandler({
                unnamedArgs: ['$myList', '2', 'true'],
                list: [],
            });
            expect(result).toBe('1');
        });

        test('errors when local variable does not exist', () => {
            expect(() => listLastIndexOfHandler({
                unnamedArgs: ['.nonexistent', '1', 'true'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when global variable does not exist', () => {
            expect(() => listLastIndexOfHandler({
                unnamedArgs: ['$nonexistent', '1', 'true'],
                list: [],
            })).toThrow('[Nox-Lib] Invalid JSON: undefined');
        });

        test('errors when local variable is not an array', () => {
            setLocal('myList', '"not an array"');
            const result = listLastIndexOfHandler({
                unnamedArgs: ['.myList', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listLastIndexOf] The input is not a list.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an array', () => {
            setGlobal('myList', '42');
            const result = listLastIndexOfHandler({
                unnamedArgs: ['$myList', '1', 'true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | listLastIndexOf] The input is not a list.',
            );
            expect(result).toBe('');
        });
    });
});
