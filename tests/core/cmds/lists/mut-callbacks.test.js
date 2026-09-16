import { jest } from '@jest/globals';

import {
    listPushCallback, listPopCallback,
    listUnshiftCallback, listShiftCallback,
    listFillCallback, listCopyWithinCallback,
    listReverseCallback,
} from '../../../../src/core/cmds/lists/mut-callbacks.js';

function makeScope(list) {
    const scope = {};
    const setVariable = jest.fn((name, value) => { scope[name] = value; });
    const args = { _scope: {
        existsVariable(name) { return name in scope; },
        getVariable(name) { return scope[name]; },
        setVariable,
    }};
    scope.list = typeof list === 'string' ? list : JSON.stringify(list);
    return { args, setVariable };
}

describe('listPushCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseMut.mockClear();
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
    });

    test('pushes items and returns new length', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        const result = await listPushCallback(args, ['@list', '4', '5']);

        expect(result).toBe('5');
    });

    test('handles single value push', async () => {
        const { args, setVariable } = makeScope([1]);

        const result = await listPushCallback(args, ['@list', '2']);

        expect(result).toBe('2');
    });

    test('delegates each value to argH.parse for type coercion', async () => {
        const { args, setVariable } = makeScope([1]);

        await listPushCallback(args, ['@list', 'true', '42']);

        expect(NoxLib.SlashHandlers.argHandler.parse).toHaveBeenCalledWith('true');
        expect(NoxLib.SlashHandlers.argHandler.parse).toHaveBeenCalledWith('42');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args, setVariable } = makeScope('"not a list"');

        await expect(listPushCallback(args, ['@list', '1'])).rejects.toThrow(TypeError);
    });

    test('throws when no values to push', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        await expect(listPushCallback(args, ['@list'])).rejects.toThrow(Error);
    });

    test('calls mutate with the updated list', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        await listPushCallback(args, ['@list', '4']);

        expect(setVariable).toHaveBeenCalledWith('list', '[1,2,3,4]');
    });
});

describe('listPopCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseMut.mockClear();
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
    });

    test('pops last item and returns its value', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        const result = await listPopCallback(args, '@list');

        expect(result).toBe('3');
    });

    test('throws when list is empty', async () => {
        const { args, setVariable } = makeScope([]);

        await expect(listPopCallback(args, '@list')).rejects.toThrow(Error);
    });

    test('calls mutate with the shortened list', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        await listPopCallback(args, '@list');

        expect(setVariable).toHaveBeenCalledWith('list', '[1,2]');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args, setVariable } = makeScope('"not a list"');

        await expect(listPopCallback(args, '@list')).rejects.toThrow(TypeError);
    });
});

describe('listUnshiftCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseMut.mockClear();
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
    });

    test('unshifts items and returns new length', async () => {
        const { args, setVariable } = makeScope([3, 4, 5]);

        const result = await listUnshiftCallback(args, ['@list', '1', '2']);

        expect(result).toBe('5');
    });

    test('handles single value unshift', async () => {
        const { args, setVariable } = makeScope([2, 3]);

        const result = await listUnshiftCallback(args, ['@list', '1']);

        expect(result).toBe('3');
    });

    test('delegates each value to argH.parse for type coercion', async () => {
        const { args, setVariable } = makeScope([1]);

        await listUnshiftCallback(args, ['@list', 'true', '42']);

        expect(NoxLib.SlashHandlers.argHandler.parse).toHaveBeenCalledWith('true');
        expect(NoxLib.SlashHandlers.argHandler.parse).toHaveBeenCalledWith('42');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args, setVariable } = makeScope('"not a list"');

        await expect(listUnshiftCallback(args, ['@list', '1'])).rejects.toThrow(TypeError);
    });

    test('throws when no values to unshift', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        await expect(listUnshiftCallback(args, ['@list'])).rejects.toThrow(Error);
    });

    test('calls mutate with the updated list', async () => {
        const { args, setVariable } = makeScope([3, 4, 5]);

        await listUnshiftCallback(args, ['@list', '1', '2']);

        expect(setVariable).toHaveBeenCalledWith('list', '[2,1,3,4,5]');
    });
});

