import { getKeysCallback, getValuesCallback, getEntriesCallback } from '../../../../src/core/cmds/dicts/enum-callbacks.js';

describe('getKeysCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseVar.mockClear();
    });

    test('returns JSON array of keys for a plain object', async () => {
        const result = await getKeysCallback({}, '{"a":1,"b":2,"c":3}');

        expect(result).toBe('["a","b","c"]');
    });

    test('returns empty array for an empty object', async () => {
        const result = await getKeysCallback({}, '{}');

        expect(result).toBe('[]');
    });

    test('returns single key for a one-entry object', async () => {
        const result = await getKeysCallback({}, '{"only":"value"}');

        expect(result).toBe('["only"]');
    });

    test('throws TypeError when input is not valid JSON', async () => {
        await expect(getKeysCallback({}, 'not-json')).rejects.toThrow(TypeError);
    });

    test('delegates to parseVar with the correct arguments', async () => {
        await getKeysCallback({}, '{"x":1}');

        expect(NoxLib.SlashHandlers.argHandler.parseVar).toHaveBeenCalledWith('{"x":1}', {}, 'json');
    });
});

describe('getValuesCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseVar.mockClear();
    });

    test('returns JSON array of values for a plain object', async () => {
        const result = await getValuesCallback({}, '{"a":1,"b":2,"c":3}');

        expect(result).toBe('[1,2,3]');
    });

    test('returns empty array for an empty object', async () => {
        const result = await getValuesCallback({}, '{}');

        expect(result).toBe('[]');
    });

    test('returns single value for a one-entry object', async () => {
        const result = await getValuesCallback({}, '{"only":"value"}');

        expect(result).toBe('["value"]');
    });

    test('preserves value types (mixed types in values)', async () => {
        const result = await getValuesCallback({}, '{"str":"hello","num":42,"bool":true,"nil":null}');

        expect(result).toBe('["hello",42,true,null]');
    });

    test('throws TypeError when input is not valid JSON', async () => {
        await expect(getValuesCallback({}, 'not-json')).rejects.toThrow(TypeError);
    });

    test('delegates to parseVar with the correct arguments', async () => {
        await getValuesCallback({}, '{"x":1}');

        expect(NoxLib.SlashHandlers.argHandler.parseVar).toHaveBeenCalledWith('{"x":1}', {}, 'json');
    });
});

describe('getEntriesCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseVar.mockClear();
    });

    test('returns JSON array of [key, value] pairs', async () => {
        const result = await getEntriesCallback({}, '{"a":1,"b":2}');

        expect(result).toBe('[["a",1],["b",2]]');
    });

    test('returns empty array for an empty object', async () => {
        const result = await getEntriesCallback({}, '{}');

        expect(result).toBe('[]');
    });

    test('returns single entry for a one-entry object', async () => {
        const result = await getEntriesCallback({}, '{"only":"value"}');

        expect(result).toBe('[["only","value"]]');
    });

    test('preserves entry order matching Object.entries spec', async () => {
        const result = await getEntriesCallback({}, '{"z":1,"a":2,"m":3}');

        expect(result).toBe('[["z",1],["a",2],["m",3]]');
    });

    test('throws TypeError when input is not valid JSON', async () => {
        await expect(getEntriesCallback({}, 'not-json')).rejects.toThrow(TypeError);
    });

    test('delegates to parseVar with the correct arguments', async () => {
        await getEntriesCallback({}, '{"x":1}');

        expect(NoxLib.SlashHandlers.argHandler.parseVar).toHaveBeenCalledWith('{"x":1}', {}, 'json');
    });
});
