import { listSliceHandler, listConcatHandler, listFlatHandler } from '../../../../src/core/macros/lists/trans-handlers.js';

// ── listSliceHandler ──

describe('listSliceHandler', () => {
    test('slices with start only', () => {
        const result = listSliceHandler({ unnamedArgs: ['[1,2,3,4,5]'], list: ['2'] });
        expect(result).toBe('[3,4,5]');
    });

    test('slices with start and end', () => {
        const result = listSliceHandler({ unnamedArgs: ['[1,2,3,4,5]'], list: ['1', '4'] });
        expect(result).toBe('[2,3,4]');
    });

    test('slices with no indices (returns full list)', () => {
        const result = listSliceHandler({ unnamedArgs: ['[1,2,3]'], list: [] });
        expect(result).toBe('[1,2,3]');
    });

    test('slices with negative start index', () => {
        const result = listSliceHandler({ unnamedArgs: ['[1,2,3,4,5]'], list: ['-2'] });
        expect(result).toBe('[4,5]');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseVar.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation((arg) => {
            if (arg === 'not-a-list') return 'not-a-list';
            return original(arg);
        });

        const result = listSliceHandler({ unnamedArgs: ['not-a-list'], list: [] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation(original);
    });
});

// ── listConcatHandler ──

describe('listConcatHandler', () => {
    test('concatenates with one additional list', () => {
        const result = listConcatHandler({ unnamedArgs: ['[1,2]'], list: ['[3,4]'] });
        expect(result).toBe('[1,2,3,4]');
    });

    test('concatenates with multiple additional lists', () => {
        const result = listConcatHandler({ unnamedArgs: ['[1]'], list: ['[2]', '[3]'] });
        expect(result).toBe('[1,2,3]');
    });

    test('concatenates with no additional lists (returns original)', () => {
        const result = listConcatHandler({ unnamedArgs: ['[1,2]'], list: [] });
        expect(result).toBe('[1,2]');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseVar.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation((arg) => {
            if (arg === 'not-a-list') return 'not-a-list';
            return original(arg);
        });

        const result = listConcatHandler({ unnamedArgs: ['not-a-list'], list: [] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation(original);
    });

    test('returns error when parsed result is an Object (not array)', () => {
        const result = listConcatHandler({ unnamedArgs: ['[1,2]'], list: ['{"a":1}', '{"b":2}'] });
        expect(result).toBe('');
    });
});

// ── listFlatHandler ──

describe('listFlatHandler', () => {
    test('flats with depth 1', () => {
        const result = listFlatHandler({ unnamedArgs: ['[1,[2,3],[4,[5]]]', '1'] });
        expect(result).toBe('[1,2,3,4,[5]]');
    });

    test('flats with depth 2', () => {
        const result = listFlatHandler({ unnamedArgs: ['[1,[2,3],[4,[5]]]', '2'] });
        expect(result).toBe('[1,2,3,4,5]');
    });

    test('flats with depth 0 (no flattening)', () => {
        const result = listFlatHandler({ unnamedArgs: ['[1,[2,3],[4,[5]]]', '0'] });
        expect(result).toBe('[1,[2,3],[4,[5]]]');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseVar.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation((arg) => {
            if (arg === 'not-a-list') return 'not-a-list';
            return original(arg);
        });

        const result = listFlatHandler({ unnamedArgs: ['not-a-list', '1'] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseVar.mockImplementation(original);
    });
});
