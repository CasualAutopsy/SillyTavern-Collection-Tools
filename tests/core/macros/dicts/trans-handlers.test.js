import { jest } from '@jest/globals';
import { resetVariables } from '../../../setup.js';

/**
 * Comprehensive tests for the dictionary transformation handler:
 * fromEntriesHandler.
 *
 * Covers: return values, console errors with empty-string returns,
 * datatype parsing (strings, booleans, integers, floats, arrays, objects),
 * and shorthand variables (local `.`, global `$`).
 */

import {
    fromEntriesHandler,
} from '../../../../src/core/macros/dicts/trans-handlers.js';

// Helpers
const setLocal = (name, value) => SillyTavern.getContext().variables.local.set(name, value);
const setGlobal = (name, value) => SillyTavern.getContext().variables.global.set(name, value);

describe('fromEntriesHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified dict from array of [key, value] pairs', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[["a",1],["b",2]]'],
                list: [],
            });
            expect(result).toBe('{"a":1,"b":2}');
        });

        test('returns stringified dict from single entry', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[["only","value"]]'],
                list: [],
            });
            expect(result).toBe('{"only":"value"}');
        });

        test('returns stringified empty dict from empty array', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[]'],
                list: [],
            });
            expect(result).toBe('{}');
        });

        test('returns stringified dict from flat key/value list', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: ['a', '1', 'b', '2'],
            });
            expect(result).toBe('{"a":1,"b":2}');
        });

        test('returns stringified dict from flat list with parsed values', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: ['x', '42', 'y', 'true'],
            });
            expect(result).toBe('{"x":42,"y":true}');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when entries is not an array (number)', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['42'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | dictFromEntries] Input is not a valid key/values entries list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when entries is not an array (string)', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['"hello"'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | dictFromEntries] Input is not a valid key/values entries list.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when entries is not an array (object)', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['{"a":1}'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | dictFromEntries] Input is not a valid key/values entries list.',
            );
            expect(result).toBe('');
        });


        test('errors and returns empty string when flat list has odd length', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: ['a', '1', 'b'],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | dictFromEntries] Input is not a valid key/values entries list.',
            );
            expect(result).toBe('');
        });

    });

    describe('datatype parsing', () => {
        test('parses string keys and values from entries array', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[["name","Alice"],["age","30"]]'],
                list: [],
            });
            expect(result).toBe('{"name":"Alice","age":"30"}');
        });

        test('parses integer values from entries array', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[["count",42],["offset",-7]]'],
                list: [],
            });
            expect(result).toBe('{"count":42,"offset":-7}');
        });

        test('parses float values from entries array', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[["pi",3.14],["half",0.5]]'],
                list: [],
            });
            expect(result).toBe('{"pi":3.14,"half":0.5}');
        });

        test('parses boolean values from entries array', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[["active",true],["deleted",false]]'],
                list: [],
            });
            expect(result).toBe('{"active":true,"deleted":false}');
        });

        test('parses JSON array values from entries array', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[["tags",["a","b"]],["nums",[1,2]]]'],
                list: [],
            });
            expect(result).toBe('{"tags":["a","b"],"nums":[1,2]}');
        });

        test('parses JSON object values from entries array', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[["meta",{"x":1}],["data",{"y":2}]]'],
                list: [],
            });
            expect(result).toBe('{"meta":{"x":1},"data":{"y":2}}');
        });

        test('parses flat list with string values', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: ['a', 'hello', 'b', 'world'],
            });
            expect(result).toBe('{"a":"hello","b":"world"}');
        });

        test('parses flat list with integer values', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: ['x', '100', 'y', '200'],
            });
            expect(result).toBe('{"x":100,"y":200}');
        });

        test('parses flat list with boolean values', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: ['on', 'true', 'off', 'false'],
            });
            expect(result).toBe('{"on":true,"off":false}');
        });

        test('parses flat list with JSON array values', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: ['a', '[1,2]', 'b', '[3,4]'],
            });
            expect(result).toBe('{"a":[1,2],"b":[3,4]}');
        });

        test('parses flat list with JSON object values', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: ['a', '{"x":1}', 'b', '{"y":2}'],
            });
            expect(result).toBe('{"a":{"x":1},"b":{"y":2}}');
        });
    });

    describe('shorthand variables', () => {
        test('builds dict from local entries variable (dot prefix)', () => {
            setLocal('myEntries', JSON.stringify([['x', 1], ['y', 2]]));
            const result = fromEntriesHandler({
                unnamedArgs: ['.myEntries'],
                list: [],
            });
            expect(result).toBe('{"x":1,"y":2}');
        });

        test('builds dict from global entries variable (dollar prefix)', () => {
            setGlobal('myEntries', JSON.stringify([['a', 10], ['b', 20]]));
            const result = fromEntriesHandler({
                unnamedArgs: ['$myEntries'],
                list: [],
            });
            expect(result).toBe('{"a":10,"b":20}');
        });

        test('errors when local entries variable does not exist', () => {
            expect(() => fromEntriesHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow(/Invalid JSON/);
        });

        test('errors when global entries variable does not exist', () => {
            expect(() => fromEntriesHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow(/Invalid JSON/);
        });

        test('errors when local entries variable is not an array', () => {
            setLocal('myEntries', '{"a":1}');
            const result = fromEntriesHandler({
                unnamedArgs: ['.myEntries'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | dictFromEntries] Input is not a valid key/values entries list.',
            );
            expect(result).toBe('');
        });

        test('errors when global entries variable is not an array', () => {
            setGlobal('myEntries', '42');
            const result = fromEntriesHandler({
                unnamedArgs: ['$myEntries'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | dictFromEntries] Input is not a valid key/values entries list.',
            );
            expect(result).toBe('');
        });
    });
});
