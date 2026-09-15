import { fromEntriesHandler } from '../../../../src/core/macros/dicts/trans-handlers.js';

describe('fromEntriesHandler', () => {

    describe('rawEntries path (unnamedArgs[0] is non-empty)', () => {
        test('converts an array of [key, value] pairs to a JSON object', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[["a",1],["b",2],["c",3]]'],
                list: [],
            });

            expect(result).toBe('{"a":1,"b":2,"c":3}');
        });

        test('returns empty object for an empty entries array', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[]'],
                list: [],
            });

            expect(result).toBe('{}');
        });

        test('handles a single entry pair', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[["only","value"]]'],
                list: [],
            });

            expect(result).toBe('{"only":"value"}');
        });

        test('preserves mixed value types', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [
                    '[["str","hello"],["num",42],["bool",true],["nil",null]]',
                ],
                list: [],
            });

            expect(result).toBe('{"str":"hello","num":42,"bool":true,"nil":null}');
        });

        test('preserves numeric and symbol-like keys', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['[[0,"zero"],[1,"one"]]'],
                list: [],
            });

            expect(result).toBe('{"0":"zero","1":"one"}');
        });

        test('returns empty string for a JSON object (not an entries array)', () => {
            const result = fromEntriesHandler({
                unnamedArgs: ['{"a":1}'],
                list: [],
            });

            expect(result).toBe('');
        });

        test('throws TypeError when input is not valid JSON (unquoted string)', () => {
            expect(() =>
                fromEntriesHandler({
                    unnamedArgs: ['not-json'],
                    list: [],
                }),
            ).toThrow(TypeError);
        });

        test('calls parseVar with rawEntries and "json" type', () => {
            fromEntriesHandler({
                unnamedArgs: ['[["a",1]]'],
                list: [],
            });

            expect(NoxLib.MacroHandlers.argHandler.parseVar).toHaveBeenCalledWith(
                '[["a",1]]',
                'json',
            );
        });
    });

    describe('rawList fallback path (unnamedArgs[0] is empty)', () => {
        test('converts an even-length list of key-value pairs to a JSON object', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: ['a', '1', 'b', '2'],
            });

            expect(result).toBe('{"a":1,"b":2}');
        });

        test('returns empty object for an empty list', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: [],
            });

            expect(result).toBe('{}');
        });

        test('handles a single key-value pair from list', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: ['key', 'value'],
            });

            expect(result).toBe('{"key":"value"}');
        });

        test('passes list values through parseVar', () => {
            fromEntriesHandler({
                unnamedArgs: [''],
                list: ['a', '1', 'b', '2'],
            });

            expect(NoxLib.MacroHandlers.argHandler.parseVar).toHaveBeenCalledWith('1');
            expect(NoxLib.MacroHandlers.argHandler.parseVar).toHaveBeenCalledWith('2');
        });

        test('calls splitList with the raw list and chunk size 2', () => {
            fromEntriesHandler({
                unnamedArgs: [''],
                list: ['a', '1'],
            });

            expect(NoxLib.MacroHandlers.argHandler.splitList).toHaveBeenCalledWith(
                ['a', '1'],
                2,
            );
        });

        test('calls zipList with keys and parsed values', () => {
            fromEntriesHandler({
                unnamedArgs: [''],
                list: ['a', '1', 'b', '2'],
            });

            expect(NoxLib.MacroHandlers.argHandler.zipList).toHaveBeenCalledWith(
                ['a', 'b'],
                [1, 2],
            );
        });

        test('returns empty string and logs error for odd-length list', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: ['a', '1', 'b'],
            });

            expect(result).toBe('');
        });

        test('returns empty string and logs error for null list', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: null,
            });

            expect(result).toBe('');
        });

        test('returns empty string and logs error for undefined list', () => {
            const result = fromEntriesHandler({
                unnamedArgs: [''],
                list: undefined,
            });

            expect(result).toBe('');
        });
    });
});
