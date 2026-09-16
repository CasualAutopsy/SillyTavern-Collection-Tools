import { jest } from '@jest/globals';

import {
    listSliceCallback,
    listConcatCallback,
    listFlatCallback,
} from '../../../../src/core/cmds/lists/trans-callbacks.js';

function makeScope(list, namedArgs = {}) {
    const scope = {};
    const setVariable = jest.fn((name, value) => { scope[name] = value; });
    const args = { ...namedArgs, _scope: {
        existsVariable(name) { return name in scope; },
        getVariable(name) { return scope[name]; },
        setVariable,
    }};
    scope.list = typeof list === 'string' ? list : JSON.stringify(list);
    return { args, setVariable };
}

describe('listSliceCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
        NoxLib.SlashHandlers.argHandler.parseVar.mockClear();
    });

    test('returns full list when no named args provided', async () => {
        const { args } = makeScope([1, 2, 3]);

        const result = await listSliceCallback(args, '@list');

        expect(result).toBe('[1,2,3]');
    });

    test('slices with start only', async () => {
        const { args } = makeScope([0, 1, 2, 3, 4], { start: '2' });

        const result = await listSliceCallback(args, '@list');

        expect(result).toBe('[2,3,4]');
    });

    test('slices with end only', async () => {
        const { args } = makeScope([0, 1, 2, 3, 4], { end: '3' });

        const result = await listSliceCallback(args, '@list');

        expect(result).toBe('[0,1,2]');
    });

    test('slices with both start and end', async () => {
        const { args } = makeScope([0, 1, 2, 3, 4], { start: '1', end: '4' });

        const result = await listSliceCallback(args, '@list');

        expect(result).toBe('[1,2,3]');
    });

    test('handles negative indices', async () => {
        const { args } = makeScope([0, 1, 2, 3, 4], { start: '-2' });

        const result = await listSliceCallback(args, '@list');

        expect(result).toBe('[3,4]');
    });

    test('handles out-of-bounds indices', async () => {
        const { args } = makeScope([1, 2], { start: '0', end: '100' });

        const result = await listSliceCallback(args, '@list');

        expect(result).toBe('[1,2]');
    });

    test('returns empty array for empty list', async () => {
        const { args } = makeScope([]);

        const result = await listSliceCallback(args, '@list');

        expect(result).toBe('[]');
    });

    test('returns empty array when start equals end', async () => {
        const { args } = makeScope([1, 2, 3], { start: '1', end: '1' });

        const result = await listSliceCallback(args, '@list');

        expect(result).toBe('[]');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args } = makeScope('"not a list"');

        await expect(listSliceCallback(args, '@list')).rejects.toThrow(TypeError);
    });

    test('throws TypeError when start is not a valid integer', async () => {
        const { args } = makeScope([1, 2, 3], { start: 'abc' });

        await expect(listSliceCallback(args, '@list')).rejects.toThrow(TypeError);
    });

    test('throws TypeError when end is not a valid integer', async () => {
        const { args } = makeScope([1, 2, 3], { end: 'abc' });

        await expect(listSliceCallback(args, '@list')).rejects.toThrow(TypeError);
    });

    test('delegates to parseVar for list parsing', async () => {
        const { args } = makeScope([1, 2, 3]);

        await listSliceCallback(args, '@list');

        expect(NoxLib.SlashHandlers.argHandler.parseVar).toHaveBeenCalledWith('@list', args, 'json');
    });

    test('delegates to parse for start with int type', async () => {
        const { args } = makeScope([1, 2, 3], { start: '1' });

        await listSliceCallback(args, '@list');

        expect(NoxLib.SlashHandlers.argHandler.parse).toHaveBeenCalledWith('1', 'int');
    });

    test('delegates to parse for end with int type', async () => {
        const { args } = makeScope([1, 2, 3], { end: '2' });

        await listSliceCallback(args, '@list');

        expect(NoxLib.SlashHandlers.argHandler.parse).toHaveBeenCalledWith('2', 'int');
    });

    test('does not call parse when start and end are omitted', async () => {
        const { args } = makeScope([1, 2, 3]);

        await listSliceCallback(args, '@list');

        expect(NoxLib.SlashHandlers.argHandler.parse).not.toHaveBeenCalled();
    });
});

