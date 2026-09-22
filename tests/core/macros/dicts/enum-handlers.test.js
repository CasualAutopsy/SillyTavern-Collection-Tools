import { jest } from '@jest/globals';
import { resetVariables } from '../../../setup.js';

/**
 * Comprehensive tests for all dictionary enumeration handlers:
 * getKeysHandler, getValuesHandler, getEntriesHandler.
 *
 * Covers: return values, console errors with empty-string returns,
 * datatype parsing (strings, booleans, integers, floats, arrays, objects),
 * and shorthand variables (local `.`, global `$`).
 */

import {
    getKeysHandler,
    getValuesHandler,
    getEntriesHandler,
} from '../../../../src/core/macros/dicts/enum-handlers.js';

// Helpers
const setLocal = (name, value) => SillyTavern.getContext().variables.local.set(name, value);
const setGlobal = (name, value) => SillyTavern.getContext().variables.global.set(name, value);
const getLocal = (name) => SillyTavern.getContext().variables.local.get(name);
const getGlobal = (name) => SillyTavern.getContext().variables.global.get(name);

describe('getKeysHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified list of keys for simple object', () => {
            const result = getKeysHandler({
                unnamedArgs: ['{"a":1,"b":2,"c":3}'],
                list: [],
            });
            expect(result).toBe('["a","b","c"]');
        });

        test('returns stringified list of keys for single-key object', () => {
            const result = getKeysHandler({
                unnamedArgs: ['{"only":"value"}'],
                list: [],
            });
            expect(result).toBe('["only"]');
        });

        test('returns stringified list of keys for empty object', () => {
            const result = getKeysHandler({
                unnamedArgs: ['{}'],
                list: [],
            });
            expect(result).toBe('[]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when input is not an object (number)', () => {
            const result = getKeysHandler({
                unnamedArgs: ['42'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getKeys] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is not an object (string)', () => {
            const result = getKeysHandler({
                unnamedArgs: ['"hello"'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getKeys] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is an array', () => {
            const result = getKeysHandler({
                unnamedArgs: ['[1,2,3]'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getKeys] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is a boolean', () => {
            const result = getKeysHandler({
                unnamedArgs: ['true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getKeys] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('parses string values as keys', () => {
            const result = getKeysHandler({
                unnamedArgs: ['{"hello":"world","foo":"bar"}'],
                list: [],
            });
            expect(result).toBe('["hello","foo"]');
        });

        test('parses integer values as keys', () => {
            const result = getKeysHandler({
                unnamedArgs: ['{"1":"a","2":"b"}'],
                list: [],
            });
            expect(result).toBe('["1","2"]');
        });

        test('parses boolean values as keys', () => {
            const result = getKeysHandler({
                unnamedArgs: ['{"true":1,"false":0}'],
                list: [],
            });
            expect(result).toBe('["true","false"]');
        });

        test('parses float values as keys', () => {
            const result = getKeysHandler({
                unnamedArgs: ['{"3.14":"pi","0.5":"half"}'],
                list: [],
            });
            expect(result).toBe('["3.14","0.5"]');
        });

        test('parses nested arrays as values', () => {
            const result = getKeysHandler({
                unnamedArgs: ['{"a":[1,2],"b":[3,4]}'],
                list: [],
            });
            expect(result).toBe('["a","b"]');
        });

        test('parses nested objects as values', () => {
            const result = getKeysHandler({
                unnamedArgs: ['{"a":{"x":1},"b":{"y":2}}'],
                list: [],
            });
            expect(result).toBe('["a","b"]');
        });
    });

    describe('shorthand variables', () => {
        test('gets keys from local variable (dot prefix)', () => {
            setLocal('myDict', JSON.stringify({ x: 1, y: 2, z: 3 }));
            const result = getKeysHandler({
                unnamedArgs: ['.myDict'],
                list: [],
            });
            expect(result).toBe('["x","y","z"]');
        });

        test('gets keys from global variable (dollar prefix)', () => {
            setGlobal('myDict', JSON.stringify({ a: 10, b: 20 }));
            const result = getKeysHandler({
                unnamedArgs: ['$myDict'],
                list: [],
            });
            expect(result).toBe('["a","b"]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => getKeysHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow(/Invalid JSON/);
        });

        test('errors when global variable does not exist', () => {
            expect(() => getKeysHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow(/Invalid JSON/);
        });

        test('errors when local variable is not an object', () => {
            setLocal('myDict', JSON.stringify([1, 2, 3]));
            const result = getKeysHandler({
                unnamedArgs: ['.myDict'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getKeys] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an object', () => {
            setGlobal('myDict', '"not an object"');
            const result = getKeysHandler({
                unnamedArgs: ['$myDict'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getKeys] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });
    });
});

describe('getValuesHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified list of values for simple object', () => {
            const result = getValuesHandler({
                unnamedArgs: ['{"a":1,"b":2,"c":3}'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
        });

        test('returns stringified list of values for single-key object', () => {
            const result = getValuesHandler({
                unnamedArgs: ['{"only":"value"}'],
                list: [],
            });
            expect(result).toBe('["value"]');
        });

        test('returns stringified list of values for empty object', () => {
            const result = getValuesHandler({
                unnamedArgs: ['{}'],
                list: [],
            });
            expect(result).toBe('[]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when input is not an object (number)', () => {
            const result = getValuesHandler({
                unnamedArgs: ['42'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getValues] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is not an object (string)', () => {
            const result = getValuesHandler({
                unnamedArgs: ['"hello"'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getValues] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is an array', () => {
            const result = getValuesHandler({
                unnamedArgs: ['[1,2,3]'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getValues] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });


        test('errors and returns empty string when input is a boolean', () => {
            const result = getValuesHandler({
                unnamedArgs: ['true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getValues] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('returns string values', () => {
            const result = getValuesHandler({
                unnamedArgs: ['{"a":"hello","b":"world"}'],
                list: [],
            });
            expect(result).toBe('["hello","world"]');
        });

        test('returns integer values', () => {
            const result = getValuesHandler({
                unnamedArgs: ['{"a":42,"b":-7,"c":0}'],
                list: [],
            });
            expect(result).toBe('[42,-7,0]');
        });

        test('returns float values', () => {
            const result = getValuesHandler({
                unnamedArgs: ['{"a":3.14,"b":-0.5,"c":1e10}'],
                list: [],
            });
            expect(result).toBe('[3.14,-0.5,10000000000]');
        });

        test('returns boolean values', () => {
            const result = getValuesHandler({
                unnamedArgs: ['{"a":true,"b":false}'],
                list: [],
            });
            expect(result).toBe('[true,false]');
        });

        test('returns JSON arrays as values', () => {
            const result = getValuesHandler({
                unnamedArgs: ['{"a":[1,2],"b":[3,4]}'],
                list: [],
            });
            expect(result).toBe('[[1,2],[3,4]]');
        });

        test('returns JSON objects as values', () => {
            const result = getValuesHandler({
                unnamedArgs: ['{"a":{"x":1},"b":{"y":2}}'],
                list: [],
            });
            expect(result).toBe('[{"x":1},{"y":2}]');
        });
    });

    describe('shorthand variables', () => {
        test('gets values from local variable (dot prefix)', () => {
            setLocal('myDict', JSON.stringify({ x: 1, y: 2, z: 3 }));
            const result = getValuesHandler({
                unnamedArgs: ['.myDict'],
                list: [],
            });
            expect(result).toBe('[1,2,3]');
        });

        test('gets values from global variable (dollar prefix)', () => {
            setGlobal('myDict', JSON.stringify({ a: 10, b: 20 }));
            const result = getValuesHandler({
                unnamedArgs: ['$myDict'],
                list: [],
            });
            expect(result).toBe('[10,20]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => getValuesHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow(/Invalid JSON/);
        });

        test('errors when global variable does not exist', () => {
            expect(() => getValuesHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow(/Invalid JSON/);
        });

        test('errors when local variable is not an object', () => {
            setLocal('myDict', JSON.stringify([1, 2, 3]));
            const result = getValuesHandler({
                unnamedArgs: ['.myDict'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getValues] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an object', () => {
            setGlobal('myDict', '42');
            const result = getValuesHandler({
                unnamedArgs: ['$myDict'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getValues] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });
    });
});

describe('getEntriesHandler', () => {
    beforeEach(() => {
        resetVariables();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('return values', () => {
        test('returns stringified list of entries for simple object', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['{"a":1,"b":2,"c":3}'],
                list: [],
            });
            expect(result).toBe('[["a",1],["b",2],["c",3]]');
        });

        test('returns stringified list of entries for single-key object', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['{"only":"value"}'],
                list: [],
            });
            expect(result).toBe('[["only","value"]]');
        });

        test('returns stringified list of entries for empty object', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['{}'],
                list: [],
            });
            expect(result).toBe('[]');
        });
    });

    describe('console errors', () => {
        test('errors and returns empty string when input is not an object (number)', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['42'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getEntries] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is not an object (string)', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['"hello"'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getEntries] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });

        test('errors and returns empty string when input is an array', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['[1,2,3]'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getEntries] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });


        test('errors and returns empty string when input is a boolean', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['true'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getEntries] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });
    });

    describe('datatype parsing', () => {
        test('returns entries with string values', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['{"a":"hello","b":"world"}'],
                list: [],
            });
            expect(result).toBe('[["a","hello"],["b","world"]]');
        });

        test('returns entries with integer values', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['{"a":42,"b":-7}'],
                list: [],
            });
            expect(result).toBe('[["a",42],["b",-7]]');
        });

        test('returns entries with float values', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['{"a":3.14,"b":-0.5}'],
                list: [],
            });
            expect(result).toBe('[["a",3.14],["b",-0.5]]');
        });

        test('returns entries with boolean values', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['{"a":true,"b":false}'],
                list: [],
            });
            expect(result).toBe('[["a",true],["b",false]]');
        });

        test('returns entries with JSON array values', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['{"a":[1,2],"b":[3,4]}'],
                list: [],
            });
            expect(result).toBe('[["a",[1,2]],["b",[3,4]]]');
        });

        test('returns entries with JSON object values', () => {
            const result = getEntriesHandler({
                unnamedArgs: ['{"a":{"x":1},"b":{"y":2}}'],
                list: [],
            });
            expect(result).toBe('[["a",{"x":1}],["b",{"y":2}]]');
        });
    });

    describe('shorthand variables', () => {
        test('gets entries from local variable (dot prefix)', () => {
            setLocal('myDict', JSON.stringify({ x: 1, y: 2, z: 3 }));
            const result = getEntriesHandler({
                unnamedArgs: ['.myDict'],
                list: [],
            });
            expect(result).toBe('[["x",1],["y",2],["z",3]]');
        });

        test('gets entries from global variable (dollar prefix)', () => {
            setGlobal('myDict', JSON.stringify({ a: 10, b: 20 }));
            const result = getEntriesHandler({
                unnamedArgs: ['$myDict'],
                list: [],
            });
            expect(result).toBe('[["a",10],["b",20]]');
        });

        test('errors when local variable does not exist', () => {
            expect(() => getEntriesHandler({
                unnamedArgs: ['.nonexistent'],
                list: [],
            })).toThrow(/Invalid JSON/);
        });

        test('errors when global variable does not exist', () => {
            expect(() => getEntriesHandler({
                unnamedArgs: ['$nonexistent'],
                list: [],
            })).toThrow(/Invalid JSON/);
        });

        test('errors when local variable is not an object', () => {
            setLocal('myDict', JSON.stringify([1, 2, 3]));
            const result = getEntriesHandler({
                unnamedArgs: ['.myDict'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getEntries] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });

        test('errors when global variable is not an object', () => {
            setGlobal('myDict', '"not an object"');
            const result = getEntriesHandler({
                unnamedArgs: ['$myDict'],
                list: [],
            });
            expect(console.error).toHaveBeenCalledWith(
                '[Collection Tools | getEntries] Input is not a dictionary.',
            );
            expect(result).toBe('');
        });
    });
});
