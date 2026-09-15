import { listPushHandler, listPopHandler, listUnshiftHandler, listShiftHandler } from '../../../../src/core/macros/lists/mut-handlers.js';

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
