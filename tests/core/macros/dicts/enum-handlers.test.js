import { getKeysHandler, getValuesHandler, getEntriesHandler } from '../../../../src/core/macros/dicts/enum-handlers.js';

describe('getKeysHandler', () => {
    test('returns JSON array of keys for a plain object', () => {
        const result = getKeysHandler({ unnamedArgs: ['{"a":1,"b":2,"c":3}'], list: [] });

        expect(result).toBe('["a","b","c"]');
    });

    test('returns empty array for an empty object', () => {
        const result = getKeysHandler({ unnamedArgs: ['{}'], list: [] });

        expect(result).toBe('[]');
    });

    test('returns single key for a one-entry object', () => {
        const result = getKeysHandler({ unnamedArgs: ['{"only":"value"}'], list: [] });

        expect(result).toBe('["only"]');
    });

    test('throws TypeError when input is not valid JSON (unquoted string)', () => {
        expect(() => getKeysHandler({ unnamedArgs: ['not-json'], list: [] })).toThrow(TypeError);
    });

    test('delegates to parseVar with the correct arguments', () => {
        getKeysHandler({ unnamedArgs: ['{"x":1}'], list: [] });

        expect(NoxLib.MacroHandlers.argHandler.parseVar).toHaveBeenCalledWith('{"x":1}', 'json');
    });
});

describe('getValuesHandler', () => {
    test('returns JSON array of values for a plain object', () => {
        const result = getValuesHandler({ unnamedArgs: ['{"a":1,"b":2,"c":3}'], list: [] });

        expect(result).toBe('[1,2,3]');
    });

    test('returns empty array for an empty object', () => {
        const result = getValuesHandler({ unnamedArgs: ['{}'], list: [] });

        expect(result).toBe('[]');
    });

    test('returns single value for a one-entry object', () => {
        const result = getValuesHandler({ unnamedArgs: ['{"only":"value"}'], list: [] });

        expect(result).toBe('["value"]');
    });

    test('preserves value types (mixed types in values)', () => {
        const result = getValuesHandler({ unnamedArgs: ['{"str":"hello","num":42,"bool":true,"nil":null}'], list: [] });

        expect(result).toBe('["hello",42,true,null]');
    });

    test('throws TypeError when input is not valid JSON (unquoted string)', () => {
        expect(() => getValuesHandler({ unnamedArgs: ['not-json'], list: [] })).toThrow(TypeError);
    });

    test('delegates to parseVar with the correct arguments', () => {
        getValuesHandler({ unnamedArgs: ['{"x":1}'], list: [] });

        expect(NoxLib.MacroHandlers.argHandler.parseVar).toHaveBeenCalledWith('{"x":1}', 'json');
    });
});

describe('getEntriesHandler', () => {
    test('returns JSON array of [key, value] pairs', () => {
        const result = getEntriesHandler({ unnamedArgs: ['{"a":1,"b":2}'], list: [] });

        expect(result).toBe('[["a",1],["b",2]]');
    });

    test('returns empty array for an empty object', () => {
        const result = getEntriesHandler({ unnamedArgs: ['{}'], list: [] });

        expect(result).toBe('[]');
    });

    test('returns single entry for a one-entry object', () => {
        const result = getEntriesHandler({ unnamedArgs: ['{"only":"value"}'], list: [] });

        expect(result).toBe('[["only","value"]]');
    });

    test('preserves entry order matching Object.entries spec', () => {
        const result = getEntriesHandler({ unnamedArgs: ['{"z":1,"a":2,"m":3}'], list: [] });

        expect(result).toBe('[["z",1],["a",2],["m",3]]');
    });

    test('throws TypeError when input is not valid JSON (unquoted string)', () => {
        expect(() => getEntriesHandler({ unnamedArgs: ['not-json'], list: [] })).toThrow(TypeError);
    });

    test('delegates to parseVar with the correct arguments', () => {
        getEntriesHandler({ unnamedArgs: ['{"x":1}'], list: [] });

        expect(NoxLib.MacroHandlers.argHandler.parseVar).toHaveBeenCalledWith('{"x":1}', 'json');
    });
});