describe('listShiftCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseMut.mockClear();
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
    });

    test('shifts first item and returns its value', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        const result = await listShiftCallback(args, '@list');

        expect(result).toBe('1');
    });

    test('throws when list is empty', async () => {
        const { args, setVariable } = makeScope([]);

        await expect(listShiftCallback(args, '@list')).rejects.toThrow(Error);
    });

    test('calls mutate with the shortened list', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        await listShiftCallback(args, '@list');

        expect(setVariable).toHaveBeenCalledWith('list', '[2,3]');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args, setVariable } = makeScope('"not a list"');

        await expect(listShiftCallback(args, '@list')).rejects.toThrow(TypeError);
    });
});

describe('listFillCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseMut.mockClear();
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
    });

    test('fills entire list with a value', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        args.value = 'x';

        const result = await listFillCallback(args, '@list');

        expect(result).toBe('["x","x","x"]');
    });

    test('fills with start and end bounds', async () => {
        const { args, setVariable } = makeScope([1, 2, 3, 4, 5]);

        args.value = 0;
        args.start = '1';
        args.end = '4';

        const result = await listFillCallback(args, '@list');

        expect(result).toBe('[1,0,0,0,5]');
    });

    test('calls mutate with the filled list', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        args.value = 'a';
        args.start = '0';

        await listFillCallback(args, '@list');

        expect(setVariable).toHaveBeenCalledWith('list', '["a","a","a"]');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args, setVariable } = makeScope('"not a list"');

        args.value = 'x';

        await expect(listFillCallback(args, '@list')).rejects.toThrow(TypeError);
    });
});

describe('listCopyWithinCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseMut.mockClear();
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
    });

    test('copies elements within the list', async () => {
        const { args, setVariable } = makeScope([1, 2, 3, 4, 5]);

        args.target = '0';
        args.start = '2';

        const result = await listCopyWithinCallback(args, '@list');

        expect(result).toBe('[3,4,5,4,5]');
    });

    test('respects start and end bounds', async () => {
        const { args, setVariable } = makeScope([1, 2, 3, 4, 5]);

        args.target = '0';
        args.start = '1';
        args.end = '3';

        const result = await listCopyWithinCallback(args, '@list');

        expect(result).toBe('[2,3,3,4,5]');
    });

    test('calls mutate with the copied list', async () => {
        const { args, setVariable } = makeScope([1, 2, 3, 4, 5]);

        args.target = '0';
        args.start = '2';

        await listCopyWithinCallback(args, '@list');

        expect(setVariable).toHaveBeenCalledWith('list', '[3,4,5,4,5]');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args, setVariable } = makeScope('"not a list"');

        args.target = '0';
        args.start = '1';

        await expect(listCopyWithinCallback(args, '@list')).rejects.toThrow(TypeError);
    });
});

describe('listReverseCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseMut.mockClear();
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
    });

    test('reverses the list', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        const result = await listReverseCallback(args, '@list');

        expect(result).toBe('[3,2,1]');
    });

    test('handles single element list', async () => {
        const { args, setVariable } = makeScope([42]);

        const result = await listReverseCallback(args, '@list');

        expect(result).toBe('[42]');
    });

    test('handles empty list', async () => {
        const { args, setVariable } = makeScope([]);

        const result = await listReverseCallback(args, '@list');

        expect(result).toBe('[]');
    });

    test('calls mutate with the reversed list', async () => {
        const { args, setVariable } = makeScope([1, 2, 3]);

        await listReverseCallback(args, '@list');

        expect(setVariable).toHaveBeenCalledWith('list', '[3,2,1]');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args, setVariable } = makeScope('"not a list"');

        await expect(listReverseCallback(args, '@list')).rejects.toThrow(TypeError);
    });
});
