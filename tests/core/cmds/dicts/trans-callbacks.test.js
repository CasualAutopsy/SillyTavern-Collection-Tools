import { fromEntriesCallback } from '../../../../src/core/cmds/dicts/trans-callbacks.js';

describe('fromEntriesCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseVar.mockClear();
    });

    test('converts entries array to JSON object', async () => {
        const result = await fromEntriesCallback({}, '[["a",1],["b",2],["c",3]]');

        expect(result).toBe('{"a":1,"b":2,"c":3}');
    });

    test('returns empty object for empty entries array', async () => {
        const result = await fromEntriesCallback({}, '[]');

        expect(result).toBe('{}');
    });

    test('handles single entry', async () => {
        const result = await fromEntriesCallback({}, '[["only","value"]]');

        expect(result).toBe('{"only":"value"}');
    });

    test('preserves mixed value types', async () => {
        const result = await fromEntriesCallback({}, '[["str","hello"],["num",42],["bool",true],["nil",null]]');

        expect(result).toBe('{"str":"hello","num":42,"bool":true,"nil":null}');
    });

    test('throws TypeError when input is not valid JSON', async () => {
        await expect(fromEntriesCallback({}, 'not-json')).rejects.toThrow(TypeError);
    });

    test('delegates to parseVar with the correct arguments', async () => {
        await fromEntriesCallback({}, '[["x",1]]');

        expect(NoxLib.SlashHandlers.argHandler.parseVar).toHaveBeenCalledWith('[["x",1]]', {}, 'json');
    });
});
