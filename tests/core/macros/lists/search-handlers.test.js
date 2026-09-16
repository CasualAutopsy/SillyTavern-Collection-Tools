import { listAtHandler, listIndexOfHandler, listLastIndexOfHandler } from '../../../../src/core/macros/lists/search-handlers.js';

// ── listAtHandler ──

describe('listAtHandler', () => {
    test('gets item at index 0', () => {
        const result = listAtHandler({ unnamedArgs: ['[10,20,30]', '0'] });
        expect(result).toBe('10');
    });

    test('gets item at positive index', () => {
        const result = listAtHandler({ unnamedArgs: ['[10,20,30]', '2'] });
        expect(result).toBe('30');
    });

    test('gets object at index (JSON-stringified)', () => {
        const result = listAtHandler({ unnamedArgs: ['[{"a":1}]', '0'] });
        expect(result).toBe('{"a":1}');
    });

    test('returns undefined for out-of-bounds index', () => {
        const result = listAtHandler({ unnamedArgs: ['[1,2]', '5'] });
        expect(result).toBe('undefined');
    });

    test('gets item at negative index', () => {
        const result = listAtHandler({ unnamedArgs: ['[1,2,3]', '-1'] });
        expect(result).toBe('3');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseVar.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation((arg) => {
            if (arg === 'not-a-list') return 'not-a-list';
            return original(arg);
        });

        const result = listAtHandler({ unnamedArgs: ['not-a-list', '0'] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation(original);
    });
});

// ── listIndexOfHandler ──

describe('listIndexOfHandler', () => {
    test('finds existing element with parse', () => {
        const result = listIndexOfHandler({ unnamedArgs: ['[1,2,3]', '2', 'true'] });
        expect(result).toBe('1');
    });

    test('returns -1 for non-existing element with parse', () => {
        const result = listIndexOfHandler({ unnamedArgs: ['[1,2,3]', '4', 'true'] });
        expect(result).toBe('-1');
    });

    test('finds element without parse (raw string)', () => {
        const result = listIndexOfHandler({ unnamedArgs: ['["a","b","c"]', 'b', 'false'] });
        expect(result).toBe('1');
    });

    test('returns -1 for non-existing element without parse', () => {
        const result = listIndexOfHandler({ unnamedArgs: ['["a","b","c"]', 'd', 'false'] });
        expect(result).toBe('-1');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseVar.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation((arg) => {
            if (arg === 'not-a-list') return 'not-a-list';
            return original(arg);
        });

        const result = listIndexOfHandler({ unnamedArgs: ['not-a-list', 'x', 'true'] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation(original);
    });
});

// ── listLastIndexOfHandler ──

describe('listLastIndexOfHandler', () => {
    test('finds last occurrence with parse', () => {
        const result = listLastIndexOfHandler({ unnamedArgs: ['[1,2,3,2,1]', '2', 'true'] });
        expect(result).toBe('3');
    });

    test('finds first-only occurrence with parse', () => {
        const result = listLastIndexOfHandler({ unnamedArgs: ['[1,2,3]', '1', 'true'] });
        expect(result).toBe('0');
    });

    test('returns -1 for not found with parse', () => {
        const result = listLastIndexOfHandler({ unnamedArgs: ['[1,2,3]', '4', 'true'] });
        expect(result).toBe('-1');
    });

    test('finds last occurrence without parse (raw string)', () => {
        const result = listLastIndexOfHandler({ unnamedArgs: ['["a","b","a"]', 'a', 'false'] });
        expect(result).toBe('2');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseVar.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation((arg) => {
            if (arg === 'not-a-list') return 'not-a-list';
            return original(arg);
        });

        const result = listLastIndexOfHandler({ unnamedArgs: ['not-a-list', 'x', 'true'] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation(original);
    });
});
