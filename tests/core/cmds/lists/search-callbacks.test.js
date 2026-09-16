import { jest } from '@jest/globals';

import {
    listAtCallback,
    listIndexOfCallback, listLastIndexOfCallback,
} from '../../../../src/core/cmds/lists/search-callbacks.js';

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

describe('listAtCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
        NoxLib.SlashHandlers.argHandler.parseVar.mockClear();
    });

    test('returns stringified item at given index', async () => {
        const { args } = makeScope(['a', 'b', 'c']);

        args.index = '1';

        const result = await listAtCallback(args, '@list');

        expect(result).toBe('b');
    });

    test('returns stringified item at index 0', async () => {
        const { args } = makeScope([42, 'x']);

        args.index = '0';

        const result = await listAtCallback(args, '@list');

        expect(result).toBe('42');
    });

    test('returns last element at negative index -1', async () => {
        const { args } = makeScope([1, 2, 3]);

        args.index = '-1';

        const result = await listAtCallback(args, '@list');

        expect(result).toBe('3');
    });

    test('returns undefined string for out-of-bounds index', async () => {
        const { args } = makeScope([1, 2]);

        args.index = '10';

        const result = await listAtCallback(args, '@list');

        expect(result).toBe('undefined');
    });

    test('JSON stringifies object values', async () => {
        const { args } = makeScope([{ a: 1 }, 'b']);

        args.index = '0';

        const result = await listAtCallback(args, '@list');

        expect(result).toBe('{"a":1}');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args } = makeScope('"not a list"');

        args.index = '0';

        await expect(listAtCallback(args, '@list')).rejects.toThrow(TypeError);
    });
});

describe('listIndexOfCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
        NoxLib.SlashHandlers.argHandler.parseVar.mockClear();
    });

    test('returns index of first occurrence', async () => {
        const { args } = makeScope(['a', 'b', 'c', 'b']);

        args.search = 'b';

        const result = await listIndexOfCallback(args, '@list');

        expect(result).toBe('1');
    });

    test('returns 0 when element is at start', async () => {
        const { args } = makeScope(['x', 'y', 'z']);

        args.search = 'x';

        const result = await listIndexOfCallback(args, '@list');

        expect(result).toBe('0');
    });

    test('returns -1 when element not found', async () => {
        const { args } = makeScope(['a', 'b', 'c']);

        args.search = 'z';

        const result = await listIndexOfCallback(args, '@list');

        expect(result).toBe('-1');
    });

    test('uses parseVar when parse is true (default)', async () => {
        const { args } = makeScope([42]);

        args.search = '42';
        args.parse = 'true';

        const result = await listIndexOfCallback(args, '@list');

        expect(result).toBe('0');
    });

    test('uses raw value when parse is false', async () => {
        const { args } = makeScope(['42']);

        args.search = '42';
        args.parse = 'false';

        const result = await listIndexOfCallback(args, '@list');

        expect(result).toBe('0');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args } = makeScope('"not a list"');

        args.search = 'x';

        await expect(listIndexOfCallback(args, '@list')).rejects.toThrow(TypeError);
    });
});

describe('listLastIndexOfCallback', () => {
    beforeEach(() => {
        NoxLib.SlashHandlers.argHandler.parse.mockClear();
        NoxLib.SlashHandlers.argHandler.parseVar.mockClear();
    });

    test('returns index of last occurrence', async () => {
        const { args } = makeScope(['a', 'b', 'c', 'b']);

        args.search = 'b';

        const result = await listLastIndexOfCallback(args, '@list');

        expect(result).toBe('3');
    });

    test('returns 0 when only occurrence is at start', async () => {
        const { args } = makeScope(['x', 'y', 'z']);

        args.search = 'x';

        const result = await listLastIndexOfCallback(args, '@list');

        expect(result).toBe('0');
    });

    test('returns -1 when element not found', async () => {
        const { args } = makeScope(['a', 'b', 'c']);

        args.search = 'z';

        const result = await listLastIndexOfCallback(args, '@list');

        expect(result).toBe('-1');
    });

    test('uses parseVar when parse is true (default)', async () => {
        const { args } = makeScope([42]);

        args.search = '42';
        args.parse = 'true';

        const result = await listLastIndexOfCallback(args, '@list');

        expect(result).toBe('0');
    });

    test('uses raw value when parse is false', async () => {
        const { args } = makeScope(['42']);

        args.search = '42';
        args.parse = 'false';

        const result = await listLastIndexOfCallback(args, '@list');

        expect(result).toBe('0');
    });

    test('throws TypeError when input is not a list', async () => {
        const { args } = makeScope('"not a list"');

        args.search = 'x';

        await expect(listLastIndexOfCallback(args, '@list')).rejects.toThrow(TypeError);
    });
});
