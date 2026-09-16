import { listPushHandler, listPopHandler, listUnshiftHandler, listShiftHandler, listFillHandler, listCopyWithinHandler, listSortHandler, listReverseHandler } from '../../../../src/core/macros/lists/mut-handlers.js';

describe('listPushHandler', () => {
    test('pushes items to list and returns new length', () => {
        const result = listPushHandler({ unnamedArgs: ['[1, 2, 3]'], list: ['4', '5'] });

        expect(result).toBe('5');
    });

    test('pushes single item and returns new length', () => {
        const result = listPushHandler({ unnamedArgs: ['[1]'], list: ['2'] });

        expect(result).toBe('2');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseMut.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(() => ({
            var: 'not-a-list', setVar: () => {},
        }));

        const result = listPushHandler({ unnamedArgs: ['not-a-list'], list: ['item'] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(original);
    });

    test('returns error when no items to push', () => {
        const result = listPushHandler({ unnamedArgs: ['[1, 2]'], list: [] });

        expect(result).toBe('');
    });

    test('calls parse with each item and type auto', () => {
        NoxLib.MacroHandlers.argHandler.parse.mockClear();

        listPushHandler({ unnamedArgs: ['[1]'], list: ['a', 'b'] });

        expect(NoxLib.MacroHandlers.argHandler.parse).toHaveBeenNthCalledWith(2, 'a');
        expect(NoxLib.MacroHandlers.argHandler.parse).toHaveBeenNthCalledWith(3, 'b');
    });
});

describe('listPopHandler', () => {
    test('pops last item and returns it', () => {
        const result = listPopHandler({ unnamedArgs: ['[1, 2, 3]'], list: [] });

        expect(result).toBe('3');
    });

    test('pops single item from single-element list', () => {
        const result = listPopHandler({ unnamedArgs: ['[42]'], list: [] });

        expect(result).toBe('42');
    });

    test('returns error for empty list', () => {
        const result = listPopHandler({ unnamedArgs: ['[]'], list: [] });

        expect(result).toBe('');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseMut.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(() => ({
            var: 'not-a-list', setVar: () => {},
        }));

        const result = listPopHandler({ unnamedArgs: ['not-a-list'], list: [] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(original);
    });
});

describe('listUnshiftHandler', () => {
    test('unshifts items to front and returns new length', () => {
        const result = listUnshiftHandler({ unnamedArgs: ['[3, 4, 5]'], list: ['1', '2'] });

        expect(result).toBe('5');
    });

    test('unshifts single item and returns new length', () => {
        const result = listUnshiftHandler({ unnamedArgs: ['[1]'], list: ['0'] });

        expect(result).toBe('2');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseMut.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(() => ({
            var: 'not-a-list', setVar: () => {},
        }));

        const result = listUnshiftHandler({ unnamedArgs: ['not-a-list'], list: ['item'] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(original);
    });

    test('returns error when no items to unshift', () => {
        const result = listUnshiftHandler({ unnamedArgs: ['[1, 2]'], list: [] });

        expect(result).toBe('');
    });

    test('calls parse with each item and type auto', () => {
        NoxLib.MacroHandlers.argHandler.parse.mockClear();

        listUnshiftHandler({ unnamedArgs: ['[1]'], list: ['a', 'b'] });

        expect(NoxLib.MacroHandlers.argHandler.parse).toHaveBeenNthCalledWith(2, 'a');
        expect(NoxLib.MacroHandlers.argHandler.parse).toHaveBeenNthCalledWith(3, 'b');
    });
});

describe('listShiftHandler', () => {
    test('shifts first item and returns it', () => {
        const result = listShiftHandler({ unnamedArgs: ['[1, 2, 3]'], list: [] });

        expect(result).toBe('1');
    });

    test('shifts single item from single-element list', () => {
        const result = listShiftHandler({ unnamedArgs: ['[42]'], list: [] });

        expect(result).toBe('42');
    });

    test('returns error for empty list', () => {
        const result = listShiftHandler({ unnamedArgs: ['[]'], list: [] });

        expect(result).toBe('');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseMut.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(() => ({
            var: 'not-a-list', setVar: () => {},
        }));

        const result = listShiftHandler({ unnamedArgs: ['not-a-list'], list: [] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(original);
    });
});

// ── listFillHandler ──

describe('listFillHandler', () => {
    test('fills entire list with value', () => {
        const result = listFillHandler({ unnamedArgs: ['[1,2,3]', 'x'], list: [] });
        expect(result).toBe('["x","x","x"]');
    });

    test('fills from start index', () => {
        const result = listFillHandler({ unnamedArgs: ['[1,2,3]', 'x'], list: ['1'] });
        expect(result).toBe('[1,"x","x"]');
    });

    test('fills from start to end index', () => {
        const result = listFillHandler({ unnamedArgs: ['[1,2,3,4]', 'x'], list: ['1', '3'] });
        expect(result).toBe('[1,"x","x",4]');
    });

    test('fills with undefined start/end (entire list)', () => {
        const result = listFillHandler({ unnamedArgs: ['[1,2]', 'y'], list: [] });
        expect(result).toBe('["y","y"]');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseMut.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(() => ({
            var: 'not-a-list', setVar: () => {},
        }));

        const result = listFillHandler({ unnamedArgs: ['not-a-list', 'x'], list: [] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(original);
    });

    test('returns error for non-list input with indices', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseMut.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(() => ({
            var: 'not-a-list', setVar: () => {},
        }));

        const result = listFillHandler({ unnamedArgs: ['not-a-list', 'x'], list: ['1', '2'] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(original);
    });
});

// ── listCopyWithinHandler ──

describe('listCopyWithinHandler', () => {
    test('copies within list (target from start)', () => {
        const result = listCopyWithinHandler({ unnamedArgs: ['[1,2,3,4,5]'], list: ['3', '0'] });
        expect(result).toBe('[1,2,3,1,2]');
    });

    test('copies within list with end bound', () => {
        const result = listCopyWithinHandler({ unnamedArgs: ['[1,2,3,4,5]'], list: ['3', '0', '2'] });
        expect(result).toBe('[1,2,3,1,2]');
    });
    test('returns error when rawIndices is null', () => {
        const result = listCopyWithinHandler({ unnamedArgs: ['[1,2,3]'], list: null });
        expect(result).toBe('');
    });

    test('returns error when only 2 arguments (target + start)', () => {
        const result = listCopyWithinHandler({ unnamedArgs: ['[1,2,3]'], list: ['3'] });
        expect(result).toBe('');
    });

    test('returns error when only 1 argument (target only)', () => {
        const result = listCopyWithinHandler({ unnamedArgs: ['[1,2,3]'], list: [] });
        expect(result).toBe('');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseMut.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(() => ({
            var: 'not-a-list', setVar: () => {},
        }));

        const result = listCopyWithinHandler({ unnamedArgs: ['not-a-list'], list: ['0', '1'] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(original);
    });
});

// ── listSortHandler ──

describe('listSortHandler', () => {
    test('sorts strings alphabetically', () => {
        const result = listSortHandler({ unnamedArgs: ['["c","a","b"]'], list: [] });
        expect(result).toBe('["a","b","c"]');
    });

    test('sorts numbers as strings (lexicographic)', () => {
        const result = listSortHandler({ unnamedArgs: ['[10,2,1]'], list: [] });
        expect(result).toBe('[1,10,2]');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseMut.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(() => ({
            var: 'not-a-list', setVar: () => {},
        }));

        const result = listSortHandler({ unnamedArgs: ['not-a-list'], list: [] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(original);
    });
});

// ── listReverseHandler ──

describe('listReverseHandler', () => {
    test('reverses list', () => {
        const result = listReverseHandler({ unnamedArgs: ['[1,2,3]'], list: [] });
        expect(result).toBe('[3,2,1]');
    });

    test('reverses single-element list', () => {
        const result = listReverseHandler({ unnamedArgs: ['[42]'], list: [] });
        expect(result).toBe('[42]');
    });

    test('returns error for non-list input', () => {
        const original = NoxLib.MacroHandlers.argHandler.parseMut.getMockImplementation();

        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(() => ({
            var: 'not-a-list', setVar: () => {},
        }));

        const result = listReverseHandler({ unnamedArgs: ['not-a-list'], list: [] });

        expect(result).toBe('');
        NoxLib.MacroHandlers.argHandler.parseMut.mockImplementation(original);
    });
});