describe('listConcatCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parseVar.mockClear();
    });

    test('concatenates two lists', async () => {
        const { args } = makeScope([1, 2]);

        const result = await listConcatCallback(args, ['@list', '[3, 4]']);

        expect(result).toBe('[1,2,3,4]');
    });

    test('concatenates multiple lists', async () => {
        const { args } = makeScope([1]);

        const result = await listConcatCallback(args, ['@list', '[2]', '[3]', '[4, 5]']);

        expect(result).toBe('[1,2,3,4,5]');
    });

    test('concatenates with empty list', async () => {
        const { args } = makeScope([1, 2]);

        const result = await listConcatCallback(args, ['@list', '[]']);

        expect(result).toBe('[1,2]');
    });

    test('returns single list when no concat args', async () => {
        const { args } = makeScope([1, 2, 3]);

        const result = await listConcatCallback(args, ['@list']);

        expect(result).toBe('[1,2,3]');
    });

    test('preserves mixed value types', async () => {
        const { args } = makeScope([1, 'two', true]);

        const result = await listConcatCallback(args, ['@list', '[null, {"a":1}]']);

        expect(result).toBe('[1,"two",true,null,{"a":1}]');
    });

    test('throws Error when vals is not an array', async () => {
        const { args } = makeScope([1, 2]);

        await expect(listConcatCallback(args, 'not-an-array')).rejects.toThrow(Error);
    });

    test('throws TypeError when first input is not a list', async () => {
        const { args } = makeScope('"not a list"');

        await expect(listConcatCallback(args, ['@list', '[1]'])).rejects.toThrow(TypeError);
    });

    test('throws TypeError when concat input is not a list', async () => {
        const { args } = makeScope([1, 2]);

        await expect(listConcatCallback(args, ['@list', '"not a list"'])).rejects.toThrow(TypeError);
    });

    test('throws TypeError when second concat input is not a list', async () => {
        const { args } = makeScope([1, 2]);

        await expect(listConcatCallback(args, ['@list', '[3]', '"not a list"'])).rejects.toThrow(TypeError);
    });

    test('delegates to parseVar for each list argument', async () => {
        const { args } = makeScope([1]);

        await listConcatCallback(args, ['@list', '[2]', '[3]']);

        expect(NoxLib.SlashHandlers.argHandler.parseVar).toHaveBeenCalledWith('@list', args, 'json');
        expect(NoxLib.SlashHandlers.argHandler.parseVar).toHaveBeenCalledWith('[2]', args, 'json');
        expect(NoxLib.SlashHandlers.argHandler.parseVar).toHaveBeenCalledWith('[3]', args, 'json');
    });

    test('mutates vals array by shifting first element', async () => {
        const { args } = makeScope([1]);
        const vals = ['@list', '[2]'];

        await listConcatCallback(args, vals);

        expect(vals.length).toBe(1);
        expect(vals[0]).toBe('[2]');
    });
});

describe('listFlatCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
        NoxLib.SlashHandlers.argHandler.parseVar.mockClear();
    });

    test('flattens one level with depth=1', async () => {
        const { args } = makeScope([[1, 2], [3, 4]], { depth: '1' });

        const result = await listFlatCallback(args, '@list');

        expect(result).toBe('[1,2,3,4]');
    });

    test('flattens to specified depth', async () => {
        const { args } = makeScope([[[1, 2]], [[3, 4]]], { depth: '1' });

        const result = await listFlatCallback(args, '@list');

        expect(result).toBe('[[1,2],[3,4]]');
    });

    test('flattens all levels with large depth', async () => {
        const { args } = makeScope([1, [2, [3, [4]]]], { depth: '3' });

        const result = await listFlatCallback(args, '@list');

        expect(result).toBe('[1,2,3,4]');
    });

    test('no-ops with depth=0', async () => {
        const { args } = makeScope([[[[1]]]], { depth: '0' });

        const result = await listFlatCallback(args, '@list');

        expect(result).toBe('[[[[1]]]]');
    });

    test('returns empty array for empty list', async () => {
        const { args } = makeScope([], { depth: '1' });

        const result = await listFlatCallback(args, '@list');

        expect(result).toBe('[]');
    });

    test('handles mixed nesting levels', async () => {
        const { args } = makeScope([1, [2, 3], [[4]]], { depth: '2' });

        const result = await listFlatCallback(args, '@list');

        expect(result).toBe('[1,2,3,4]');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args } = makeScope('"not a list"', { depth: '1' });

        await expect(listFlatCallback(args, '@list')).rejects.toThrow(TypeError);
    });

    test('throws TypeError when depth is not a valid integer', async () => {
        const { args } = makeScope([1, [2]], { depth: 'abc' });

        await expect(listFlatCallback(args, '@list')).rejects.toThrow(TypeError);
    });

    test('delegates to parseVar for list parsing', async () => {
        const { args } = makeScope([1, 2], { depth: '1' });

        await listFlatCallback(args, '@list');

        expect(NoxLib.SlashHandlers.argHandler.parseVar).toHaveBeenCalledWith('@list', args, 'json');
    });

    test('delegates to parse for depth with int type', async () => {
        const { args } = makeScope([1, [2]], { depth: '1' });

        await listFlatCallback(args, '@list');

        expect(NoxLib.SlashHandlers.argHandler.parse).toHaveBeenCalledWith('1', 'int');
    });
});
